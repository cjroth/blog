Companies are starting to print LLM weights directly onto silicon. The implications go way beyond faster chips.

Taalas is the most visible player: they bake model weights into a chip's wiring so inference doesn't touch memory at all. Independent journalists verified ~15,000-17,000 tokens/sec on Llama 3.1 8B at ~200-250W. For context, single-user GPU inference runs around 350 tok/s.

The approach borrows from the structured ASIC playbook of the early 2000s. Pre-manufacture a base chip, then customize the final wiring layers for a specific model. A compiler generates the chip design in about a week. Claimed result: 1000x better performance-per-watt, 20x lower build cost than an H100.

The obvious objection: each chip runs exactly one model, permanently.

But this matters less than you'd think. Frontier models are plateauing and converging — the gap between first and tenth place on Chatbot Arena has compressed dramatically in one year. The open-weight vs. proprietary gap on MMLU narrowed from ~8 percentage points to ~1.7. Frontier models are overkill for roughly 80% of enterprise workloads.

A hardwired Llama 4 that's 6 months old but runs at 17,000 tok/s might outperform a current frontier model in practice — because speed enables richer agent loops, more retrieval passes, and better chain-of-thought at negligible marginal cost.

Taalas isn't alone. The broader custom inference ASIC space is moving fast:

→ Etched ($620M raised) hardwires the transformer architecture but loads weights from memory, so one chip runs any transformer model
→ Groq ($20B licensing deal with NVIDIA) uses deterministic scheduling to eliminate GPU overhead
→ Cerebras ($10B+ agreement with OpenAI) builds wafer-scale chips with massive on-chip memory
→ TrendForce projects custom ASIC shipments growing 44.6% in 2026 vs. GPU shipments at 16.1%

The second-order effects are where it gets really interesting.

If inference becomes 50x faster and 1000x more power-efficient on-device, the economics shift hard toward running things locally. Agents running on printed chips with no network latency compress every "turn" to sub-second timelines. But if the model is fast and the data is far away, you've just moved the bottleneck from compute to network.

This is the forcing function for local-first databases becoming essential infrastructure for agentic computing. Agents running in parallel across cloud, edge, and desktop need co-located, eventually consistent data. The SQLite renaissance is already underway — Turso, LiteFS, Cloudflare D1, PGlite. Turso is already positioning for "database-per-agent" architectures.

There's a privacy dimension too. AI makes inferential privacy violations possible — deducing sensitive information never explicitly disclosed. The Markup found 650,000 audience segments that advertisers could use to target people, including labels like "Heavy Purchasers of Pregnancy Tests" and specific medical diagnoses, all inferred from browsing and purchase data. 53% of Americans say AI does more to hurt than help privacy. Local-first architectures provide a structural answer: keep data on-device, under user control.

The spending data tells a Jevons's Paradox story. Inference costs dropped ~1,000-fold in three years while demand rose ~10,000-fold. Enterprise AI spending more than tripled from $11.5B to $37B in a single year. Cheaper AI doesn't reduce total spend — it increases it.

The energy side follows the same pattern. The IEA projects global data center electricity doubling to 945 TWh by 2030. Efficiency gains historically get consumed by demand growth. But ASICs could moderate the energy crisis even as usage explodes — the spend keeps growing, but watts-per-query might actually decline.

Important caveats: Taalas has no paying customers and acknowledges its business model is "still being defined." No independent quality benchmarks exist — speed without accuracy is meaningless. NVIDIA's Vera Rubin promises 5x inference improvement over Blackwell, which would narrow the efficiency gap. And the cautionary tales are real — Mythic AI, Wave Computing, and Graphcore all pursued custom AI silicon with big claims and bigger fundraises before running into trouble.

Still, the convergence is hard to ignore. AI PCs will hit 55% of global PC shipments by 2026. AMD's Ryzen AI Max runs Llama 3 70B on a laptop. Apple's on-device AI strategy offers inference at zero API cost to developers. One estimate puts 80% of compute happening locally with 20% left for the cloud.

If these trends play out, we're looking at AI that's fast, cheap, private, and everywhere — running on commodity hardware rather than controlled by a handful of cloud providers. The terrifying flip side: sub-second agent turns with local data means autonomous AI systems that iterate at inhuman speed with no natural friction to slow them down.
