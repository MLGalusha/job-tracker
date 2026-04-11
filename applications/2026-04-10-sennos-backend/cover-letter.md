# Cover Letter — Sennos, Backend Software Engineer (Data Services)

Hi Sennos team,

I have spent the last year and a half building data pipelines in Python. The biggest one processed 100GB of audio data through custom spectrogram preprocessing, frequency band limiting, and spectral peak detection to train a neural network on GCP GPU VMs. The second one is a restartable ingestion pipeline that moves videos through status flags with upserts on every transition so a killed run picks up exactly where it left off. Both of those are the same class of problem as sensor data pipelines: noisy time series input, signal processing, and pipeline architecture that has to be reliable at volume.

SonicGen, my audio fingerprinting engine, is 14,000 lines of Python I wrote entirely by hand. I did this deliberately through all of 2025 because I wanted to understand Python deeply before I started directing agents to write it. The signal processing fundamentals I built there, STFT spectrograms, frequency domain analysis, peak detection via scipy, time series alignment, transfer directly to sensor data work. The domain is different but the engineering patterns are the same.

I build primarily by directing coding agents now, and they are my daily tools. I shipped Voices That Remain, a 58,700 line TypeScript production system with a multi stage AI pipeline, solo in about three weeks of focused work. I review and own every decision, but the agents handle the raw typing. For a 30 person company that needs to move fast, that velocity matters.

What interests me about Sennos is that you are building software on top of physical sensor data, which means your backend engineers have to deal with the messiness of real world signals, not just clean API responses. That is a fundamentally harder data engineering problem, and it is the kind of work where my signal processing background actually matters. Most backend engineers have never had to think about frequency domains or noise floors. I have.

I am in Raleigh, 30 minutes from Durham. I would like to learn more about the data services architecture.

Mason Galusha
masonlgalusha.careers@gmail.com | 304-546-5850
github.com/MLGalusha | voicesthatremain.com
