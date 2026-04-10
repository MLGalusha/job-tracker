#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { spawn } from 'node:child_process';

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) continue;
    const key = arg.slice(2);
    const value = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : 'true';
    args[key] = value;
  }
  return args;
}

function normalizeForSpeech(markdown) {
  const withoutSources = markdown.split(/\n## Sources\b/)[0];

  return withoutSources
    .replace(/\r/g, '')
    .replace(/^###\s+(.+)$/gm, '\n$1.\n')
    .replace(/^##\s+(.+)$/gm, '\n$1.\n')
    .replace(/^#\s+(.+)$/gm, '\n$1.\n')
    .replace(/^\-\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function splitOversizedParagraph(paragraph, maxChars) {
  const sentences = paragraph
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  const chunks = [];
  let current = '';

  for (const sentence of sentences) {
    const candidate = current ? `${current} ${sentence}` : sentence;
    if (candidate.length <= maxChars) {
      current = candidate;
      continue;
    }

    if (current) {
      chunks.push(current);
      current = '';
    }

    if (sentence.length <= maxChars) {
      current = sentence;
      continue;
    }

    let remainder = sentence;
    while (remainder.length > maxChars) {
      const slice = remainder.slice(0, maxChars);
      const breakAt = Math.max(
        slice.lastIndexOf(','),
        slice.lastIndexOf(';'),
        slice.lastIndexOf(' '),
      );
      const idx = breakAt > maxChars * 0.6 ? breakAt : maxChars;
      chunks.push(remainder.slice(0, idx).trim());
      remainder = remainder.slice(idx).trim();
    }

    current = remainder;
  }

  if (current) chunks.push(current);
  return chunks;
}

function chunkText(text, maxChars) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const chunks = [];
  let current = '';

  for (const paragraph of paragraphs) {
    const candidate = current ? `${current}\n\n${paragraph}` : paragraph;
    if (candidate.length <= maxChars) {
      current = candidate;
      continue;
    }

    if (current) {
      chunks.push(current);
      current = '';
    }

    if (paragraph.length <= maxChars) {
      current = paragraph;
      continue;
    }

    const splitParagraph = splitOversizedParagraph(paragraph, maxChars);
    for (const piece of splitParagraph) {
      if (piece.length <= maxChars) {
        chunks.push(piece);
      }
    }
  }

  if (current) chunks.push(current);
  return chunks;
}

async function synthesizeChunk({ apiKey, model, voice, instructions, input, outputPath }) {
  const response = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      voice,
      input,
      instructions,
      response_format: 'mp3',
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`TTS request failed (${response.status}): ${errorText.slice(0, 500)}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  await fs.writeFile(outputPath, Buffer.from(arrayBuffer));
}

function runFfmpegConcat(listPath, outputPath) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      'ffmpeg',
      [
        '-y',
        '-f',
        'concat',
        '-safe',
        '0',
        '-i',
        listPath,
        '-c:a',
        'libmp3lame',
        '-q:a',
        '2',
        outputPath,
      ],
      { stdio: 'inherit' },
    );

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`ffmpeg exited with code ${code}`));
      }
    });
    child.on('error', reject);
  });
}

async function main() {
  const args = parseArgs(process.argv);
  const inputPath = path.resolve(args.input || '');
  const outputPath = path.resolve(args.output || '');
  const voice = args.voice || 'marin';
  const model = args.model || 'gpt-4o-mini-tts';
  const maxChars = Number(args['max-chars'] || 2600);

  if (!inputPath || !outputPath) {
    throw new Error('Usage: node scripts/generate-tts-audiobook.mjs --input <file> --output <mp3>');
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set in the environment.');
  }

  const markdown = await fs.readFile(inputPath, 'utf8');
  const text = normalizeForSpeech(markdown);
  const chunks = chunkText(text, maxChars);

  if (chunks.length === 0) {
    throw new Error('No text remained after preprocessing.');
  }

  const outputDir = path.dirname(outputPath);
  const stem = path.basename(outputPath, path.extname(outputPath));
  const partsDir = path.join(outputDir, `${stem}-parts`);
  const concatListPath = path.join(partsDir, 'concat.txt');

  await fs.mkdir(partsDir, { recursive: true });
  await fs.mkdir(outputDir, { recursive: true });

  const instructions =
    'Read this as a high-quality nonfiction audiobook for one listener. ' +
    'Use a calm, clear, grounded, slightly brisk tone. ' +
    'Pause briefly between sections. ' +
    'Emphasize company names and practical advice clearly. ' +
    'Avoid sounding overly dramatic or salesy.';

  console.log(`Generating ${chunks.length} audio segments with model=${model}, voice=${voice}.`);

  const concatLines = [];
  for (let i = 0; i < chunks.length; i += 1) {
    const index = String(i + 1).padStart(3, '0');
    const partPath = path.join(partsDir, `part-${index}.mp3`);
    console.log(`Synthesizing chunk ${i + 1}/${chunks.length} -> ${path.basename(partPath)}`);
    await synthesizeChunk({
      apiKey,
      model,
      voice,
      instructions,
      input: chunks[i],
      outputPath: partPath,
    });
    concatLines.push(`file '${partPath.replace(/'/g, "'\\''")}'`);
  }

  await fs.writeFile(concatListPath, `${concatLines.join('\n')}\n`);

  console.log(`Merging ${chunks.length} segments into ${outputPath}`);
  await runFfmpegConcat(concatListPath, outputPath);
  console.log(`Done: ${outputPath}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
