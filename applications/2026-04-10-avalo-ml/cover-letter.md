Hi Avalo team,

I don't have a biology background. What I do have is real experience training models on large datasets and building the full pipeline around them. My PianoTranscriber project trained a PyTorch CNN from scratch on the MAESTRO dataset, roughly 100GB of preprocessed piano audio. I built custom spectrogram preprocessing at 16 kHz / 11 ms resolution, implemented out-of-core batching across 130 Parquet chunks because the dataset didn't fit in memory, and ran training on GCP GPU VMs. The full pipeline goes from raw audio to spectrogram to CNN inference to MIDI to sheet music. That end-to-end ownership, from raw data to usable output, is what I think matters most at a company your size.

What interests me about Avalo specifically: you're applying ML to a domain where the feedback loops are measured in growing seasons, not milliseconds. That constraint forces a different kind of rigor in how you design experiments and evaluate models. Most ML teams can afford to iterate fast and retrain. When your ground truth takes months to materialize, the upfront pipeline and evaluation design has to be much more careful. I find that kind of constraint interesting to work within.

I also built a production AI pipeline for Voices That Remain that processes 10,000 handwritten documents through a 4-stage system with human-in-the-loop verification gates. The HITL design exists because I learned that AI outputs without structured validation and human checkpoints are unreliable at scale. That same principle applies to any ML system making real-world predictions.

I'm in Raleigh, 20 minutes from Durham. Happy to discuss how my ML engineering experience maps to what you're building.

Best,

Mason Galusha
masonlgalusha.careers@gmail.com
304-546-5850
github.com/MLGalusha
linkedin.com/in/masonlgalusha
