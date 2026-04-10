# PianoTranscriber (bootcamp capstone)

**Repo:** `~/Workspace/archive/bootcamp/github/PianoTranscriber/` (public: [github.com/MLGalusha/PianoTranscriber](https://github.com/MLGalusha/PianoTranscriber))
**Status:** Completed capstone, paused post-bootcamp
**Role:** Primary builder (nominally a group project; Mason did the majority of the work)
**Timeline:** May – December 2024, UNC Chapel Hill AI bootcamp (6 months). The capstone itself was a **two-week sprint** at the end of the program; training ran ~**1 full week** on a Google Compute Engine GPU VM inside that window.
**Scale:** ~30,700 lines of Python (notebooks, data scripts, model, pipeline), 62 commits

## One-liner
CNN-based real-time audio-to-MIDI transcription: takes piano audio input, emits digital sheet music. Trained on the MAESTRO dataset (~200 hours of classical piano, ~100GB preprocessed).

## Why it exists
Bootcamp capstone. Mason chose the project because he wanted hands-on experience with a full ML pipeline — from dataset handling at scale, through model training, through evaluation, through an end-to-end inference path — rather than a notebook-scoped toy problem. It was nominally a group project, but in practice Mason did the large majority of the work.

## Architecture (verified from source)

### Stack
- **Training:** PyTorch 2.5.1 (primary); Keras 3.6.0 + TensorFlow 2.18.0 (exploratory)
- **Audio processing:** librosa 0.10.2 (spectrogram extraction), music21 9.3 (MIDI → score), MIDIUtil 1.2.1 (piano roll → MIDI)
- **Data:** MAESTRO dataset (~200 hours classical piano, ~100GB preprocessed), PyArrow 18.0 for parquet, scikit-learn, numpy
- **Compute:** Google Cloud VMs with GPUs (managed externally)

### Model
- **Architecture:** CNN with convolutional layers + max pooling (frequency axis pooled 513 → 128)
- **Input:** spectrogram chunks of shape `[batch, 1, 240, 513]` — roughly 2.6 seconds of audio at 16 kHz
- **Output:** per-time-step probability for each of the 88 piano keys
- **Training regime:** sliding-window — 240-row input windows, middle 80 rows as the target, overlap-based sampling

### Pipeline (end-to-end)
1. Raw audio in → custom spectrogram preprocessing (11 ms time resolution)
2. Spectrogram + corresponding MIDI-aligned piano roll as training pair
3. CNN training on GCP VM with GPU
4. Trained model → per-key probability sequence
5. Post-processing: piano roll → MIDI via MIDIUtil
6. MIDI → sheet music via MuseScore

## Hard problems solved
- **Memory-efficient handling of a ~100GB dataset** during training. Not a problem you face in a notebook tutorial. Dataset was chunked into ~130 preprocessed files for out-of-core batching so the training loop could stream through it without blowing GPU or disk memory.
- **Spectrogram/MIDI alignment** at millisecond precision — getting training pairs correct in time is a non-trivial preprocessing task with real audio.
- **Sliding-window training architecture** — the decision to train on a 240-frame input window while only predicting the middle 80 frames is an overlap-driven choice that buys stability at inference time.
- **GCP VM training workflow** — provisioning, dataset transfer, training run management, hyperparameter tuning loop.
- **Evaluation harness** for a model whose output is a continuous note-on probability matrix, not a classification label. Mason also evaluated the model subjectively by listening — rendering the predicted MIDI and comparing it against the original audio. Numeric metrics miss the kind of errors (timing drift, wrong sustain, dropped notes) that are obvious to the ear.

## Limitations / what he'd do differently
- Model accuracy needed more work; the pipeline was complete but the CNN was not state-of-the-art for this task. Modern approaches would use a transformer-based encoder.
- **Real-time capture / UI integration was scoped out of the graded timeline.** The end-to-end offline pipeline (audio file → MIDI → sheet music) worked; a live microphone path was planned and documented but not shipped inside the two-week window.
- Not actively maintained post-bootcamp.

## Interview talking points

- **Lead with:** CNN training on real-world ML dataset at scale (~100GB MAESTRO), end-to-end audio-to-MIDI pipeline, GCP GPU training
- Custom spectrogram preprocessing with millisecond MIDI alignment
- Sliding-window training architecture (240-frame input, 80-frame overlap)
- Dataset handling at scale — memory-efficient loaders, parquet for preprocessing
- Choice of PyTorch as primary framework; used TensorFlow/Keras exploratorily
- End-to-end deployment: audio → spectrogram → CNN → piano roll → MIDI → sheet music via MuseScore
- Honest framing: "the pipeline was complete and worked end to end, the model accuracy needed more work — that's where I'd invest next"

## Claim guardrails
Things Mason can fully defend in an interview based on this project:
- PyTorch CNN training on a real dataset at scale
- Audio ML preprocessing (librosa, spectrogram generation, MIDI alignment)
- GCP VM GPU training workflow
- End-to-end ML pipeline from raw audio to usable output format
- 6-month structured AI bootcamp experience
