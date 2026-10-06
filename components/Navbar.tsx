"use client";

import { useEffect, useState } from "react";
import { FileText, Menu, SquareTerminal, X } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { useViewMode } from "./ViewMode";

function scrollToSection(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith("#")) return;
  const target = document.querySelector(href);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", href);
}

export default function Navbar() {
  const { setMode } = useViewMode();
  const [active, setActive] = useState<string>("#home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    scrollToSection(event, href);
    setOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled || open
          ? "border-b border-slate-200/80 bg-slate-50/80 backdrop-blur-md"
          : "border-b border-transparent bg-slate-50"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6 sm:px-8"
      >
        <a href="#home" onClick={(e) => handleClick(e, "#home")} className="flex items-center gap-3">
          <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-slate-900">Hadi Mourad</span>
          <span className="hidden items-center gap-1.5 whitespace-nowrap rounded-full sm:max-lg:inline-flex xl:inline-flex border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Open to co-op · May 2027
          </span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                aria-current={active === link.href ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm transition-colors ${
                  active === link.href
                    ? "font-medium text-blue-600"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="ml-1">
            <button
              type="button"
              onClick={() => setMode("terminal")}
              title="Switch to terminal view"
              aria-label="Switch to terminal view"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-200/60 hover:text-slate-900"
            >
              <SquareTerminal className="h-4 w-4" />
            </button>
          </li>
          <li className="ml-1">
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              <FileText className="h-4 w-4" />
              Resume
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-slate-700 hover:bg-slate-200/60 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="h-[calc(100dvh-4rem)] border-t border-slate-200 bg-slate-50 lg:hidden">
          <ul className="flex flex-col gap-1 px-6 py-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`block rounded-lg px-3 py-3 text-lg ${
                    active === link.href
                      ? "bg-white font-medium text-blue-600 shadow-sm"
                      : "text-slate-600"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setMode("terminal");
                }}
                className="flex items-center justify-center gap-2 rounded-full border border-slate-300 px-4 py-3 text-base font-medium text-slate-900"
              >
                <SquareTerminal className="h-4 w-4" />
                Terminal
              </button>
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-base font-medium text-white"
              >
                <FileText className="h-4 w-4" />
                Resume
              </a>
            </li>
            <li className="mt-4 flex justify-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Open to co-op · May 2027
              </span>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
