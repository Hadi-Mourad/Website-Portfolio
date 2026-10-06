import { Crosshair, Dumbbell, Grid3x3, Trophy } from "lucide-react";
import { interests } from "@/lib/data";
import { Container, SectionHeading } from "./ui";

const icons = {
  dumbbell: Dumbbell,
  crosshair: Crosshair,
  grid: Grid3x3,
  trophy: Trophy,
};

export default function Beyond() {
  return (
    <section id="beyond" className="border-t border-neutral-200 py-24 sm:py-32">
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
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-700">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-neutral-900">{item.title}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-neutral-600">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
