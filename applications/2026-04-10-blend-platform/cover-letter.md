Hi Blend team,

I build platform-level infrastructure, not just features on top of it. Voices That Remain is a production app with 20 database tables, zero-downtime Postgres migrations via Drizzle ORM, a Cloud Build CI/CD pipeline, session auth, role-based access, and structured logging with Pino. 58,700 lines of TypeScript, 547 commits, 46 Playwright E2E tests. The system processes 10,000 handwritten documents through a 4-stage AI pipeline where each stage has its own data model, validation layer, and failure handling. I built it to be maintained, not just to work once.

One thing I noticed: Blend is hiring for platform foundation specifically, which tells me you're at the stage where internal developer experience is becoming a bottleneck. That's a different problem than building product features. Platform work is about reliability, clear API contracts, and making the right thing easy for other engineers to do. I think about systems that way naturally. When I built Staffclaw, I reverse-engineered 92 undocumented API endpoints and designed a transparent proxy architecture so the client could interact with both the original platform and my extensions through a single consistent interface. That's platform thinking applied to a messy external system.

I wrote 14,000 lines of Python by hand for SonicGen, no coding agents, specifically so I would understand code at the level where I can review and own what agents produce now. That foundation matters for platform work where reliability and correctness are not optional.

I'm in Raleigh and can be at North Hills daily. Happy to walk through the VTR codebase or discuss platform architecture.

Best,

Mason Galusha
masonlgalusha.careers@gmail.com
304-546-5850
github.com/MLGalusha
linkedin.com/in/masonlgalusha
