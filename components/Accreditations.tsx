import { Award, CalendarClock, CircleDot, Flag, GraduationCap } from "lucide-react";
import { roadmap, type RoadmapStatus } from "@/lib/data";
import { Container, SectionHeading } from "./ui";

const statusStyles: Record<
  RoadmapStatus,
  { label: string; badge: string; dot: string; icon: typeof Award }
> = {
  "in-progress": {
    label: "In progress",
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
    dot: "bg-blue-600 text-white ring-blue-100",
    icon: GraduationCap,
  },
  upcoming: {
    label: "Enrolled",
    badge: "border-blue-200 bg-blue-50 text-blue-700",
    dot: "bg-blue-600 text-white ring-blue-100",
    icon: CalendarClock,
  },
  planned: {
    label: "Planned",
    badge: "border-slate-200 bg-slate-50 text-slate-600",
    dot: "bg-white text-slate-400 ring-slate-100 border border-slate-300",
    icon: CircleDot,
  },
  goal: {
    label: "Goal",
    badge: "border-amber-200 bg-amber-50 text-amber-700",
    dot: "bg-white text-amber-600 ring-amber-50 border border-amber-300",
    icon: Flag,
  },
};

export default function Accreditations() {
  return (
    <section id="accreditations" className="border-t border-slate-200 bg-white py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Professional Accreditations & Roadmap"
          title="My path to FCIA"
          description="My plan through the Canadian Institute of Actuaries (CIA) Pathway 1, building on Western's UAP-accredited degree toward Associateship and Fellowship."
        />

        <ol className="relative">
          {roadmap.map((step, i) => {
            const style = statusStyles[step.status];
            const Icon = style.icon;
            const isLast = i === roadmap.length - 1;
            return (
              <li key={step.title} className="relative grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-8">
                <div className="flex flex-col items-center">
                  <span
                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-4 ${style.dot}`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  {!isLast && <span aria-hidden="true" className="w-px flex-1 bg-slate-200" />}
                </div>

                <article className={`${isLast ? "" : "pb-10"} pt-1.5`}>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="text-lg font-semibold tracking-tight text-slate-900">{step.title}</h3>
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${style.badge}`}>
                      {style.label}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-slate-500">{step.period}</p>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">{step.description}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
