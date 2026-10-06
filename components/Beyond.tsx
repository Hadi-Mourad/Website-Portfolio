"use client";

import { Crosshair, Dumbbell, Grid3x3, SquareTerminal, Trophy } from "lucide-react";
import { interests } from "@/lib/data";
import { Container, SectionHeading } from "./ui";
import { useViewMode } from "./ViewMode";

const icons = {
  dumbbell: Dumbbell,
  crosshair: Crosshair,
  grid: Grid3x3,
  trophy: Trophy,
};

export default function Beyond() {
  const { setMode } = useViewMode();

  return (
    <section id="beyond" className="border-t border-slate-200 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Beyond"
          title="Discipline & logic, off the clock"
          description="The things I do for fun share a common thread: consistency, strategy, and thinking a few steps ahead."
        />

        <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {interests.map((item) => {
            const Icon = icons[item.icon];
            return (
              <div key={item.title} className="flex gap-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-slate-600">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col items-start gap-5 rounded-2xl bg-slate-900 p-6 text-slate-300 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="font-mono text-sm text-emerald-400">$ whoami --verbose</p>
            <p className="mt-2 text-base text-slate-200">
              Prefer a command line? Explore this portfolio as a terminal.
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Rumour has it there&apos;s also a puzzle hidden somewhere on this site.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setMode("terminal")}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
          >
            <SquareTerminal className="h-4 w-4" />
            Open terminal
          </button>
        </div>
      </Container>
    </section>
  );
}
