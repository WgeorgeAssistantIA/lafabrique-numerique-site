"use client";

import { useState, type FormEvent } from "react";
import { useLanguage } from "@/lib/i18n";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 circuit-bg">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <p className="fig-label mb-3">{c.figLabel}</p>
          <h2 className="font-display uppercase text-4xl mb-6">{c.title}</h2>
          <p className="text-muted leading-relaxed mb-8 max-w-md">{c.desc}</p>
          <div className="space-y-2 fig-label">
            <a href={`mailto:${c.emailAddress}`} className="block text-cyan hover:text-amber transition-colors">
              {c.emailAddress}
            </a>
            <p className="text-muted">{c.responseTime}</p>
          </div>
        </div>
        <form onSubmit={onSubmit} className="space-y-4 border border-line p-8 bg-background-deep">
          <div>
            <label className="fig-label block mb-2" htmlFor="name">{c.name}</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={200}
              className="w-full bg-panel border border-line px-4 py-3 text-foreground focus:outline-none focus:border-cyan"
            />
          </div>
          <div>
            <label className="fig-label block mb-2" htmlFor="email">{c.email}</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={320}
              className="w-full bg-panel border border-line px-4 py-3 text-foreground focus:outline-none focus:border-cyan"
            />
          </div>
          <div>
            <label className="fig-label block mb-2" htmlFor="message">{c.message}</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              maxLength={5000}
              className="w-full bg-panel border border-line px-4 py-3 text-foreground focus:outline-none focus:border-cyan"
            />
          </div>
          {/* Honeypot: hidden from humans, bots fill it and get silently dropped */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <label className="fig-label flex items-start gap-3 cursor-pointer" htmlFor="consent">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              required
              className="mt-0.5 accent-[var(--cyan)]"
            />
            <span>
              {c.consentA}{" "}
              <a
                href="/confidentialite"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan underline hover:text-amber transition-colors"
              >
                {c.consentLink}
              </a>
              {c.consentB}
            </span>
          </label>
          <button
            type="submit"
            disabled={status === "sending"}
            className="fig-label w-full bg-cyan text-background-deep px-6 py-3 hover:bg-amber transition-colors disabled:opacity-60"
          >
            {status === "sending" ? c.sending : t.cta.quote}
          </button>
          {status === "success" && (
            <p className="fig-label text-cyan" role="status">{c.success}</p>
          )}
          {status === "error" && (
            <p className="fig-label text-amber" role="alert">
              {c.error}{" "}
              <a href={`mailto:${c.emailAddress}`} className="underline hover:text-cyan transition-colors">
                {c.emailAddress}
              </a>
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
