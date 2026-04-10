# SonicGen: finding a 15-second clip in a 200-hour archive

You can find where a 15-second audio clip came from in a 200-hour podcast archive in about a second. That's what SonicGen does.

SonicGen is an audio fingerprinting engine. You give it a clip, it tells you which source video the clip is from and at what timestamp it starts. I built it in September 2025 as the first piece of a larger idea called Truth Engine, a searchable archive of public-figure audio where any clip circulating on social media could be traced back to its original context with the surrounding words restored. While I was working on SonicGen, Voices That Remain was proposed to me. I accepted and put SonicGen on hold. It works in the state I left it, and it could work a lot better.

## How it works

The core problem: you have a long recording (say, a 200-hour podcast archive) and a short clip (say, 15 seconds from somewhere inside it). You want to know *where* the clip came from. Comparing raw audio is hopeless. The clip has been re-encoded, has different noise, maybe a different bitrate. Byte-level comparison fails on the first frame.

The trick is to stop comparing audio and start comparing *shapes*.

Run the audio through a spectrogram. A spectrogram is a 2D picture: time on the x-axis, frequency on the y-axis, loudness as the color. Now look at that picture and find the local peaks, the points that are louder than everything around them in a small neighborhood. These peaks are stable. They survive re-encoding, compression, background noise. If you show me the same audio twice in two different formats, the peaks land in almost exactly the same places.

Now pair them up. Pick a peak. Call it the anchor. Look a short distance forward in time and grab a handful of other peaks. For each pair of (anchor, target), record three numbers: the anchor's frequency, the target's frequency, and the time gap between them. Hash those three numbers together. You now have a fingerprint, a compact token that describes a specific shape in the spectrogram, independent of when it occurs.

Do this across the entire archive and you get millions of these hashes, each tagged with the source file and the timestamp where the anchor lives. Dump them into a database.

To search, fingerprint the 15-second clip the same way. Look up every hash from the clip in the database. Each hit tells you "this shape also appeared at timestamp T in source S." The real work, the part that makes this fast and the part where naive implementations fall apart, is what you do with those hits.

That's the next section.

## The pipeline

Here's what SonicGen actually does when you hand it an audio file.

Everything gets normalized to 16 kHz mono first. Higher sample rates don't help for this. The frequencies that matter for speech and music peaks sit well below 8 kHz, and downsampling cuts the spectrogram size without losing signal.

Then the STFT. I use an FFT size of 2048 with a hop length of 256, which at 16 kHz gives about 62 frames per second. Each frame is a column in the spectrogram. I convert to log power because loudness in audio is logarithmic and linear-power peaks get dominated by a handful of bass transients.

I band-limit to 80-500 Hz. That's narrow, and it's a deliberate choice: the Truth Engine target was spoken-word archives, and the fundamental frequencies of human voices live in that band. Limiting the search space makes peaks more robust and the fingerprint more specific to voice.

Peak detection runs a 25x25 neighborhood maximum filter across the log-power spectrogram. A point is a peak if it's the loudest thing in a 25-frame by 25-bin window around it, and if its value is above a -30 dB floor relative to the clip's max. The floor kills silence. The neighborhood size controls how many peaks you get per second. Too small and you drown in peaks, too large and you lose resolution.

For pairing, I use a fan value of 3: each anchor peak pairs with the 3 nearest target peaks that fall inside a maximum delta-t of 400 frames (about 6.4 seconds). For each pair I hash `(freq1, freq2, delta_t)` with SHA1 and keep the first 20 hex characters. That's the fingerprint token.

The last knob is a rate cap: no more than 30 hashes per second of audio. Spoken-word audio doesn't need more than that, and the cap prevents dense musical passages from blowing up the database.

None of these numbers are sacred. They're what worked after a few dozen runs on the test archive. I'd expect to retune them for any archive that isn't English speech.

## The matching trick

Looking up the clip's hashes in the database is the easy part. The hard part is what you do with the hits.

A 15-second clip produces around 400 hashes. Query them against an archive and you get tens of thousands of hits back, because hash collisions are real. Any given `(freq1, freq2, delta_t)` triple shows up in a lot of places across hundreds of hours of audio. If you just rank by hit count, you get noise. A source file that's 10 hours long has more chances to coincidentally match than a source file that's 30 minutes long, and the long file wins every query for the wrong reason.

The insight is alignment. A real match doesn't just produce hits, it produces hits that line up in time. If the clip's anchor peak at clip-time 2.3s matches a database hash at source-time 847.1s, and the clip's anchor peak at clip-time 2.7s matches a database hash at source-time 847.5s, those two hits agree on an offset: the clip starts around source-time 844.8s. Real matches will have dozens of hits all agreeing on the same offset. Random collisions will be scattered across all possible offsets uniformly.

So for every hit, I compute `source_time - clip_time` and bucket by source file. Then for each source file, I count how many hits land in the same offset bucket. `Counter.most_common(1)` gives me the winning offset and its vote count in a single call.

The threshold is two numbers: `min_aligned_matches=18` (at least 18 hits must agree on the offset) and `min_alignment_ratio=0.4` (those aligned hits must be at least 40% of the total hits for that source). The first cuts out weak matches. The second cuts out the long-file problem. A 10-hour file might collect 25 aligned hits by chance, but it also collected 5000 unaligned ones, and the ratio kills it.

The result: a clip lookup against a 200-hour archive returns the source and start offset in about a second, and when it's wrong, it says "no match" instead of guessing.

## Why the database choice was wrong

I built the first version of the hash storage on Supabase. This was a mistake, and it's worth saying why, because the mistake wasn't technical. It was that I picked the tool I wanted to learn next instead of the tool the problem needed.

SonicGen's database workload is: write millions of rows once when you fingerprint an archive, then do one query per lookup that hits tens of thousands of rows and aggregates them. That's an analytical workload. Postgres can do it, but Supabase's managed Postgres adds network latency to every query, and the row counts made every lookup slow enough to feel broken. A local SQLite file with a single index on the hash column would have been faster on my laptop than the hosted Postgres was over the network.

I picked Supabase because I wanted to learn it. It was popular, I was deep into SQL at the time, and a hosted managed Postgres felt like the right place to put the hash storage. The lesson: "I want to learn this tool" is not the same as "this tool fits the problem." I was naive to reach for a hosted database at all on a project like this. A local SQLite file, or any equivalent local store, would have been the obvious choice. The right move on a greenfield offline-first project is to pick the boring local thing and only reach for a managed service when you actually need what the service provides.

This is the kind of decision I now try to make explicitly on every new project: what is this workload, and what is the simplest storage that serves it?

## What's still wrong

Three things about SonicGen are honest weaknesses, and I'd want to fix all of them before putting it in front of anything real.

The alignment check assumes a single offset per source. If a clip occurs twice in the same source file, same speaker saying the same sentence at two different timestamps, the second occurrence is invisible. The aligned-offset winner takes everything. The fix is to cluster offsets and return all clusters above threshold, not just the top one. I never hit the case in testing, so I never wrote it.

The match threshold is static. `min_aligned_matches=18` was tuned against clean clips in the test archive. Noisy clips underperform and clean clips overperform. The right version adapts the threshold to the clip's peak count and signal quality, or normalizes the score relative to what a random clip against the same archive would produce. Neither is written.

I never stress-tested collisions at scale. The hash is SHA1 truncated to 20 hex characters, which is 80 bits. The birthday bound says collisions are statistically fine for archives well beyond anything I tested on, but I only ever ran it against a few hundred hours. A real archive is orders of magnitude larger, and the collision behavior at that scale is theoretical to me, not measured.

None of these are fatal. All of them are the kind of thing you discover the moment you put the system in front of real data it wasn't tuned for, which is exactly why they aren't fixed yet.

## What I actually learned

The thing I took from SonicGen wasn't "I know how to do audio fingerprinting." It's a specific kind of pattern I now recognize in other problems: when raw data is too noisy to compare directly, hash the *shape* of the data, and match on agreement between many weak signals rather than on any single strong one. The alignment-offset trick is a voting system against collision noise. The whole system is built on the premise that no single hash is reliable but a thousand hashes voting together are.

That pattern generalizes. It's how locality-sensitive hashing works for near-duplicate detection, it's how perceptual image hashing works, it's how a lot of retrieval systems work under the hood. I didn't know that when I started. I know it now because I wrote the voting loop by hand and watched it fail until the failures made sense.
