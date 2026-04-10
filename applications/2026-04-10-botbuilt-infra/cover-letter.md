# Cover Letter — BotBuilt, Software Infrastructure Engineer

Hi BotBuilt team,

I set up the entire GCP infrastructure for my production app from scratch. Cloud Run containers for the backend and frontend, Cloud SQL for managed Postgres, Cloud Build for CI/CD triggered on every push, Cloud Storage for the image archive, and a Drizzle migration journal that coordinates with the deploy pipeline for zero downtime schema changes. Voices That Remain is 58,700 lines of TypeScript across 547 commits, live at voicesthatremain.com, and I built it solo.

Before I used agents, I wrote 14,000 lines of Python by hand for an audio fingerprinting engine through all of 2025. I did that deliberately so I would understand the code before I let agents write it. When I switched to agent directed development in early 2026, the transition was easy because I already knew what was being generated. I shipped the majority of VTR's production work, including the full cloud infrastructure setup, in about three weeks of focused work. For an 8 person team that needs an engineer who can own entire systems without waiting for someone to break the work down, that is the relevant data point.

What I find interesting about BotBuilt is that you are building software infrastructure for physical robots, which means your deploy pipeline failures have consequences beyond a 500 error. If a bad push affects how a robot frames a wall, that is a different severity class than a web app regression. I have not worked in robotics before, but that kind of constraint, where software reliability has physical consequences, is the kind of engineering problem that forces you to think harder about testing, rollback, and observability. I want to work in an environment where that rigor is the baseline, not an afterthought.

I am in Raleigh, 30 minutes from Durham. I would like to talk about what infrastructure ownership looks like on a team this small.

Mason Galusha
masonlgalusha.careers@gmail.com | 304-546-5850
github.com/MLGalusha | voicesthatremain.com
