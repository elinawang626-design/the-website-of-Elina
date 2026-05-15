const experiences = [
  {
    area: "Clinical AI",
    title: "Atlaslab IDE / Verifiable AI Agents for Clinical Research",
    short: "面向临床研究团队的可信 AI workspace 与 agent-flow evaluation。",
    text: "Contributed to framing a local medical research AI workspace that integrates files, literature workflows, tabular data, code, notebooks, reports, and agent chat into one evidence-traceable environment for clinical research teams.",
    impact: "主线核心：把 source files / papers -> extracted variables -> analysis / code -> tables / figures / reports 做成可追踪、可审计、可复现的 clinical research execution layer。",
    meta: ["Agent-flow evaluation", "Provenance", "Clinical workflow"],
    platform: "Atlaslab",
    tags: ["Agent Loop", "Desktop", "Planning", "Python"],
    color: ["#77c7af", "#4f9b88"],
  },
  {
    area: "Trustworthy RAG",
    title: "ChatDKU Mini Agentic RAG System",
    short: "双语机构知识问答系统，强调 retrieval、grounding 与 evaluation。",
    text: "Built a bilingual mini agentic RAG system over DKU advising documents, supporting PDF/DOCX ingestion, chunking with source metadata and page numbers, keyword search, vector search, internet fallback, and source-grounded answers in English and Chinese.",
    impact: "最直接证明你不是只会调用 LLM，而是在做可评估、可追责、可部署的 institutional assistant。",
    meta: ["PDF/DOCX", "Vector search", "Local LLM"],
    platform: "ChatDKU RAG",
    tags: ["RAG", "DSPy", "Bilingual", "Evaluation"],
    color: ["#e6b44c", "#b48122"],
  },
  {
    area: "Medical Agent",
    title: "Xiao-X-Bao Medical Deep Search Agent",
    short: "基于 Research Ledger 和 citation verification 的医学深度检索系统。",
    text: "Contributed to an evidence-based medical deep research system built around a deterministic 10-stage pipeline: question classification, research planning, PubMed/knowledge search, deduplication, evidence extraction, rule-based citation verification, thematic synthesis, and Markdown report generation.",
    impact: "把医学 AI 输出约束在 verified evidence 上，每条 claim 都能回到 source ID、PMID/DOI 和 abstract quote。",
    meta: ["10-stage pipeline", "Citation verifier", "Research ledger"],
    platform: "Medical Search",
    tags: ["Medical AI", "PubMed", "Evidence", "Ledger"],
    color: ["#ee805f", "#bf5f46"],
  },
  {
    area: "Health Privacy",
    title: "Medical Desensitization Workspace",
    short: "病历进入 AI workflow 前的 privacy-preserving preprocessing layer。",
    text: "Built or contributed to a medical-record desensitization workspace that processes pasted text, PDFs, images, and batch uploads before sending safe text into an AI chat workflow.",
    impact: "补足 health AI trust 的 privacy layer：姓名、手机号、身份证号、地址、病历号、生日、邮箱等敏感字段可自动/手动脱敏。",
    meta: ["PDF/image/text", "Batch export", "Manual rules"],
    platform: "Desensitize",
    tags: ["Next.js", "Go Backend", "OCR", "Privacy"],
    color: ["#5d8dc8", "#426fa4"],
  },
  {
    area: "Memory / RAG",
    title: "memU Retrieval Layer Upgrade / Hybrid RAG Systems",
    short: "统一 Top-K retrieval abstraction，整合 dense、BM25、keyword 与 hybrid ranker。",
    text: "Designed a retrieval systems direction around modular Top-K retrieval, dense retrieval, BM25, keyword retrieval, hybrid ranking, reciprocal-rank-fusion style fusion, and retrieval-quality evaluation.",
    impact: "技术深度支撑：证明你理解检索架构、trade-off 和评估，而不只是把 LLM 接到一个搜索框上。",
    meta: ["Multi-platform", "Renderer stores", "Settings center"],
    platform: "memU RAG",
    tags: ["Hybrid RAG", "RRF", "Recall@K", "MRR"],
    color: ["#63b6b8", "#3b8a8d"],
  },
  {
    area: "Synthetic Biology",
    title: "iGEM Competition — Two-time Silver Medalist",
    short: "L-DOPA gut simulation 与 synthetic biology wet-lab grounding。",
    text: "Investigated L-DOPA production and stability in simulated gut conditions using engineered yeast, anaerobic culture setup, media optimization, fluorescence/HPLC-based detection, and microbial co-culture constraints.",
    impact: "Biomedical grounding：说明你理解 health AI 背后真实的 wet-lab、复杂生物环境与转化约束。",
    meta: ["Two-time Silver", "L-DOPA", "Gut simulation"],
    platform: "iGEM",
    tags: ["Synthetic Biology", "HPLC", "Wet Lab", "Team Lead"],
    color: ["#d89173", "#aa654d"],
  },
  {
    area: "Biomedical Research",
    title: "Drug Mechanism Research: LLPS and Autophagy",
    short: "围绕 6J1、LLPS 与自噬通路的机制研究。",
    text: "Worked around protein/cell-level observations of how drug 6J1 may affect liquid-liquid phase separation and autophagy pathways, including mechanism hypotheses and downstream validation planning.",
    impact: "支撑你对 biomedical mechanism 与实验验证的尊重，也解释为什么你关注高风险医学 AI 的可靠性。",
    meta: ["LLPS", "Autophagy", "GFP-LC3"],
    platform: "Drug Mech.",
    tags: ["Biomedical", "Mechanism", "Western Blot", "Cell Biology"],
    color: ["#98b45b", "#6f8839"],
  },
  {
    area: "Teaching",
    title: "CS201 Peer Tutor: Object-Oriented Programming & Data Structures",
    short: "Java OOP、数据结构、debugging 与同伴教学。",
    text: "Supported students in Java OOP and data structures topics including class design, inheritance/polymorphism, interfaces, exception handling, arrays, linked lists, stacks, queues, hash tables, trees, heaps, and sorting.",
    impact: "证明你能把抽象技术概念拆解成可执行的排错流程，也能在 academic community 里承担 peer-level support。",
    meta: ["Java", "Data Structures", "Debugging"],
    platform: "CS201 Tutor",
    tags: ["Teaching", "Java", "OOP", "Mentorship"],
    color: ["#70a7d8", "#4f7ead"],
  },
  {
    area: "Observability",
    title: "LiteLLM Usage Monitor for Xiao-X-Bao",
    short: "AI system observability、cost/token tracking 与 alert workflows。",
    text: "Implemented or contributed to a LiteLLM monitoring service that periodically syncs daily usage, requests, tokens, model/provider distribution, and API-key breakdowns into a local SQLite cache.",
    impact: "不是 health AI 本体，但证明 deployable AI systems 需要 observability、cost control、read-only APIs 和 dashboard snapshots。",
    meta: ["Go + React", "SQLite cache", "Alerts"],
    platform: "Monitor",
    tags: ["Observability", "Cost", "Tokens", "Dashboard"],
    color: ["#8b6bb1", "#674d8a"],
  },
  {
    area: "Uncertainty",
    title: "Uncertainty-Aware RL / Forecasting Evaluation System",
    short: "Robustness、calibration、reproducibility 方法论补强。",
    text: "Built a reproducible futures data and experimentation pipeline with engineered features, chronological train/calibration/test splits, organized artifact storage, and uncertainty calibration through conformal prediction intervals.",
    impact: "弱化 trading，突出 uncertainty、calibration、robustness 和 honest failure analysis，可连接 high-stakes AI evaluation。",
    meta: ["Conformal prediction", "Calibration", "Reproducibility"],
    platform: "Uncertainty",
    tags: ["Robustness", "Evaluation", "Forecasting", "RL"],
    color: ["#c98b5f", "#9b6340"],
  },
  {
    area: "Responsible AI",
    title: "Causality / Audit-Grade Evaluation-Layer AI Agent",
    short: "把 subjective narratives 拆成 evidence chains 与 uncertainty labels。",
    text: "Designed an audit-layer AI agent that evaluates existing human/AI sustainability narratives by decomposing subjective claims into verifiable statements, structured scorecards, evidence chains, conflict notes, and greenwashing risk flags.",
    impact: "作为 responsible AI 备用材料，保留 auditability、evidence chain、pass/fail/uncertain 判断，不让 finance/ESG 抢主线。",
    meta: ["Evidence chain", "Uncertainty labels", "Auditability"],
    platform: "Audit Agent",
    tags: ["Responsible AI", "Evidence", "ESG", "Uncertainty"],
    color: ["#7d90a6", "#566a7f"],
  },
  {
    area: "Product / Frontend",
    title: "Xiao-X-Bao Community / Hackathon Frontend Demo",
    short: "React/TypeScript 社区 demo 与协作入口。",
    text: "Built a React/TypeScript single-page demo site for the Xiao-X-Bao community, organizing task marketplace, collaboration paths, public-interest value, partner modules, authentication/dashboard/profile views, and reusable UI components.",
    impact: "用于补充 product interface、communication 和 frontend delivery，适合 AI product / HCI / health-tech implementation 语境。",
    meta: ["React", "TypeScript", "Community UI"],
    platform: "Community UI",
    tags: ["Frontend", "Product", "Health Tech", "Demo"],
    color: ["#f0c45c", "#b98d2e"],
  },
  {
    area: "Global Health",
    title: "Stroke & Multimorbidity / Global Health Research",
    short: "community-based co-management 与 real-world healthcare systems。",
    text: "Worked with a global health research direction around stroke, multimorbidity, community-based co-management, environmental enrichment, and primary care settings.",
    impact: "用于连接 health equity、implementation setting 和 real-world healthcare systems；正式投递前需要核对作者身份、投稿状态和具体贡献。",
    meta: ["Stroke", "Multimorbidity", "Primary care"],
    platform: "Global Health",
    tags: ["Public Health", "Research", "Implementation", "Equity"],
    color: ["#6fbf9f", "#438b72"],
  },
];

const desktopPositions = [
  [54, 10],
  [34, 28],
  [58, 25],
  [84, 34],
  [70, 48],
  [44, 42],
  [20, 52],
  [38, 66],
  [62, 62],
  [80, 74],
  [58, 88],
  [36, 80],
  [16, 90],
];

const mobilePositions = [
  [28, 3],
  [56, 8],
  [78, 14],
  [52, 21],
  [22, 28],
  [48, 36],
  [77, 44],
  [52, 52],
  [26, 60],
  [54, 68],
  [75, 76],
  [50, 84],
  [18, 92],
];

let active = 0;

const path = document.querySelector("#path");
const routeLine = document.querySelector("#routeLine");
const routeShadow = document.querySelector("#routeShadow");
const routeProgress = document.querySelector("#routeProgress");
const jumper = document.querySelector("#jumper");
const detailKicker = document.querySelector("#detailKicker");
const detailTitle = document.querySelector("#detailTitle");
const detailMeta = document.querySelector("#detailMeta");
const detailText = document.querySelector("#detailText");
const detailImpact = document.querySelector("#detailImpact");
const detailChips = document.querySelector("#detailChips");
const scoreNow = document.querySelector("#scoreNow");
const scoreTotal = document.querySelector("#scoreTotal");
const progressLabel = document.querySelector("#progressLabel");
const progressFill = document.querySelector("#progressFill");
const cards = document.querySelector("#cards");

scoreTotal.textContent = String(experiences.length).padStart(2, "0");

function currentPositions() {
  return window.matchMedia("(max-width: 640px)").matches ? mobilePositions : desktopPositions;
}

function buildRoutePath() {
  const positions = currentPositions();
  return positions
    .map(([x, y], index) => {
      if (index === 0) return `M ${x} ${y}`;
      const [prevX, prevY] = positions[index - 1];
      const cx = (prevX + x) / 2;
      const cy = Math.min(prevY, y) - 10;
      return `Q ${cx} ${cy} ${x} ${y}`;
    })
    .join(" ");
}

function renderPath() {
  experiences.forEach((item, index) => {
    const block = document.createElement("button");
    block.className = "block";
    block.type = "button";
    block.style.zIndex = String(10 + index);
    block.style.setProperty("--block", item.color[0]);
    block.style.setProperty("--block-dark", item.color[1]);
    block.innerHTML = `
      <div class="block-content">
        <div class="block-number">${String(index + 1).padStart(2, "0")}</div>
        <div class="block-title">${item.platform}</div>
        <div class="block-area">${item.area}</div>
      </div>
    `;
    block.addEventListener("click", () => setActive(index));
    path.appendChild(block);
  });
  applyLayout();
}

function renderCards() {
  experiences.forEach((item, index) => {
    const card = document.createElement("button");
    card.className = "mini-card";
    card.type = "button";
    card.innerHTML = `<b>${String(index + 1).padStart(2, "0")} · ${item.title}</b><p>${item.short}</p>`;
    card.addEventListener("click", () => {
      setActive(index);
      document.querySelector(".profile-panel").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    cards.appendChild(card);
  });
}

function setActive(index) {
  active = (index + experiences.length) % experiences.length;
  const item = experiences[active];
  const positions = currentPositions();
  const [x, y] = positions[active];
  const pathRect = path.getBoundingClientRect();
  const worldRect = document.querySelector(".world").getBoundingClientRect();

  jumper.style.left = `${pathRect.left - worldRect.left + (pathRect.width * x) / 100}px`;
  jumper.style.top = `${pathRect.top - worldRect.top + (pathRect.height * y) / 100 - 28}px`;

  document.querySelectorAll(".block").forEach((block, blockIndex) => {
    block.classList.toggle("active", blockIndex === active);
  });
  document.querySelectorAll(".mini-card").forEach((card, cardIndex) => {
    card.classList.toggle("active", cardIndex === active);
  });

  const progress = Math.round(((active + 1) / experiences.length) * 100);
  progressLabel.textContent = `${progress}%`;
  progressFill.style.width = `${progress}%`;
  const routeLength = routeProgress.getTotalLength();
  routeProgress.style.strokeDasharray = routeLength;
  routeProgress.style.strokeDashoffset = routeLength * (1 - (active + 1) / experiences.length);

  scoreNow.textContent = String(active + 1).padStart(2, "0");
  detailKicker.textContent = `${String(active + 1).padStart(2, "0")} · ${item.area}`;
  detailTitle.textContent = item.title;
  detailMeta.innerHTML = item.meta.map((meta) => `<span>${meta}</span>`).join("");
  detailText.textContent = item.text;
  detailImpact.textContent = item.impact;
  detailChips.innerHTML = item.tags.map((tag) => `<span class="chip">${tag}</span>`).join("");
}

function applyLayout() {
  const positions = currentPositions();
  const routePath = buildRoutePath();
  routeLine.setAttribute("d", routePath);
  routeShadow.setAttribute("d", routePath);
  routeProgress.setAttribute("d", routePath);

  document.querySelectorAll(".block").forEach((block, index) => {
    const [x, y] = positions[index];
    block.style.left = `${x}%`;
    block.style.top = `${y}%`;
  });

  setActive(active);
}

document.querySelector("#prevBtn").addEventListener("click", () => setActive(active - 1));
document.querySelector("#nextBtn").addEventListener("click", () => setActive(active + 1));

window.addEventListener("resize", applyLayout);
window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") setActive(active - 1);
  if (event.key === "ArrowRight") setActive(active + 1);
});

renderPath();
renderCards();
requestAnimationFrame(() => setActive(0));
