What if AI models were printed directly onto chips — like circuit boards, not software?

That's what one company is betting on.

Taalas is baking model weights into silicon wiring. One transistor per weight. No memory bottleneck, no expensive HBM chips. They claim ~17,000 tokens/sec on Llama 3.1 8B — roughly 50x faster than NVIDIA Blackwell. (Most claims are still self-reported, no independent benchmarks yet.)

They're the extreme end of a broader wave. Etched, Groq, Cerebras, and EnCharge AI are all building custom inference chips — each attacking the speed problem from a different angle. Billions in funding. NVIDIA licensing Groq's tech for $20B. The ASIC trend is accelerating fast.

The counterargument is obvious: printed chips run one model, permanently. But that matters less than you'd think.

Three reasons:

1. Frontier models are plateauing. The gap between #1 and #10 on Chatbot Arena has compressed dramatically. Open-weight models are closing in on proprietary ones.

2. Most enterprise workloads don't need frontier. ~80% of production tasks (summarization, extraction, classification, routing) work fine on smaller models.

3. RAG and tool use decouple intelligence from freshness. A hardwired model calling search APIs doesn't need yesterday's training data.

Here's what's counterintuitive: cheaper inference doesn't reduce total AI spend. It increases it.

DeepSeek R1 delivered comparable performance at ~27x cheaper inference costs — and usage exploded. Anthropic's ARR surged from $1B to $9B. Enterprise AI spending more than tripled in a single year. This is Jevons's Paradox playing out in real time. Every efficiency gain gets consumed by demand growth.

If these chips deliver on their claims, the downstream implications could be significant:

→ Agents completing reasoning loops in milliseconds instead of seconds
→ On-device AI running offline with no cloud dependency
→ Data access (not compute) becoming the real bottleneck
→ Local-first databases becoming essential infrastructure for agents
→ Privacy by architecture — data stays on-device

The local-first piece is especially interesting. There are 26+ tools in this space already (Turso, ElectricSQL, Automerge, Yjs) — growing independently of AI. But on-device AI makes all of it dually relevant: the same infrastructure that gives users instant, offline-capable apps also gives local AI agents instant, co-located data.

The bigger picture: AI is becoming dramatically more distributed, faster, and cheaper — and probably more democratizing than most people expect.

If inference becomes nearly free and runs on commodity hardware, AI stops being controlled by a handful of cloud providers and becomes something that runs everywhere, for everyone.