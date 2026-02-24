A company achieve 17,000 tokens/second on Llama 3.1 8B.

Taalas is hardwiring model weights directly into silicon to achieve this - and it uses as little as 200W of power.

They're not alone. Etched hardwires the transformer architecture. Groq uses deterministic scheduling. Cerebras builds wafer-scale chips. Custom ASIC shipments are projected to grow 44.6% in 2026 versus 16.1% for GPUs. The economics are pulling the industry toward specialization.

The second-order effects are where it gets really interesting.

1. Agents get dramatically faster and cheaper. Inference costs have already dropped ~1,000-fold in three years. Specialized chips push this further. Every "turn" in tools like Cursor or Claude Code that currently takes seconds could compress to sub-second timelines.

2. Compute migrates to the edge and device. AI PCs will hit 55% of global PC shipments by 2026. AMD's Ryzen AI Max runs Llama 3 70B on a laptop. Apple's on-device AI strategy offers inference at zero API cost to developers. One estimate puts 80% of compute moving to local devices.

3. Network latency becomes the new bottleneck. When the model runs 50x faster with no network round-trip, the bottleneck shifts from compute to data access. This is the forcing function for what comes next.

4. Local-first databases become essential infrastructure. Agents running in parallel across cloud, edge, and desktop need co-located data. The same infrastructure that gives users instant, offline-capable apps also gives local AI agents instant access to their data. Turso/libSQL is already positioning for "database-per-agent" architectures.

5. Privacy becomes architectural. AI makes inferential privacy violations possible — deducing sensitive information never explicitly disclosed. Local-first provides a structural answer: keep data on-device, under user control.

The cost paradox is worth noting. DeepSeek R1 delivered comparable performance at ~27x cheaper inference costs, and usage exploded. Enterprise AI spending more than tripled from $11.5B to $37B in a single year. Cheaper inference won't reduce total AI spend — it will increase it. Jevons's Paradox in real time.

The terrifying flip side: sub-second agent turns with local data means autonomous AI systems that iterate at inhuman speed. There are legitimate concerns about what happens when you remove all the friction — latency, cost, network dependencies — that currently acts as a natural brake on autonomous AI.

But the bigger picture is that AI is becoming dramatically more distributed, faster, and cheaper — and in all likelihood, more democratizing than many people expect. When inference is nearly free and runs on commodity hardware, AI stops being something controlled by a handful of cloud providers and becomes something that runs everywhere, for everyone.
