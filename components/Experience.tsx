import { experience } from "@/lib/data";
import { Container, SectionHeading, Tag } from "./ui";

export default function Experience() {
  return (
    <section id="experience" className="border-t border-neutral-200 bg-neutral-50 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          description="Hands-on roles that sharpened my reliability, communication, and attention to detail."
        />

        <ol className="space-y-12">
          {experience.map((job) => (
            <li
              key={`${job.company}-${job.role}`}
              className="grid gap-4 md:grid-cols-[200px_1fr] md:gap-12"
            >
              <div className="text-sm text-neutral-500">
                <p className="font-medium text-neutral-900 md:text-neutral-500">{job.period}</p>
                <p className="mt-1">{job.location}</p>
              </div>

              <article>
                <h3 className="text-xl font-semibold tracking-tight text-neutral-900">
                  {job.role}
                </h3>
                <p className="mt-1 text-base text-neutral-600">{job.company}</p>

                <ul className="mt-5 space-y-2.5">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-base leading-relaxed text-neutral-600">
                      <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
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
