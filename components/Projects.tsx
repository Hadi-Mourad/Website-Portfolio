"use client";

import { useState } from "react";
import { ArrowUpRight, BarChart3, Plus, Sparkles } from "lucide-react";
import { projects, type ProjectType } from "@/lib/data";
import { Container, SectionHeading, Tag } from "./ui";

type Project = (typeof projects)[number];

const filters: { id: "all" | ProjectType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "statistical", label: "Statistical" },
];

function StatisticalPreview() {
  const bars = [8, 18, 34, 56, 78, 92, 78, 56, 34, 18, 8];
  return (
    <svg viewBox="0 0 220 110" className="h-full w-full" aria-hidden="true">
      {[25, 50, 75].map((y) => (
        <line key={y} x1="10" x2="210" y1={y} y2={y} className="stroke-slate-200" strokeDasharray="3 3" />
      ))}
      {bars.map((h, i) => (
        <rect
          key={i}
          x={14 + i * 18}
          y={100 - h}
          width="12"
          height={h}
          rx="2"
          className="fill-blue-600/15 transition-colors duration-300 group-hover:fill-blue-600/25"
        />
      ))}
      <path
        d="M10 98 C 60 98, 75 10, 110 8 S 160 98, 210 98"
        fill="none"
        className="stroke-blue-600"
        strokeWidth="2"
      />
      <line x1="10" x2="210" y1="100" y2="100" className="stroke-slate-300" />
    </svg>
  );
}

function seededPaths(count: number, steps: number, width: number) {
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647 - 0.5;
  };
  return Array.from({ length: count }, () => {
    let y = 55;
    const points = [`10,${y}`];
    for (let s = 1; s <= steps; s++) {
      y = Math.min(100, Math.max(10, y + rand() * 16));
      points.push(`${10 + (s * width) / steps},${y.toFixed(1)}`);
    }
    return points.join(" ");
  });
}

const cardPaths = seededPaths(14, 20, 200);
const featuredPaths = seededPaths(36, 40, 380);

function SimulationPreview({ featured = false }: { featured?: boolean }) {
  const width = featured ? 400 : 220;
  const end = width - 10;
  const paths = featured ? featuredPaths : cardPaths;
  const vector = featured ? ("non-scaling-stroke" as const) : undefined;
  return (
    <svg
      viewBox={`0 0 ${width} 110`}
      preserveAspectRatio={featured ? "none" : undefined}
      className="h-full w-full"
      aria-hidden="true"
    >
      {featured &&
        [30, 55, 80].map((y) => (
          <line key={y} x1="10" x2={end} y1={y} y2={y} className="stroke-slate-200" strokeDasharray="3 3" vectorEffect={vector} />
        ))}
      <path d={`M10 55 L${end} 12 L${end} 98 Z`} className="fill-blue-600/5" />
      {paths.map((points, i) => (
        <polyline
          key={i}
          points={points}
          fill="none"
          strokeWidth="1"
          vectorEffect={vector}
          className="stroke-blue-600/25 transition-colors duration-300 group-hover:stroke-blue-600/40"
        />
      ))}
      <line x1="10" x2={end} y1="55" y2="55" className="stroke-blue-600" strokeWidth="2" vectorEffect={vector} />
      <line x1="10" x2={end} y1="40" y2="40" className="stroke-emerald-500" strokeWidth="1.5" strokeDasharray="4 3" vectorEffect={vector} />
      {featured && (
        <line x1="10" x2={end} y1="88" y2="88" className="stroke-red-500/70" strokeWidth="1.5" strokeDasharray="2 3" vectorEffect={vector} />
      )}
      <line x1="10" x2="10" y1="8" y2="102" className="stroke-slate-300" vectorEffect={vector} />
      <line x1="10" x2={end} y1="102" y2="102" className="stroke-slate-300" vectorEffect={vector} />
    </svg>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="group mb-6 overflow-hidden rounded-3xl border border-blue-200 bg-white shadow-[0_12px_40px_rgb(37,99,235,0.08)] ring-1 ring-blue-100 transition-shadow duration-300 hover:shadow-[0_20px_60px_rgb(37,99,235,0.14)]">
      <div className="grid lg:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col gap-6 border-b border-blue-100 bg-gradient-to-br from-blue-50 via-slate-50 to-white p-6 sm:p-8 lg:border-r lg:border-b-0">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
              <Sparkles className="h-3.5 w-3.5" />
              Featured project
            </span>
            <span className="text-xs font-medium uppercase tracking-widest text-slate-400">Live app</span>
          </div>

          <div className="flex min-h-52 flex-1 flex-col rounded-2xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-700">Surplus under rate shocks</p>
              <p className="font-mono text-[11px] text-slate-400">n = 2,500</p>
            </div>
            <div className="min-h-0 flex-1">
              <SimulationPreview featured />
            </div>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500">
              <li className="inline-flex items-center gap-1.5">
                <span className="h-0.5 w-4 bg-blue-600" />
                Mean path
              </li>
              <li className="inline-flex items-center gap-1.5">
                <span className="h-0 w-4 border-t-2 border-dashed border-emerald-500" />
                Immunized surplus
              </li>
              <li className="inline-flex items-center gap-1.5">
                <span className="h-0 w-4 border-t-2 border-dotted border-red-500" />
                95% VaR
              </li>
            </ul>
          </div>

          {project.metrics && (
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-4">
              {project.metrics.map((m) => (
                <div key={m.label} className="bg-white px-3 py-3">
                  <dt className="text-[11px] font-medium uppercase tracking-wider text-slate-500">{m.label}</dt>
                  <dd className="mt-1 text-lg font-semibold tracking-tight text-slate-900">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div className="flex flex-col p-6 sm:p-8 lg:p-10">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-blue-600">
            <BarChart3 className="h-3.5 w-3.5" />
            {project.category}
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{project.title}</h3>
          <p className="mt-4 flex-1 text-base leading-relaxed text-slate-600">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          {project.link && (
            <a
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 self-start rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-700"
            >
              {project.link.label}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_12px_40px_rgb(15,23,42,0.08)]">
      <div className="h-44 border-b border-slate-100 bg-slate-50 p-5">
        {project.preview === "simulation" ? <SimulationPreview /> : <StatisticalPreview />}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-blue-600">
          <BarChart3 className="h-3.5 w-3.5" />
          {project.category}
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-slate-900">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        {project.link && (
          <a
            href={project.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
          >
            {project.link.label}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<"all" | ProjectType>("all");
  const visible = projects.filter((p) => filter === "all" || p.type === filter);
  const featured = visible.filter((p) => p.featured);
  const rest = visible.filter((p) => !p.featured);

  return (
    <section id="projects" className="border-t border-slate-200 bg-white py-24 sm:py-32">
      <Container>
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Projects & Coursework"
            title="Selected work"
            description="Actuarial modelling, financial mathematics, and quantitative study."
            className="mb-0"
          />
          <div
            role="tablist"
            aria-label="Filter projects"
            className="inline-flex shrink-0 self-start rounded-full border border-slate-200 bg-white p-1 sm:self-auto"
          >
            {filters.map((f) => {
              const count = f.id === "all" ? projects.length : projects.filter((p) => p.type === f.id).length;
              return (
                <button
                  key={f.id}
                  role="tab"
                  type="button"
                  aria-selected={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    filter === f.id ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {f.label}
                  <span className="ml-1.5 text-xs text-slate-400">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {featured.map((project) => (
          <FeaturedProject key={project.title} project={project} />
        ))}

        <div className="grid gap-6 sm:grid-cols-2">
          {rest.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}

          <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 p-6 text-center">
            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Plus className="h-5 w-5" />
            </span>
            <p className="text-sm font-medium text-slate-700">More projects in progress</p>
            <p className="mt-1 text-sm text-slate-500">New actuarial and statistical work coming soon.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
