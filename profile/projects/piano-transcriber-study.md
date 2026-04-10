# PianoTranscriber — Project Study Guide

This is a recall aid. It exists so Mason can re-learn his own project before an interview without re-reading the source code. One-time write.

---

## The 30-second pitch

I built a CNN that transcribes piano audio into digital sheet music. It takes raw audio in, converts it to a spectrogram, runs it through a convolutional neural network that predicts which of the 88 piano keys are active at each moment, then converts the output to MIDI and renders it as sheet music. Trained on the MAESTRO dataset, about 200 hours of classical piano, roughly 100 GB preprocessed. This was my bootcamp final project, built in a two-week sprint at the end of a 6 month AI program at UNC Chapel Hill, May through December 2024.

---

## The 3-minute walkthrough

The problem is automatic music transcription: given audio of someone playing piano, produce a MIDI file that represents the notes they played, then render that as sheet music. It's a well-studied problem in music information retrieval but a genuinely hard one because of polyphony (multiple notes at once), sustain, dynamics, and timing precision.

My pipeline has five stages. Raw audio goes through spectrogram preprocessing using librosa, producing frames at 11 ms time resolution with 513 frequency bins. Those spectrograms get paired with time-aligned piano rolls from the MIDI ground truth in the MAESTRO dataset. That alignment is a hard sub-problem: the audio and MIDI have to match at millisecond precision or the training signal is wrong.

The model itself is a CNN with convolutional layers and max pooling that pools the frequency axis from 513 down to 128. It takes 240-frame sliding windows as input (roughly 2.6 seconds of audio) and predicts note probabilities for the middle 80 frames. The overlap means each frame gets predicted from multiple windows, which stabilizes the output.

Training ran for about a week on a Google Cloud VM with a GPU. The dataset was about 100 GB preprocessed, chunked into around 130 parquet files for out-of-core batching because it didn't fit in memory. After training, the model outputs a probability matrix (time steps by 88 keys), which gets thresholded into a binary piano roll, converted to MIDI via MIDIUtil, and rendered as sheet music through MuseScore.

The pipeline works end to end. The model accuracy needs more work. A modern approach would use a transformer encoder instead of a CNN. But the pipeline itself, from raw audio to printed sheet music, runs and produces real output.

---

## Numbers to remember

| Parameter | Value | Why |
|---|---|---|
| Input sample rate | 16 kHz | Standard for speech/music ML |
| Spectrogram resolution | 11 ms per frame | Balance between time precision and compute |
| Frequency bins | 513 | From FFT size, covers full audible range |
| Input window | 240 frames (~2.6 sec) | Enough context for note onset/offset detection |
| Prediction target | Middle 80 frames of the 240 | Overlap architecture, each frame predicted from multiple windows |
| Output dimensions | 88 keys per time step | One per piano key, probability 0-1 |
| Pooling | 513 freq bins -> 128 | Max pooling on frequency axis |
| Dataset | MAESTRO, ~200 hours classical piano | Standard benchmark for piano transcription |
| Dataset size preprocessed | ~100 GB | Parquet files |
| Dataset chunks | ~130 files | For out-of-core batching |
| Training compute | ~1 week on GCP GPU VM | |
| Total LOC | ~30,700 lines Python | Notebooks + scripts + model + pipeline |
| Commits | 62 | |
| Sprint duration | 2 weeks | Bootcamp final project window |
| Bootcamp duration | 6 months, May-Dec 2024 | UNC Chapel Hill |

---

## Key components

| Component | What it does |
|---|---|
| Spectrogram preprocessing | librosa loads audio, computes STFT, produces time-frequency representation |
| MIDI alignment | Aligns MAESTRO MIDI ground truth to audio frames at millisecond precision |
| Piano roll generation | Converts MIDI note-on/note-off events to a binary 88-key matrix over time |
| Sliding window sampler | Extracts 240-frame windows with overlap for training |
| CNN model (PyTorch) | Convolutional layers + max pooling, predicts per-key probabilities |
| Post-processing | Thresholds probabilities to binary, converts to MIDI via MIDIUtil |
| Sheet music rendering | MIDI to score via MuseScore (external tool) |

---

## The hard decisions and why

### 1. Sliding window with overlap (240 in, predict middle 80)
The naive approach would be to predict all 240 frames from the 240-frame input. The problem: edge frames have less context and produce worse predictions. By only predicting the middle 80 frames, every predicted frame has at least 80 frames of context on each side. At inference, windows overlap and each frame gets averaged across multiple predictions, which smooths out noise. This is a standard technique in audio ML but it's not obvious if you haven't seen it.

### 2. Out-of-core batching with ~130 parquet chunks
The MAESTRO dataset preprocessed to spectrograms is about 100 GB. A GCP VM with 16 GB RAM can't load that. I preprocessed the dataset into ~130 parquet files and wrote a data loader that streams chunks during training. Each chunk fits in memory, and the loader cycles through them. This is a practical data engineering problem that doesn't show up in tutorial-scale ML.

### 3. PyTorch over TensorFlow
I tried both. Started exploratory work in Keras/TensorFlow, then moved to PyTorch for the final model. PyTorch gave me more control over the training loop and the custom data loading pipeline. The TensorFlow/Keras code still exists in the repo but isn't the final system.

### 4. 16 kHz sample rate
Piano audio has energy up to ~4 kHz for the highest notes. 16 kHz sampling gives a Nyquist frequency of 8 kHz, which captures all piano fundamentals and lower harmonics. Higher sample rates (44.1 kHz) would increase compute and memory for marginal improvement.

### 5. Evaluation by listening
Standard metrics for piano transcription are frame-level F1, precision, recall. I computed those, but I also evaluated by rendering predicted MIDI and listening to it side by side with the original audio. Numeric metrics miss errors that matter musically: timing drift is inaudible at the frame level but sounds wrong when played back. Dropped notes in a quiet passage score the same as dropped notes in a melodic line but sound very different. Subjective listening caught issues that F1 didn't flag.

---

## Things that are incomplete (and what I'd fix)

### Model accuracy is not SOTA
The CNN architecture is basic compared to modern transformer-based approaches (Google's MT3, Onsets and Frames v2). The pipeline works end to end but the transcription quality has room for improvement. A production version would use a transformer encoder, pre-trained on a larger corpus, with an attention mechanism over the time axis.

### No real-time capture
The system processes audio files, not live microphone input. A real-time version would need streaming spectrogram computation and overlapping inference windows with sub-second latency. This was scoped out of the two-week sprint.

### Limited instrument range
Trained only on solo classical piano (MAESTRO). Does not generalize to other instruments, ensembles, or pop/jazz piano with different recording conditions. Extending to multi-instrument transcription would require a different dataset and a different architecture.

### No formal evaluation suite
I computed metrics on a held-out test split and listened to outputs. A proper evaluation would include: mir_eval benchmarks, per-octave accuracy breakdown, onset/offset timing analysis, and comparison against published baselines on MAESTRO.

---

## Questions an interviewer might ask

### Softballs
- **"Walk me through the pipeline."** Use the 3-minute walkthrough above.
- **"Why piano transcription?"** I wanted a real ML project, not a notebook toy. Piano transcription requires handling a large dataset, solving a genuine alignment problem, training for real time on real compute, and evaluating output that isn't just a classification label.
- **"What was the hardest part?"** The spectrogram-to-MIDI alignment. If the training pairs are misaligned by even a few milliseconds, the model learns the wrong thing. Getting that right was harder than building the model itself.

### Medium
- **"Why a CNN and not a transformer?"** Time and scope. The bootcamp sprint was two weeks. A CNN is faster to implement, train, and debug. I'd use a transformer for a production version, but the CNN let me ship a working end-to-end pipeline in the window I had.
- **"How did you handle the dataset not fitting in memory?"** Chunked it into about 130 parquet files during preprocessing. The data loader streams one chunk at a time, cycles through all of them each epoch, and frees memory between chunks. Standard out-of-core approach but important to have done it.
- **"What metrics did you use?"** Frame-level precision, recall, and F1 over the 88-key output. Plus subjective listening evaluation: render predicted MIDI, compare against original audio for timing accuracy and musicality. Metrics told me the model was learning; listening told me where it was failing.
- **"What was the group dynamic?"** Nominally a group project, but in practice I did the large majority of the work: the architecture, the data pipeline, the training, and the evaluation. I don't say that to complain, I just want to be honest about what I can defend.

### Gotchas
- **"Isn't 11 ms resolution too coarse for fast piano passages?"** Fast trills can have note onsets ~30 ms apart. At 11 ms resolution I have about 3 frames per onset, which is marginal. A higher-resolution spectrogram (shorter hop length) would help at the cost of longer training.
- **"How do you handle sustain pedal?"** I don't, explicitly. The piano roll representation treats each key as on/off, which loses sustain information. A real system would model pedal events as separate outputs.
- **"Why parquet and not HDF5 or TFRecords?"** Parquet was what I knew from the bootcamp data engineering modules. HDF5 would work fine. The format choice is less important than the chunking strategy.
- **"Your model predicts frame-level probabilities. How do you decide the threshold for note on vs off?"** Fixed threshold, tuned on the validation set. A more sophisticated approach would use per-key adaptive thresholds or a post-processing HMM to enforce temporal consistency.

---

## Tools and libraries to remember

- **PyTorch 2.5.1** — primary training framework
- **Keras 3.6.0 + TensorFlow 2.18.0** — exploratory, not the final model
- **librosa 0.10.2** — spectrogram extraction from audio
- **music21 9.3** — MIDI to score conversion
- **MIDIUtil 1.2.1** — piano roll to MIDI conversion
- **PyArrow 18.0** — parquet reading for out-of-core data loading
- **scikit-learn** — standard ML utilities
- **MuseScore** — external tool for final sheet music rendering
- **Google Cloud VM with GPU** — training compute
