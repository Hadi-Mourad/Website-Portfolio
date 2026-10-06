"use client";

import { useState } from "react";
import { CheckCircle2, Clock, Mail, MapPin, Send } from "lucide-react";
import { profile } from "@/lib/data";
import { Container, LinkedinIcon } from "./ui";

type Status = "idle" | "sending" | "sent";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const inputClass =
  "w-full rounded-xl border bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/5";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const validate = (): Errors => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Please enter a valid email.";
    if (form.message.trim().length < 10) next.message = "Message should be at least 10 characters.";
    return next;
  };

  // Opens the visitor's mail client with the message prefilled.
  // Swap for a real endpoint (Formspree, Resend, a route handler) when ready.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    await new Promise((resolve) => setTimeout(resolve, 600));
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
  };

  const update =
    (field: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
      if (status === "sent") setStatus("idle");
    };

  const fieldBorder = (field: keyof Errors) =>
    errors[field] ? "border-red-400" : "border-neutral-200";

  return (
    <section id="contact" className="border-t border-neutral-200 bg-neutral-50 py-24 sm:py-32">
      <Container>
        <div className="grid gap-16 md:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Contact
            </p>
            <h2 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              Get in touch
            </h2>
            <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
              Whether it&apos;s an internship, a project, or just a conversation about
              actuarial science, I&apos;d love to hear from you.
            </p>

            <ul className="mt-10 space-y-4 text-base">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-3 text-neutral-700 transition-colors hover:text-neutral-900"
                >
                  <Mail className="h-5 w-5 text-neutral-400" />
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-neutral-700 transition-colors hover:text-neutral-900"
                >
                  <LinkedinIcon className="h-5 w-5 text-neutral-400" />
                  LinkedIn
                </a>
              </li>
              <li className="inline-flex items-center gap-3 text-neutral-700">
                <MapPin className="h-5 w-5 text-neutral-400" />
                {profile.location}
              </li>
            </ul>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-neutral-900">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={update("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`${inputClass} ${fieldBorder("name")}`}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-neutral-900">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="jane@company.com"
                  value={form.email}
                  onChange={update("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`${inputClass} ${fieldBorder("email")}`}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-neutral-900">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Tell me a little about what you have in mind…"
                value={form.message}
                onChange={update("message")}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`${inputClass} resize-y ${fieldBorder("message")}`}
              />
              {errors.message && (
                <p id="message-error" className="mt-1.5 text-sm text-red-600">{errors.message}</p>
              )}
            </div>

            <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="inline-flex items-center gap-2 text-sm text-neutral-500">
                <Clock className="h-4 w-4" />
                I typically reply within one business day.
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send message"}
                <Send className="h-4 w-4" />
              </button>
            </div>

            {status === "sent" && (
              <p
                role="status"
                className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
              >
                <CheckCircle2 className="h-4 w-4" />
                Thanks! Your email client should have opened with your message ready to send.
              </p>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}
