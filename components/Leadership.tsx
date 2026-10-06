import { BarChart3, Briefcase, Star, Users } from "lucide-react";
import { leadership } from "@/lib/data";
import { Container, SectionHeading } from "./ui";

const icons = { briefcase: Briefcase, chart: BarChart3, users: Users };

export default function Leadership() {
  return (
    <section id="leadership" className="border-t border-slate-200 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Leadership & Involvement"
          title="Beyond the classroom"
          description="Building relationships, learning from practising actuaries, and staying close to the profession."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {leadership.map((item) => {
            const Icon = icons[item.icon];
            return (
              <article
                key={item.organization}
                className={`relative flex flex-col rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(15,23,42,0.08)] ${
                  item.featured ? "border-blue-200 ring-1 ring-blue-100" : "border-slate-200 hover:border-blue-200"
                }`}
              >
                <div className="mb-5 flex items-center justify-between">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      item.featured ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  {item.featured ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                      <Star className="h-3 w-3" />
                      Canada Life
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-slate-400">{item.period}</span>
                  )}
                </div>

                <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">{item.role}</p>
                <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-slate-900">
                  {item.organization}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {item.location}
                  {item.featured && ` · ${item.period}`}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
