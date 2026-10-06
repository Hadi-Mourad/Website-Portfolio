"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { LayoutTemplate } from "lucide-react";
import { experience, interests, leadership, profile, projects, skillGroups, spokenLanguages } from "@/lib/data";
import { useViewMode } from "./ViewMode";

const PROMPT = "guest@hadi-mourad:~$";

const COMMANDS: Record<string, string> = {
  help: "List available commands",
  about: "Who I am",
  experience: "Work history",
  leadership: "Leadership & involvement",
  projects: "Projects & coursework",
  skills: "Technical skills",
  beyond: "Interests outside work",
  contact: "How to reach me",
  resume: "Open my resume",
  ls: "List files",
  cat: "Read a file, e.g. cat about.txt",
  sudoku: "Play a hidden logic puzzle",
  clear: "Clear the screen",
  gui: "Return to the standard site",
};

const FILES: Record<string, string> = {
  "about.txt": "about",
  "experience.md": "experience",
  "leadership.md": "leadership",
  "projects.md": "projects",
  "skills.json": "skills",
  "beyond.md": "beyond",
  "contact.sh": "contact",
  "resume.pdf": "resume",
};

type Line = { id: number; input?: string; output?: ReactNode };

function Heading({ children }: { children: ReactNode }) {
  return <p className="mt-1 mb-2 font-semibold text-blue-400">{children}</p>;
}

function Muted({ children }: { children: ReactNode }) {
  return <span className="text-slate-500">{children}</span>;
}

const banner = (
  <div className="space-y-1">
    <p className="text-slate-500">Last login: {new Date().toDateString()} on ttys001</p>
    <p className="pt-2 text-lg font-bold tracking-tight text-blue-400 sm:text-xl">
      {profile.name.toUpperCase()}
    </p>
    <p>{profile.title}</p>
    <p>
      <Muted>Type</Muted> <span className="text-emerald-400">help</span>{" "}
      <Muted>to see available commands, or</Muted>{" "}
      <span className="text-emerald-400">gui</span>{" "}
      <Muted>to return to the standard site.</Muted>
    </p>
  </div>
);

export default function TerminalView() {
  const { setMode } = useViewMode();
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>([{ id: 0, output: banner }]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const outputFor = (name: string, args: string[]): ReactNode => {
    switch (name) {
      case "":
        return null;
      case "help":
        return (
          <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-0.5">
            {Object.entries(COMMANDS).map(([cmd, desc]) => (
              <div key={cmd} className="contents">
                <span className="text-emerald-400">{cmd}</span>
                <Muted>{desc}</Muted>
              </div>
            ))}
          </div>
        );
      case "about":
      case "whoami":
        return (
          <div>
            <Heading>{profile.name}</Heading>
            <p>{profile.title}</p>
            <p className="mt-2 max-w-2xl text-slate-400">{profile.bio}</p>
            <p className="mt-2 max-w-2xl text-emerald-400">{profile.target}</p>
            <p className="mt-2"><Muted>location:</Muted> {profile.location}</p>
            <p><Muted>languages:</Muted> {spokenLanguages}</p>
          </div>
        );
      case "experience":
        return experience.map((job, i) => (
          <div key={job.role} className={i > 0 ? "mt-4" : ""}>
            <Heading>
              {job.role} <Muted>@</Muted> {job.company}
            </Heading>
            <p><Muted>{job.period} · {job.location}</Muted></p>
            <ul className="mt-2 space-y-1">
              {job.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-blue-400">›</span>
                  <span className="max-w-3xl">{b}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-amber-300">[{job.tags.join(", ")}]</p>
          </div>
        ));
      case "leadership":
        return leadership.map((item, i) => (
          <div key={item.organization} className={i > 0 ? "mt-4" : ""}>
            <Heading>
              {item.role} <Muted>@</Muted> {item.organization}
            </Heading>
            <p><Muted>{item.period} · {item.location}</Muted></p>
            <p className="mt-1 max-w-3xl text-slate-400">{item.description}</p>
          </div>
        ));
      case "projects":
        return projects.map((p, i) => (
          <div key={p.title} className={i > 0 ? "mt-4" : ""}>
            <Heading>
              {String(i + 1).padStart(2, "0")}. {p.title} <Muted>({p.category})</Muted>
            </Heading>
            <p className="max-w-3xl text-slate-400">{p.description}</p>
            <p className="mt-1 text-amber-300">[{p.tags.join(", ")}]</p>
          </div>
        ));
      case "skills":
        return (
          <pre className="whitespace-pre-wrap">
            {"{\n"}
            {skillGroups.map((g, i) => (
              <span key={g.title}>
                {"  "}
                <span className="text-blue-400">&quot;{g.title}&quot;</span>: [
                {g.skills.map((s, j) => (
                  <span key={s}>
                    <span className="text-amber-300">&quot;{s}&quot;</span>
                    {j < g.skills.length - 1 ? ", " : ""}
                  </span>
                ))}
                ]{i < skillGroups.length - 1 ? ",\n" : "\n"}
              </span>
            ))}
            {"}"}
          </pre>
        );
      case "beyond":
        return interests.map((item) => (
          <p key={item.title}>
            <span className="text-blue-400">{item.title.padEnd(20, " ")}</span>
            <Muted>{item.description}</Muted>
          </p>
        ));
      case "contact":
        return (
          <div className="space-y-0.5">
            <p><Muted>email:   </Muted><a className="text-blue-400 underline" href={`mailto:${profile.email}`}>{profile.email}</a></p>
            <p><Muted>linkedin:</Muted> <a className="text-blue-400 underline" href={profile.linkedin} target="_blank" rel="noopener noreferrer">{profile.linkedin}</a></p>
            <p><Muted>location:</Muted> {profile.location}</p>
            <p className="mt-2 text-slate-400">I typically reply within one business day.</p>
          </div>
        );
      case "resume":
        window.open(profile.resume, "_blank", "noopener,noreferrer");
        return <p>Opening resume.pdf in a new tab…</p>;
      case "ls":
        return (
          <p className="flex flex-wrap gap-x-6">
            {Object.keys(FILES).map((f) => (
              <span key={f} className={f.endsWith(".sh") ? "text-emerald-400" : "text-blue-400"}>{f}</span>
            ))}
          </p>
        );
      case "cat": {
        const file = args[0];
        if (!file) return <p>cat: missing file operand. Try <span className="text-emerald-400">ls</span>.</p>;
        const target = FILES[file];
        if (!target) return <p>cat: {file}: No such file or directory</p>;
        return outputFor(target, []);
      }
      case "sudoku":
        router.push("/lost-in-the-grid");
        return <p>Loading puzzle… good luck.</p>;
      case "date":
        return <p>{new Date().toString()}</p>;
      case "echo":
        return <p>{args.join(" ")}</p>;
      case "sudo":
        return <p className="text-red-400">guest is not in the sudoers file. This incident will be reported.</p>;
      default:
        return (
          <p>
            command not found: <span className="text-red-400">{name}</span>. Type{" "}
            <span className="text-emerald-400">help</span> for a list of commands.
          </p>
        );
    }
  };

  const run = (raw: string) => {
    const trimmed = raw.trim();
    const [name = "", ...args] = trimmed.split(/\s+/);
    const command = name.toLowerCase();

    if (trimmed) setHistory((h) => [...h, trimmed]);
    setHistoryIndex(null);
    setInput("");

    if (command === "clear") {
      setLines([]);
      return;
    }
    if (command === "gui" || command === "exit") {
      setMode("standard");
      return;
    }

    setLines((prev) => [
      ...prev,
      { id: nextId.current++, input: raw, output: outputFor(command, args) },
    ]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      run(input);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) return;
      const index = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(index);
      setInput(history[index]);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === null) return;
      const index = historyIndex + 1;
      if (index >= history.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(index);
        setInput(history[index]);
      }
    } else if (event.key === "Tab") {
      event.preventDefault();
      const [cmd, arg] = input.split(/\s+/);
      if (cmd === "cat" && arg !== undefined) {
        const match = Object.keys(FILES).find((f) => f.startsWith(arg));
        if (match) setInput(`cat ${match}`);
      } else if (input) {
        const match = Object.keys(COMMANDS).find((c) => c.startsWith(input.toLowerCase()));
        if (match) setInput(match);
      }
    } else if (event.key === "l" && event.ctrlKey) {
      event.preventDefault();
      setLines([]);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col bg-slate-950 p-3 font-mono text-sm text-slate-300 sm:p-6">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            <span className="ml-3 hidden text-xs text-slate-500 sm:inline">
              hadi@portfolio — zsh
            </span>
          </div>
          <button
            type="button"
            onClick={() => setMode("standard")}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-blue-500 hover:text-white"
          >
            <LayoutTemplate className="h-3.5 w-3.5" />
            Standard view
          </button>
        </div>

        <div
          className="flex-1 cursor-text overflow-y-auto p-4 leading-relaxed sm:p-6"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line) => (
            <div key={line.id} className="mb-3">
              {line.input !== undefined && (
                <p>
                  <span className="text-emerald-400">{PROMPT}</span> {line.input}
                </p>
              )}
              {line.output}
            </div>
          ))}

          <div className="flex items-center">
            <label htmlFor="terminal-input" className="shrink-0 text-emerald-400">
              {PROMPT}
            </label>
            <div className="relative ml-2 flex-1">
              <input
                id="terminal-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="Terminal command"
                className="w-full bg-transparent text-slate-100 caret-blue-400 outline-none"
              />
            </div>
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
