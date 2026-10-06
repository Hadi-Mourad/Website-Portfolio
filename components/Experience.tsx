import { experience } from "@/lib/data";
import { Container, SectionHeading, Tag } from "./ui";

export default function Experience() {
  return (
    <section id="experience" className="border-t border-slate-200 bg-white py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          description="Roles built on reconciliation, data accuracy, and compliance — the same discipline actuarial work demands."
        />

        <ol className="space-y-12">
          {experience.map((job) => (
            <li
              key={`${job.company}-${job.role}`}
              className="grid gap-4 md:grid-cols-[200px_1fr] md:gap-12"
            >
              <div className="text-sm text-slate-500">
                <p className="font-medium text-slate-900 md:text-slate-500">{job.period}</p>
                <p className="mt-1">{job.location}</p>
              </div>

              <article className="border-l-2 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900">{job.role}</h3>
                <p className="mt-1 text-base text-slate-600">{job.company}</p>

                <ul className="mt-5 space-y-2.5">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-base leading-relaxed text-slate-600">
                      <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-blue-600" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
