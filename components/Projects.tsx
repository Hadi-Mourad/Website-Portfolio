"use client";

import { useState } from "react";
import { BarChart3, Palette, Plus } from "lucide-react";
import { projects, type ProjectType } from "@/lib/data";
import { Container, SectionHeading, Tag } from "./ui";

const filters: { id: "all" | ProjectType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "statistical", label: "Statistical" },
  { id: "design", label: "Design" },
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

function DesignPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-slate-200 bg-white" aria-hidden="true">
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-blue-100 to-transparent" />
      <div className="relative flex h-full flex-col items-center justify-center gap-3 p-4">
        <div className="h-1.5 w-20 rounded-full bg-slate-300" />
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="h-5 w-5 rounded-full border-2 border-slate-300 transition-colors duration-300 group-hover:border-blue-400" />
              <div className="h-0.5 w-5 rounded-full bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<"all" | ProjectType>("all");
  const visible = projects.filter((p) => filter === "all" || p.type === filter);

  return (
    <section id="projects" className="border-t border-slate-200 bg-white py-24 sm:py-32">
      <Container>
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Projects & Coursework"
            title="Selected work"
            description="Quantitative study and precision design production."
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => {
            const Icon = project.type === "statistical" ? BarChart3 : Palette;
            return (
              <article
                key={project.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_12px_40px_rgb(15,23,42,0.08)]"
              >
                <div className="h-44 border-b border-slate-100 bg-slate-50 p-5">
                  {project.type === "statistical" ? <StatisticalPreview /> : <DesignPreview />}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-blue-600">
                    <Icon className="h-3.5 w-3.5" />
                    {project.category}
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-slate-900">{project.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}

          <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 p-6 text-center">
            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Plus className="h-5 w-5" />
            </span>
            <p className="text-sm font-medium text-slate-700">More projects in progress</p>
            <p className="mt-1 text-sm text-slate-500">New statistical and design work coming soon.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
