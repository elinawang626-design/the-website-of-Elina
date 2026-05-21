import { motion, useScroll, useTransform } from "framer-motion";
import Hls from "hls.js";
import { Github, Mail, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const heroVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4";
const missionVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4";
const solutionVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4";
const hlsUrl = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";
const githubUrl = "https://github.com/elinawang626-design";

const profileFacts = [
  "Yining Wang / 王懿宁",
  "Duke Kunshan University & Duke University · Class of 2028",
  "Computer Science / Applied Mathematics",
  "GPA 3.811",
  "TOEFL 111 / IELTS 7.5",
  "Software · AI/data · health technology · research · product-oriented technical work",
  "Core strengths: implementation, retrieval evaluation, biomedical context, communication",
  "Focus: trustworthy, deployable AI systems for health and biomedical information",
];

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
    short: "Product and workflow design for a local clinical-research AI workspace that keeps sources, variables, analysis, and deliverables traceable.",
    text: "Contributed to product strategy, workflow design, and evaluation framing for a local medical research AI workspace that brings papers, files, tabular data, code, reports, and agent chat into one evidence-traceable environment for clinical research teams.",
    impact:
      "Mapped reliability requirements into agent-flow designs and evaluation criteria covering tool selection, artifact verification, dataflow provenance, premature-finish prevention, latency, token cost, and failure-mode review. Demonstrates product judgment, systems thinking, and communication with non-engineer health users.",
    meta: ["Product strategy", "Agent-flow evaluation", "Provenance"],
    platform: "Atlaslab",
    tags: ["Agent Loop", "Desktop", "Planning", "Python"],
  },
  {
    area: "Trustworthy RAG",
    title: "ChatDKU Mini Agentic RAG System",
    short: "Bilingual institutional RAG system for DKU advising documents, with source-grounded answering and retrieval evaluation.",
    text: "Built a bilingual mini agentic RAG system over DKU advising documents, supporting PDF/DOCX ingestion, chunking with source metadata and page numbers, keyword search, vector search, internet fallback, and source-grounded answers in English and Chinese.",
    impact:
      "Implemented a DSPy layer for routing and answer generation, with local LLM serving through vLLM and reproducible evaluation across embedding models and local Qwen models. Compared keyword, vector, and hybrid retrieval; reported retrieval hit rate and answer keyword-hit results instead of only showing a demo.",
    meta: ["DSPy", "vLLM", "Retrieval evaluation"],
    platform: "ChatDKU RAG",
    tags: ["RAG", "DSPy", "Bilingual", "Evaluation"],
  },
  {
    area: "Medical Agent",
    title: "Xiao-X-Bao Medical Deep Search Agent",
    short: "Evidence-based medical research agent organized around a deterministic pipeline, research ledger, and citation verification.",
    text: "Contributed to an evidence-based medical deep research system built around a deterministic 10-stage pipeline: question classification, research planning, PubMed/knowledge search, deduplication, evidence extraction, rule-based citation verification, thematic synthesis, and Markdown report generation.",
    impact:
      "Framed reliability around a Research Ledger that records every stage, source ID, PMID/DOI, abstract quote, claim support status, token usage, and final report provenance. Shows research discipline, evidence handling, and awareness of high-stakes medical information risk.",
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
      "Supported automatic and manual redaction of sensitive fields including names, phone numbers, ID numbers, addresses, medical record numbers, birth dates, and emails, with Markdown export for downstream use. Connects frontend/backend implementation with practical privacy constraints in health-tech workflows.",
    meta: ["Privacy workflow", "PDF/image/text", "Batch export"],
    platform: "Privacy Tool",
    tags: ["Next.js", "Go Backend", "OCR", "Privacy"],
  },
  {
    area: "Memory / RAG",
    title: "memU Retrieval Layer Upgrade / Hybrid RAG Systems",
    short: "Retrieval-systems work around modular Top-K retrieval, dense retrieval, BM25, keyword retrieval, and reciprocal-rank fusion.",
    text: "Designed a retrieval systems direction around modular Top-K retrieval, dense retrieval, BM25, keyword retrieval, hybrid ranking, reciprocal-rank-fusion style fusion, and retrieval-quality evaluation.",
    impact:
      "Positioned retrieval quality as an evaluable systems problem using ranking abstractions, recall-oriented metrics, and trade-off analysis across sparse, dense, and hybrid retrieval. Useful evidence for AI, information retrieval, data, and backend-oriented technical work.",
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
      "Built wet-lab grounding across two iGEM cycles, spanning plasmid construction, fluorescence-protein validation, human-practices research, scientific communication, and team coordination. This is the biomedical grounding behind my interest in health AI, not a separate unrelated direction.",
    meta: ["Two-time Silver", "L-DOPA", "Wet-lab grounding"],
    platform: "iGEM",
    tags: ["Synthetic Biology", "HPLC", "Wet Lab", "Team Lead"],
  },
  {
    area: "Biomedical Research",
    title: "Drug Mechanism Research: LLPS and Autophagy",
    short: "Molecular mechanism research around 6J1, liquid-liquid phase separation, and autophagy pathways.",
    text: "Worked around protein/cell-level observations of how drug 6J1 may affect liquid-liquid phase separation and autophagy pathways, including mechanism hypotheses and downstream validation planning.",
    impact:
      "Connected biomedical mechanism research with experimental validation habits, including autophagy reporting, LLPS observation, and downstream Western blot validation planning. Shows that I understand biomedical data and claims come from complex experimental systems.",
    meta: ["LLPS", "Autophagy", "GFP-LC3"],
    platform: "Drug Mechanism",
    tags: ["Biomedical", "Mechanism", "Western Blot", "Cell Biology"],
  },
  {
    area: "Teaching",
    title: "CS201 Peer Tutor: Object-Oriented Programming & Data Structures",
    short: "Peer tutoring in Java OOP, data structures, debugging workflows, and assignment support.",
    text: "Supported students in Java OOP and data structures topics including class design, inheritance/polymorphism, interfaces, exception handling, arrays, linked lists, stacks, queues, hash tables, trees, heaps, and sorting.",
    impact:
      "Guided debugging by helping students reproduce issues, isolate minimal failing cases, reason about edge conditions, and verify fixes through regression-style checks. Demonstrates communication, mentorship, and the ability to explain technical concepts clearly.",
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
      "Exposed read-only monitoring APIs and a React dashboard snapshot for token usage, request count, RMB cost, active models, providers, and update time without querying LiteLLM on each frontend request. Shows deployment awareness: cost, observability, alerts, and operational reliability.",
    meta: ["Go + React", "SQLite cache", "Observability"],
    platform: "Usage Monitor",
    tags: ["Observability", "Cost", "Tokens", "Dashboard"],
  },
  {
    area: "Uncertainty",
    title: "Uncertainty-Aware RL / Forecasting Evaluation System",
    short: "Robustness, calibration, and reproducibility project using uncertainty-aware forecasting evaluation.",
    text: "Built a reproducible futures data and experimentation pipeline with engineered features, chronological train/calibration/test splits, organized artifact storage, and uncertainty calibration through conformal prediction intervals.",
    impact:
      "Evaluated uncertainty calibration with conformal prediction intervals and compared models under the same uncertainty framework, emphasizing cautious interpretation and honest failure analysis. The relevance is methodology: robustness, calibration, and reproducible evaluation.",
    meta: ["Conformal prediction", "Calibration", "Reproducibility"],
    platform: "Forecasting Eval",
    tags: ["Robustness", "Evaluation", "Forecasting", "RL"],
  },
  {
    area: "Responsible AI",
    title: "Causality / Audit-Grade Evaluation-Layer AI Agent",
    short: "Responsible AI evaluation project decomposing subjective narratives into verifiable claims and audit-friendly outputs.",
    text: "Designed an audit-layer AI agent that evaluates existing human/AI sustainability narratives by decomposing subjective claims into verifiable statements, structured scorecards, evidence chains, conflict notes, and greenwashing risk flags.",
    impact:
      "Introduced explicit pass/fail/uncertain labels for missing or conflicting evidence, making the output more interpretable and reviewable under weak-information conditions. The transferable skill is auditability and evidence evaluation, not the ESG topic itself.",
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
      "Used Tailwind, Framer Motion, Lucide icons, and route/state structure to deliver a polished local preview and collaboration entry point aligned with the public community website. Demonstrates product communication, frontend execution, and ability to make technical work understandable to users.",
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
      "Connects health equity, community-based intervention, implementation settings, and real-world healthcare systems. Author role, submission status, and exact contribution should be confirmed before this appears in a formal CV.",
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

const experienceColors = [
  "#60a5fa",
  "#34d399",
  "#f472b6",
  "#fbbf24",
  "#a78bfa",
  "#fb7185",
  "#22d3ee",
  "#f97316",
  "#4ade80",
  "#c084fc",
  "#38bdf8",
  "#facc15",
  "#2dd4bf",
];

const platformIcons = [
  {
    image: "/assets/icon-chatgpt.png",
    name: "Technical implementation",
    description: "Built RAG, frontend/backend, monitoring, and workflow tools with Python, TypeScript/React, Go, DSPy, vLLM, and retrieval pipelines.",
  },
  {
    image: "/assets/icon-perplexity.png",
    name: "Research and evaluation",
    description: "Designed evaluation criteria, citation checks, research ledgers, uncertainty calibration, and retrieval metrics instead of relying on demos alone.",
  },
  {
    image: "/assets/icon-google.png",
    name: "Communication and leadership",
    description: "Explained CS concepts as a peer tutor, coordinated iGEM work, and translated health-AI ideas into user-facing workflows and materials.",
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
  const links = [
    { label: "Home", href: "#home" },
    { label: "Profile", href: "#profile" },
    { label: "Experience Map", href: "#experience-map" },
    { label: "Experience Details", href: "#experience-details" },
  ];
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-8 py-4 md:px-28">
      <a href="#home" className="flex items-center gap-3 text-sm font-bold">
        <Logo />
        <span>Elina</span>
      </a>
      <div className="hidden items-center gap-3 text-sm md:flex">
        {links.map((link, index) => (
          <div className="flex items-center gap-3" key={link.label}>
            {index > 0 ? <span className="text-muted-foreground">•</span> : null}
            <a className="text-muted-foreground transition hover:text-foreground" href={link.href}>
              {link.label}
            </a>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Button aria-label="GitHub profile" className="rounded-full" size="icon" variant="glass" onClick={() => window.open(githubUrl, "_blank", "noopener,noreferrer")}>
          <Github className="h-4 w-4" />
        </Button>
        <Button aria-label="Email placeholder" className="rounded-full" size="icon" variant="glass">
          <Mail className="h-4 w-4" />
        </Button>
        <Button aria-label="Location placeholder" className="rounded-full" size="icon" variant="glass">
          <MapPin className="h-4 w-4" />
        </Button>
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
          <p className="text-sm text-muted-foreground">Yining Wang / 王懿宁 · DKU & Duke 2028</p>
        </div>
        <h1 className="text-5xl font-medium tracking-[-2px] md:text-7xl lg:text-8xl">
          Yining Wang (Elina)'s <span className="font-serif italic font-normal">Personal Website</span>
        </h1>
        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-[hsl(var(--hero-subtitle))]">
          I build and evaluate retrieval, agent, privacy, and monitoring workflows for biomedical and institutional information settings.
        </p>
        <motion.div className="liquid-glass mx-auto mt-10 flex max-w-lg items-center justify-between rounded-full p-2" {...fadeUp(0.15)}>
          <span className="px-5 text-left text-sm text-muted-foreground">CS / Applied Math · AI, data, health-tech, research</span>
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

function PlatformBlock({
  experience,
  index,
  active,
  color,
  onSelect,
}: {
  experience: Experience;
  index: number;
  active: boolean;
  color: string;
  onSelect: (index: number) => void;
}) {
  const [left, top] = platformPositions[index];
  return (
    <motion.button
      aria-label={`View ${experience.title}`}
      className={cn(
        "group absolute h-24 w-32 -translate-x-1/2 -translate-y-1/2 rounded-lg border text-left text-card-foreground shadow-[10px_12px_0_rgba(0,0,0,0.55),0_22px_40px_rgba(255,255,255,0.05)]",
        active ? "z-50 ring-2" : "z-40",
      )}
      onClick={() => onSelect(index)}
      style={{
        left,
        top,
        backgroundColor: active ? `${color}24` : "hsl(var(--card))",
        borderColor: active ? color : "rgba(255,255,255,0.18)",
        boxShadow: active ? `10px 12px 0 rgba(0,0,0,0.55), 0 0 34px ${color}66` : undefined,
        ["--experience-color" as string]: color,
      }}
      type="button"
      whileHover={{ y: -8, scale: 1.03 }}
      animate={active ? { y: -10, scale: 1.04 } : { y: 0, scale: 1 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 320, damping: 18, delay: index * 0.035 }}
    >
      <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-lg bg-[color:var(--experience-color)] opacity-35" />
      <div className="absolute inset-2 rounded-md border" style={{ borderColor: `${color}80` }} />
      <div className="relative flex h-full flex-col justify-between p-3">
        <span className="grid h-7 w-7 place-items-center rounded-full text-xs font-black text-background" style={{ backgroundColor: color }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <strong className="block text-sm leading-none">{experience.platform}</strong>
          <span className="mt-1 block text-[10px] font-bold text-muted-foreground">{experience.area}</span>
        </div>
      </div>
    </motion.button>
  );
}

function ExperienceMap() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeExperience = experiences[activeIndex];
  const [jumperLeft, jumperTop] = platformPositions[activeIndex];
  const activeColor = experienceColors[activeIndex];
  const detailPanelTop = `clamp(1.5rem, calc(${jumperTop} - 6rem), calc(100% - 24rem))`;
  const score = String(activeIndex + 1).padStart(2, "0");

  const hop = (direction: 1 | -1) => {
    setActiveIndex((current) => (current + direction + experiences.length) % experiences.length);
  };

  return (
    <section className="relative overflow-hidden border-t border-border/30 px-6 py-32 md:px-28 md:py-44" id="experience-map">
      <motion.div className="mx-auto max-w-4xl text-center" {...fadeUp(0)}>
        <p className="mb-4 text-xs font-bold uppercase tracking-[3px] text-muted-foreground">Experience Map</p>
        <h2 className="text-5xl font-medium tracking-[-1px] md:text-7xl lg:text-8xl">
          Evidence behind the <span className="font-serif italic font-normal">fit</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Select a card to see how each project proves a skill: implementation, research judgment, privacy awareness, communication, or execution.
        </p>
      </motion.div>
      <div className="mx-auto mt-20 flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-start">
        <div className="relative h-[1180px] min-w-0 flex-1 overflow-hidden rounded-3xl border border-border/30 bg-background">
          <div className="absolute inset-0 opacity-50">
            <div className="absolute left-1/4 top-20 h-64 w-64 rounded-full border border-sky-300/20" />
            <div className="absolute right-1/4 top-96 h-80 w-80 rounded-full border border-amber-300/20" />
            <div className="absolute bottom-20 left-1/3 h-72 w-72 rounded-full border border-emerald-300/20" />
          </div>
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="experience-path-gradient" x1="10" x2="90" y1="5" y2="95" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="28%" stopColor="#34d399" />
                <stop offset="55%" stopColor="#fbbf24" />
                <stop offset="78%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
            <path
              d="M54 8 Q44 14 35 18 T65 26 T80 38 T56 47 T30 39 T18 55 T42 66 T70 61 T84 74 T58 82 T35 76 T16 90"
              fill="none"
              stroke="url(#experience-path-gradient)"
              strokeDasharray="2 3"
              strokeLinecap="round"
              strokeWidth="1.45"
              opacity="0.72"
            />
          </svg>
          <motion.img
            alt=""
            className="absolute left-[54%] top-[8%] z-[60] h-20 -translate-x-1/2 -translate-y-full drop-shadow-[0_18px_18px_rgba(251,191,36,0.35)]"
            animate={{ left: jumperLeft, top: jumperTop }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            src="/assets/jumper.svg"
          />
          {experiences.map((experience, index) => (
            <PlatformBlock
              active={index === activeIndex}
              color={experienceColors[index]}
              experience={experience}
              index={index}
              key={experience.title}
              onSelect={setActiveIndex}
            />
          ))}
        </div>
        <div className="relative min-h-[22rem] w-full shrink-0 lg:h-[1180px] lg:w-[25rem]">
          <motion.aside
            className="w-full rounded-2xl border bg-background/90 p-5 shadow-2xl backdrop-blur-md lg:absolute lg:left-0 lg:right-0 lg:p-6"
            key={activeExperience.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, top: detailPanelTop }}
            style={{
              borderColor: activeColor,
              boxShadow: `0 22px 60px rgba(0,0,0,0.58), 0 0 38px ${activeColor}55`,
            }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[3px] text-muted-foreground">
                  Entry {score} / {experiences.length} · {activeExperience.area}
                </p>
                <h3 className="mt-2 text-xl font-semibold md:text-2xl">{activeExperience.title}</h3>
              </div>
              <div className="flex gap-2">
                <Button className="h-10 px-4" onClick={() => hop(-1)} type="button" variant="glass">
                  Previous
                </Button>
                <Button className="h-10 px-4" onClick={() => hop(1)} type="button">
                  Next
                </Button>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{activeExperience.short}</p>
            <a className="mt-4 inline-flex text-sm font-semibold text-foreground underline-offset-4 hover:underline" href={`#exp-${activeIndex + 1}`}>
              Read full entry
            </a>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function SignalSection() {
  return (
    <section className="px-6 py-32 text-center md:px-28 md:py-44" id="profile">
      <motion.h2 className="text-5xl font-medium tracking-[-1px] md:text-7xl lg:text-8xl" {...fadeUp(0)}>
        A coherent profile across <span className="font-serif italic font-normal">CS and health</span>
      </motion.h2>
      <motion.p className="mx-auto mt-8 mb-24 max-w-2xl text-lg leading-8 text-muted-foreground" {...fadeUp(0.1)}>
        I am a CS-oriented undergraduate with biomedical grounding. My projects connect retrieval systems, evidence verification, privacy workflows, observability, and biomedical context into one theme: making AI systems reliable enough for real information work.
      </motion.p>
      <motion.div className="mx-auto mb-20 grid max-w-4xl gap-3 text-left sm:grid-cols-2" {...fadeUp(0.16)}>
        {profileFacts.map((fact) => (
          <div className="liquid-glass rounded-xl px-4 py-3 text-sm text-muted-foreground" key={fact}>
            {fact}
          </div>
        ))}
      </motion.div>
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
        My background is interdisciplinary, but not random: CS gives me implementation tools, biomedical research gives me domain constraints, and student leadership/teaching gives me practice communicating technical work clearly.
      </motion.p>
    </section>
  );
}

function WordReveal({ text, highlight }: { text: string; highlight: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.35"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className="relative text-2xl font-medium tracking-[-1px] md:text-4xl lg:text-5xl">
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
          highlight={["implementation", "evaluation", "biomedical"]}
          text="My strongest story is implementation with evaluation and biomedical context: building tools that can be tested explained and used responsibly."
        />
        <div className="mt-10">
          <WordReveal
            highlight={["software", "AI", "health-tech"]}
            text="I work across software AI data health-tech research and product-oriented technical projects where execution and clear communication both matter."
          />
        </div>
      </div>
    </section>
  );
}

function ExperienceWiki() {
  return (
    <section className="border-t border-border/30 px-6 py-32 md:px-28 md:py-44" id="experience-details">
      <motion.div className="mx-auto max-w-4xl text-center" {...fadeUp(0)}>
        <p className="mb-4 text-xs font-bold uppercase tracking-[3px] text-muted-foreground">Experience Details</p>
        <h2 className="text-4xl font-medium tracking-[-1px] md:text-6xl">
          What I did, what it proves, and <span className="font-serif italic font-normal">where it fits</span>
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
              {[...experience.meta, ...experience.tags].map((tag, tagIndex) => (
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground" key={`${tag}-${tagIndex}`}>
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
          Explore the full <span className="font-serif italic font-normal">profile</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl leading-8 text-muted-foreground">
          A concise view of my work across software engineering, AI/data systems, health technology, research, and product-adjacent technical projects.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a className="inline-flex rounded-lg bg-foreground px-8 py-3.5 text-sm font-semibold text-background" href="#experience-details">
            Read Evidence
          </a>
          <a className="liquid-glass inline-flex rounded-lg px-8 py-3.5 text-sm font-semibold text-foreground" href="#experience-map">
            View Experience Map
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="flex flex-col justify-between gap-6 px-8 py-12 text-sm text-muted-foreground md:flex-row md:px-28">
      <p>© 2026 Elina. CS / Applied Math · AI systems, biomedical information, and deployable tools.</p>
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
      <ExperienceMap />
      <Mission />
      <ExperienceWiki />
      <CTA />
      <Footer />
    </main>
  );
}
