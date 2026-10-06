import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import { profile } from "@/lib/data";
import { Container, LinkedinIcon } from "./ui";

export default function Hero() {
  const quickLinks = [
    { label: profile.location, icon: MapPin },
    { label: "Email", icon: Mail, href: `mailto:${profile.email}` },
    { label: "LinkedIn", icon: LinkedinIcon, href: profile.linkedin, external: true },
    { label: "Download Resume", icon: Download, href: profile.resume, download: true },
  ];

  return (
    <section id="home" aria-label="Introduction" className="pt-16 pb-24 sm:pt-24 sm:pb-32">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-[1fr_auto] md:gap-16">
          <div className="order-2 md:order-1">
            <p className="mb-5 text-sm font-medium text-slate-500">Hi, I&apos;m</p>
            <h1 className="text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
              {profile.name}
            </h1>
            <p className="mt-4 text-xl font-medium tracking-tight text-slate-500 sm:text-2xl">
              {profile.title}
            </p>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {profile.bio}
            </p>

            <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-600">
              {quickLinks.map(({ label, icon: Icon, href, external, download }, i) => (
                <li key={label} className="flex items-center gap-5">
                  {href ? (
                    <a
                      href={href}
                      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                      {...(download && { download: true })}
                      className="inline-flex items-center gap-1.5 underline-offset-4 transition-colors hover:text-blue-600 hover:underline"
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5">
                      <Icon className="h-4 w-4" />
                      {label}
                    </span>
                  )}
                  {i < quickLinks.length - 1 && (
                    <span aria-hidden="true" className="hidden h-4 w-px bg-slate-300 sm:block" />
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-700"
              >
                View my work
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900"
              >
                Get in touch
              </a>
            </div>
          </div>

          {/* Swap this placeholder for <Image src="/headshot.jpg" ... /> from next/image. */}
          <div className="order-1 md:order-2">
            <div className="relative mx-auto h-48 w-48 sm:h-60 sm:w-60 md:h-72 md:w-72">
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl border border-blue-200" />
              <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200">
                <span className="text-6xl font-semibold tracking-tight text-slate-400 sm:text-7xl">HM</span>
                <span className="mt-2 text-xs font-medium uppercase tracking-widest text-slate-400">
                  Headshot
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
