import { motion, useScroll, useTransform } from "framer-motion";
import Hls from "hls.js";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const heroVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4";
const missionVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4";
const solutionVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4";
const hlsUrl = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, delay, ease: [0, 0, 0.2, 1] as const },
});

type Experience = {
  area: string;
  title: string;
  short: string;
  text: string;
  impact: string;
  meta: string[];
  platform: string;
  tags: string[];
};

const experiences: Experience[] = [
  {
    area: "Clinical AI",
    title: "Atlaslab IDE / Verifiable AI Agents for Clinical Research",
    short: "Clinical AI workspace integrating files, literature workflows, code, reports, and agent chat into an evidence-traceable environment.",
    text: "Contributed to framing a local medical research AI workspace that integrates files, literature workflows, tabular data, code, notebooks, reports, and agent chat into one evidence-traceable environment for clinical research teams.",
    impact:
      "Mapped reliability requirements into agent-flow designs and evaluation criteria covering tool selection, artifact verification, dataflow provenance, premature-finish prevention, latency, token cost, and failure-mode review.",
    meta: ["Agent-flow evaluation", "Provenance", "Clinical workflow"],
    platform: "Atlaslab",
    tags: ["Agent Loop", "Desktop", "Planning", "Python"],
  },
  {
    area: "Trustworthy RAG",
    title: "ChatDKU Mini Agentic RAG System",
    short: "Bilingual institutional RAG system with ingestion, retrieval, routing, source-grounded answering, and evaluation.",
    text: "Built a bilingual mini agentic RAG system over DKU advising documents, supporting PDF/DOCX ingestion, chunking with source metadata and page numbers, keyword search, vector search, internet fallback, and source-grounded answers in English and Chinese.",
    impact:
      "Implemented a DSPy layer for routing and answer generation, with local LLM serving through vLLM and reproducible evaluation across embedding models and local Qwen models.",
    meta: ["PDF/DOCX", "Vector search", "Local LLM"],
    platform: "ChatDKU RAG",
    tags: ["RAG", "DSPy", "Bilingual", "Evaluation"],
  },
  {
    area: "Medical Agent",
    title: "Xiao-X-Bao Medical Deep Search Agent",
    short: "Evidence-based medical research agent organized around a deterministic pipeline, research ledger, and citation verification.",
    text: "Contributed to an evidence-based medical deep research system built around a deterministic 10-stage pipeline: question classification, research planning, PubMed/knowledge search, deduplication, evidence extraction, rule-based citation verification, thematic synthesis, and Markdown report generation.",
    impact:
      "Framed reliability around a Research Ledger that records every stage, source ID, PMID/DOI, abstract quote, claim support status, token usage, and final report provenance.",
    meta: ["10-stage pipeline", "Citation verifier", "Research ledger"],
    platform: "Medical Search",
    tags: ["Medical AI", "PubMed", "Evidence", "Ledger"],
  },
  {
    area: "Health Privacy",
    title: "Medical Desensitization Workspace",
    short: "Privacy-preserving health AI preprocessing workspace for text, PDF, image, and batch medical-record inputs.",
    text: "Built or contributed to a medical-record desensitization workspace that processes pasted text, PDFs, images, and batch uploads before sending safe text into an AI chat workflow.",
    impact:
      "Supported automatic and manual redaction of sensitive fields including names, phone numbers, ID numbers, addresses, medical record numbers, birth dates, and emails, with Markdown export for downstream use.",
    meta: ["PDF/image/text", "Batch export", "Manual rules"],
    platform: "Desensitize",
    tags: ["Next.js", "Go Backend", "OCR", "Privacy"],
  },
  {
    area: "Memory / RAG",
    title: "memU Retrieval Layer Upgrade / Hybrid RAG Systems",
    short: "Hybrid retrieval direction for modular Top-K retrieval, dense retrieval, BM25, keyword retrieval, and reciprocal-rank-fusion.",
    text: "Designed a retrieval systems direction around modular Top-K retrieval, dense retrieval, BM25, keyword retrieval, hybrid ranking, reciprocal-rank-fusion style fusion, and retrieval-quality evaluation.",
    impact:
      "Positioned retrieval quality as an evaluable systems problem using ranking abstractions, recall-oriented metrics, and trade-off analysis across sparse, dense, and hybrid retrieval.",
    meta: ["Hybrid retrieval", "RRF", "Recall@K / MRR"],
    platform: "memU RAG",
    tags: ["Hybrid RAG", "RRF", "Recall@K", "MRR"],
  },
  {
    area: "Synthetic Biology",
    title: "iGEM Competition — Two-time Silver Medalist",
    short: "Synthetic biology and wet-lab grounding through L-DOPA gut simulation and two iGEM competition cycles.",
    text: "Investigated L-DOPA production and stability in simulated gut conditions using engineered yeast, anaerobic culture setup, media optimization, fluorescence/HPLC-based detection, and microbial co-culture constraints.",
    impact:
      "Built wet-lab grounding across two iGEM cycles, spanning plasmid construction, fluorescence-protein validation, human-practices research, scientific communication, and team coordination.",
    meta: ["Two-time Silver", "L-DOPA", "Gut simulation"],
    platform: "iGEM",
    tags: ["Synthetic Biology", "HPLC", "Wet Lab", "Team Lead"],
  },
  {
    area: "Biomedical Research",
    title: "Drug Mechanism Research: LLPS and Autophagy",
    short: "Molecular mechanism research around 6J1, liquid-liquid phase separation, and autophagy pathways.",
    text: "Worked around protein/cell-level observations of how drug 6J1 may affect liquid-liquid phase separation and autophagy pathways, including mechanism hypotheses and downstream validation planning.",
    impact:
      "Connected biomedical mechanism research with experimental validation habits, including autophagy reporting, LLPS observation, and downstream Western blot validation planning.",
    meta: ["LLPS", "Autophagy", "GFP-LC3"],
    platform: "Drug Mech.",
    tags: ["Biomedical", "Mechanism", "Western Blot", "Cell Biology"],
  },
  {
    area: "Teaching",
    title: "CS201 Peer Tutor: Object-Oriented Programming & Data Structures",
    short: "Peer tutoring in Java OOP, data structures, debugging workflows, and assignment support.",
    text: "Supported students in Java OOP and data structures topics including class design, inheritance/polymorphism, interfaces, exception handling, arrays, linked lists, stacks, queues, hash tables, trees, heaps, and sorting.",
    impact:
      "Guided debugging by helping students reproduce issues, isolate minimal failing cases, reason about edge conditions, and verify fixes through regression-style checks.",
    meta: ["Java", "Data Structures", "Debugging"],
    platform: "CS201 Tutor",
    tags: ["Teaching", "Java", "OOP", "Mentorship"],
  },
  {
    area: "Observability",
    title: "LiteLLM Usage Monitor for Xiao-X-Bao",
    short: "AI system observability service for usage sync, cost/token monitoring, dashboard snapshots, and alert workflows.",
    text: "Implemented or contributed to a LiteLLM monitoring service that periodically syncs daily usage, requests, tokens, model/provider distribution, and API-key breakdowns into a local SQLite cache.",
    impact:
      "Exposed read-only monitoring APIs and a React dashboard snapshot for token usage, request count, RMB cost, active models, providers, and update time without querying LiteLLM on each frontend request.",
    meta: ["Go + React", "SQLite cache", "Alerts"],
    platform: "Monitor",
    tags: ["Observability", "Cost", "Tokens", "Dashboard"],
  },
  {
    area: "Uncertainty",
    title: "Uncertainty-Aware RL / Forecasting Evaluation System",
    short: "Robustness, calibration, and reproducibility project using uncertainty-aware forecasting evaluation.",
    text: "Built a reproducible futures data and experimentation pipeline with engineered features, chronological train/calibration/test splits, organized artifact storage, and uncertainty calibration through conformal prediction intervals.",
    impact:
      "Evaluated uncertainty calibration with conformal prediction intervals and compared models under the same uncertainty framework, emphasizing cautious interpretation and honest failure analysis.",
    meta: ["Conformal prediction", "Calibration", "Reproducibility"],
    platform: "Uncertainty",
    tags: ["Robustness", "Evaluation", "Forecasting", "RL"],
  },
  {
    area: "Responsible AI",
    title: "Causality / Audit-Grade Evaluation-Layer AI Agent",
    short: "Responsible AI evaluation project decomposing subjective narratives into verifiable claims and audit-friendly outputs.",
    text: "Designed an audit-layer AI agent that evaluates existing human/AI sustainability narratives by decomposing subjective claims into verifiable statements, structured scorecards, evidence chains, conflict notes, and greenwashing risk flags.",
    impact:
      "Introduced explicit pass/fail/uncertain labels for missing or conflicting evidence, making the output more interpretable and reviewable under weak-information conditions.",
    meta: ["Evidence chain", "Uncertainty labels", "Auditability"],
    platform: "Audit Agent",
    tags: ["Responsible AI", "Evidence", "ESG", "Uncertainty"],
  },
  {
    area: "Product / Frontend",
    title: "Xiao-X-Bao Community / Hackathon Frontend Demo",
    short: "React/TypeScript product interface supporting a community health-AI collaboration demo.",
    text: "Built a React/TypeScript single-page demo site for the Xiao-X-Bao community, organizing task marketplace, collaboration paths, public-interest value, partner modules, authentication/dashboard/profile views, and reusable UI components.",
    impact:
      "Used Tailwind, Framer Motion, Lucide icons, and route/state structure to deliver a polished local preview and collaboration entry point aligned with the public community website.",
    meta: ["React", "TypeScript", "Community UI"],
    platform: "Community UI",
    tags: ["Frontend", "Product", "Health Tech", "Demo"],
  },
  {
    area: "Global Health",
    title: "Stroke & Multimorbidity / Global Health Research",
    short: "Global health research direction around stroke, multimorbidity, community care, and implementation settings.",
    text: "Worked with a global health research direction around stroke, multimorbidity, community-based co-management, environmental enrichment, and primary care settings.",
    impact:
      "Connects health equity, community-based intervention, implementation settings, and real-world healthcare systems; author role, submission status, and contribution scope should be confirmed before formal CV use.",
    meta: ["Stroke", "Multimorbidity", "Primary care"],
    platform: "Global Health",
    tags: ["Public Health", "Research", "Implementation", "Equity"],
  },
];

const platformPositions = [
  ["54%", "8%"],
  ["35%", "18%"],
  ["65%", "26%"],
  ["80%", "38%"],
  ["56%", "47%"],
  ["30%", "39%"],
  ["18%", "55%"],
  ["42%", "66%"],
  ["70%", "61%"],
  ["84%", "74%"],
  ["58%", "82%"],
  ["35%", "76%"],
  ["16%", "90%"],
];

const platformIcons = [
  {
    image: "/assets/icon-chatgpt.png",
    name: "Trustworthy RAG",
    description: "Retrieval, grounding, citation correctness, and long-tail query handling.",
  },
  {
    image: "/assets/icon-perplexity.png",
    name: "Evidence Workflow",
    description: "Research ledgers, auditability, provenance chains, and verified outputs.",
  },
  {
    image: "/assets/icon-google.png",
    name: "Deployable Systems",
    description: "Privacy, observability, user workflows, and real-world adoption constraints.",
  },
];

function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("grid h-7 w-7 place-items-center rounded-full border-2 border-foreground/60", className)}>
      <div className="h-3 w-3 rounded-full border border-foreground/60" />
    </div>
  );
}

function Navbar() {
  const links = ["Home", "How It Works", "Philosophy", "Use Cases"];
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-8 py-4 md:px-28">
      <a href="#home" className="flex items-center gap-3 text-sm font-bold">
        <Logo />
        <span>Elina</span>
      </a>
      <div className="hidden items-center gap-3 text-sm md:flex">
        {links.map((link, index) => (
          <div className="flex items-center gap-3" key={link}>
            {index > 0 ? <span className="text-muted-foreground">•</span> : null}
            <a className="text-muted-foreground transition hover:text-foreground" href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}>
              {link}
            </a>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        {[Instagram, Linkedin, Twitter].map((Icon, index) => (
          <Button aria-label={`social-${index}`} className="rounded-full" key={index} size="icon" variant="glass">
            <Icon className="h-4 w-4" />
          </Button>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 md:px-28 md:pt-32" id="home">
      <video
        autoPlay
        className="absolute inset-0 h-full w-full object-cover brightness-110 saturate-125"
        loop
        muted
        playsInline
        src={heroVideo}
      />
      <div className="absolute inset-0 bg-background/35" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent" />
      <motion.div className="relative z-10 mx-auto max-w-5xl text-center" {...fadeUp(0)}>
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className="-space-x-2">
            {[1, 2, 3].map((item) => (
              <img
                alt=""
                className="inline-block h-8 w-8 rounded-full border-2 border-background"
                key={item}
                src={`/assets/avatar-${item}.png`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">13 experiences aligned around one application narrative</p>
        </div>
        <h1 className="text-5xl font-medium tracking-[-2px] md:text-7xl lg:text-8xl">
          Elina <span className="font-serif italic font-normal">跳一跳</span>
        </h1>
        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-[hsl(var(--hero-subtitle))]">
          Trustworthy, verifiable, deployable AI systems for health and biomedical information.
        </p>
        <motion.div className="liquid-glass mx-auto mt-10 flex max-w-lg items-center justify-between rounded-full p-2" {...fadeUp(0.15)}>
          <span className="px-5 text-left text-sm text-muted-foreground">CS-oriented student · Health AI · Evaluation-driven systems</span>
          <motion.a
            className="rounded-full bg-foreground px-8 py-3 text-sm font-bold text-background"
            href="#profile"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            VIEW PROFILE
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function PlatformBlock({ experience, index }: { experience: Experience; index: number }) {
  const [left, top] = platformPositions[index];
  return (
    <motion.a
      className="group absolute h-24 w-32 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-card text-card-foreground shadow-[10px_12px_0_#1f1f1f,0_22px_40px_rgba(255,255,255,0.05)]"
      href={`#exp-${index + 1}`}
      style={{ left, top }}
      whileHover={{ y: -8 }}
      {...fadeUp(index * 0.035)}
    >
      <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-lg bg-secondary" />
      <div className="absolute inset-2 rounded-md border border-foreground/30" />
      <div className="relative flex h-full flex-col justify-between p-3">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-foreground text-xs font-black text-background">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <strong className="block text-sm leading-none">{experience.platform}</strong>
          <span className="mt-1 block text-[10px] font-bold text-muted-foreground">{experience.area}</span>
        </div>
      </div>
    </motion.a>
  );
}

function JumpPath() {
  return (
    <section className="relative overflow-hidden border-t border-border/30 px-6 py-32 md:px-28 md:py-44" id="how-it-works">
      <motion.div className="mx-auto max-w-4xl text-center" {...fadeUp(0)}>
        <p className="mb-4 text-xs font-bold uppercase tracking-[3px] text-muted-foreground">Experience Map</p>
        <h2 className="text-5xl font-medium tracking-[-1px] md:text-7xl lg:text-8xl">
          跳过每一块 <span className="font-serif italic font-normal">evidence</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          The path keeps the Jump Jump idea, but the content is your resume narrative: each platform is one verifiable experience.
        </p>
      </motion.div>
      <div className="relative mx-auto mt-20 h-[1180px] max-w-5xl overflow-hidden rounded-3xl border border-border/30 bg-background">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute left-1/4 top-20 h-64 w-64 rounded-full border border-foreground/10" />
          <div className="absolute right-1/4 top-96 h-80 w-80 rounded-full border border-foreground/10" />
          <div className="absolute bottom-20 left-1/3 h-72 w-72 rounded-full border border-foreground/10" />
        </div>
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path
            d="M54 8 Q44 14 35 18 T65 26 T80 38 T56 47 T30 39 T18 55 T42 66 T70 61 T84 74 T58 82 T35 76 T16 90"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeDasharray="1 3"
            strokeLinecap="round"
            strokeWidth="1.2"
          />
        </svg>
        <img
          alt=""
          className="absolute left-[54%] top-[8%] z-20 h-16 -translate-x-1/2 -translate-y-full drop-shadow-[0_16px_12px_rgba(255,255,255,0.16)]"
          src="/assets/jumper.svg"
        />
        {experiences.map((experience, index) => (
          <PlatformBlock experience={experience} index={index} key={experience.title} />
        ))}
      </div>
    </section>
  );
}

function SignalSection() {
  return (
    <section className="px-6 py-32 text-center md:px-28 md:py-44" id="philosophy">
      <motion.h2 className="text-5xl font-medium tracking-[-1px] md:text-7xl lg:text-8xl" {...fadeUp(0)}>
        Trust has changed. <span className="font-serif italic font-normal">Have you?</span>
      </motion.h2>
      <motion.p className="mx-auto mt-8 mb-24 max-w-2xl text-lg leading-8 text-muted-foreground" {...fadeUp(0.1)}>
        I am a CS-oriented student building trustworthy, deployable, and evaluation-driven AI systems, with a particular interest in health and biomedical information settings.
      </motion.p>
      <div className="mx-auto mb-20 grid max-w-5xl gap-12 md:grid-cols-3 md:gap-8">
        {platformIcons.map((item, index) => (
          <motion.div className="text-center" key={item.name} {...fadeUp(index * 0.1)}>
            <img alt="" className="mx-auto h-[200px] w-[200px] object-contain" src={item.image} />
            <h3 className="mt-6 text-base font-semibold">{item.name}</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted-foreground">{item.description}</p>
          </motion.div>
        ))}
      </div>
      <motion.p className="text-center text-sm text-muted-foreground" {...fadeUp(0.2)}>
        Every platform on the path is part of the same question: how can AI become reliable enough for real health-related contexts?
      </motion.p>
    </section>
  );
}

function WordReveal({ text, highlight }: { text: string; highlight: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.35"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className="text-2xl font-medium tracking-[-1px] md:text-4xl lg:text-5xl">
      {words.map((word, index) => (
        <RevealWord
          highlight={highlight}
          index={index}
          key={`${word}-${index}`}
          progress={scrollYProgress}
          total={words.length}
          word={word}
        />
      ))}
    </p>
  );
}

function RevealWord({
  word,
  index,
  total,
  highlight,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  highlight: string[];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = Math.min(start + 0.18, 1);
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const clean = word.replace(/[—,.]/g, "");

  return (
    <motion.span
      className={cn("mr-2 inline-block", highlight.includes(clean) ? "text-foreground" : "text-[hsl(var(--hero-subtitle))]")}
      style={{ opacity }}
    >
      {word}
    </motion.span>
  );
}

function Mission() {
  return (
    <section className="px-6 pt-0 pb-32 md:px-28 md:pb-44">
      <motion.video
        autoPlay
        className="mx-auto h-[520px] w-[520px] max-w-full rounded-full object-cover brightness-110 saturate-125 md:h-[800px] md:w-[800px]"
        loop
        muted
        playsInline
        src={missionVideo}
        {...fadeUp(0)}
      />
      <div className="mx-auto mt-16 max-w-5xl">
        <WordReveal
          highlight={["retrieval", "grounding", "uncertainty"]}
          text="My profile connects retrieval grounding uncertainty privacy observability and biomedical grounding into one application narrative."
        />
        <div className="mt-10">
          <WordReveal
            highlight={["trustworthy", "verifiable", "deployable"]}
            text="A platform-like profile for trustworthy verifiable deployable and evaluation-driven AI systems in health and biomedical information settings."
          />
        </div>
      </div>
    </section>
  );
}

function ExperienceWiki() {
  return (
    <section className="border-t border-border/30 px-6 py-32 md:px-28 md:py-44" id="use-cases">
      <motion.div className="mx-auto max-w-4xl text-center" {...fadeUp(0)}>
        <p className="mb-4 text-xs font-bold uppercase tracking-[3px] text-muted-foreground">Profile Wiki</p>
        <h2 className="text-4xl font-medium tracking-[-1px] md:text-6xl">
          The platform for <span className="font-serif italic font-normal">verifiable</span> experience
        </h2>
      </motion.div>
      <motion.video
        autoPlay
        className="mx-auto mt-16 aspect-[3/1] w-full max-w-6xl rounded-2xl object-cover brightness-110 saturate-125"
        loop
        muted
        playsInline
        src={solutionVideo}
        {...fadeUp(0.1)}
      />
      <div className="mx-auto mt-16 grid max-w-6xl gap-5">
        {experiences.map((experience, index) => (
          <motion.article className="liquid-glass rounded-2xl p-6 md:p-8" id={`exp-${index + 1}`} key={experience.title} {...fadeUp(0.04 * index)}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[3px] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")} · {experience.area}
                </p>
                <h3 className="mt-3 text-2xl font-semibold md:text-4xl">{experience.title}</h3>
              </div>
              <span className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground">{experience.platform}</span>
            </div>
            <p className="mt-6 max-w-4xl text-base leading-8 text-muted-foreground">{experience.text}</p>
            <p className="mt-5 max-w-4xl border-l border-foreground/40 pl-5 text-base leading-8 text-foreground/90">{experience.impact}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[...experience.meta, ...experience.tags].map((tag) => (
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function HlsBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
      return () => hls.destroy();
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = hlsUrl;
    }
  }, []);

  return <video ref={videoRef} autoPlay className="absolute inset-0 z-0 h-full w-full object-cover brightness-110 saturate-125" loop muted playsInline />;
}

function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-border/30 px-6 py-32 text-center md:px-28 md:py-44">
      <HlsBackground />
      <div className="absolute inset-0 z-[1] bg-background/45" />
      <motion.div className="relative z-10 mx-auto max-w-3xl" {...fadeUp(0)}>
        <Logo className="mx-auto h-10 w-10" />
        <h2 className="mt-8 text-4xl font-medium md:text-6xl">
          Continue the <span className="font-serif italic font-normal">journey</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl leading-8 text-muted-foreground">
          Trustworthy, verifiable, deployable AI systems for health and biomedical information.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a className="inline-flex rounded-lg bg-foreground px-8 py-3.5 text-sm font-semibold text-background" href="#use-cases">
            Read Experiences
          </a>
          <a className="liquid-glass inline-flex rounded-lg px-8 py-3.5 text-sm font-semibold text-foreground" href="#how-it-works">
            Jump Path
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="flex flex-col justify-between gap-6 px-8 py-12 text-sm text-muted-foreground md:flex-row md:px-28">
      <p>© 2026 Elina. All rights reserved.</p>
      <div className="flex gap-6">
        {["Privacy", "Terms", "Contact"].map((item) => (
          <a className="transition hover:text-foreground" href="#" key={item}>
            {item}
          </a>
        ))}
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <SignalSection />
      <JumpPath />
      <Mission />
      <ExperienceWiki />
      <CTA />
      <Footer />
    </main>
  );
}
