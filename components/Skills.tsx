import { Code2, Cpu, Languages, ShieldCheck, Sigma } from "lucide-react";
import { skillGroups, spokenLanguages } from "@/lib/data";
import { Container, SectionHeading } from "./ui";

const icons = { code: Code2, sigma: Sigma, shield: ShieldCheck, cpu: Cpu };

export default function Skills() {
  return (
    <section id="skills" className="border-t border-slate-200 py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="Technical Skills" title="Tools & disciplines" />

        <div className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2">
          {skillGroups.map((group) => {
            const Icon = icons[group.icon];
            const isIndustry = group.icon === "shield";
            return (
              <div key={group.title} className="bg-white p-8">
                <div className="mb-6 flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      isIndustry ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                    {group.title}
                  </h3>
                </div>
                {isIndustry ? (
                  <ul className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-3">
                    {group.skills.map((skill) => (
                      <li key={skill} className="text-base leading-snug text-slate-600">
                        {skill}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-6 inline-flex items-center gap-2 text-sm text-slate-500">
          <Languages className="h-4 w-4" />
          {spokenLanguages}
        </p>
      </Container>
    </section>
  );
}
