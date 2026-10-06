import { GraduationCap, Palette } from "lucide-react";
import { projects } from "@/lib/data";
import { Container, SectionHeading, Tag } from "./ui";

const icons = [Palette, GraduationCap];

export default function Projects() {
  return (
    <section id="projects" className="border-t border-neutral-200 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Projects & Coursework"
          title="Selected work"
          description="A mix of precise design production and rigorous quantitative study."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article
                key={project.title}
                className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 transition-colors group-hover:bg-neutral-900 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-medium uppercase tracking-widest text-neutral-400">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl font-semibold tracking-tight text-neutral-900">
                  {project.title}
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-neutral-600">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
