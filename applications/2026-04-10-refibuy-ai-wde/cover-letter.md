Hi ReFiBuy team,

I build data extraction pipelines that handle messy, real-world input and produce structured output. The two projects that map closest to what you're building: SonicGen is a 14,000-line Python audio fingerprinting engine I wrote by hand. Its YouTube ingestion pipeline pulls data from external APIs, handles rate limits and transient failures, tracks progress with status flags, and resumes cleanly from any crash state. Voices That Remain takes 10,000 unstructured handwritten documents and extracts structured metadata using GPT-5.4 Vision with Zod schema validation. Both systems solve the same fundamental problem your scraping stack solves: take unreliable, varied external data and turn it into something structured and queryable.

What caught my attention about ReFiBuy is the framing as "SEO for AI." Most commerce analytics companies are still optimizing for Google's ranking signals. You're positioning around how AI models surface and recommend products, which is a different data problem entirely. The extraction layer has to capture what an LLM would use to form a recommendation, not just what a search engine would index. That distinction matters for how you design the crawling and parsing stack, and it's the kind of problem I want to work on.

I also reverse-engineered 92 undocumented API endpoints for Staffclaw in a single session, building a transparent proxy client for a scheduling platform. That kind of rapid API exploration and structured extraction from systems that weren't designed to be scraped is directly relevant.

I'm in Raleigh, walking distance from Glenwood South. Happy to talk about the extraction stack you're building.

Best,

Mason Galusha
masonlgalusha.careers@gmail.com
304-546-5850
github.com/MLGalusha
linkedin.com/in/masonlgalusha
