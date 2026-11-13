"use client";

import { useState, type FormEvent } from "react";
import { useLanguage } from "@/lib/i18n";
import {
  EDITOR_PHONE,
  EDITOR_PHONE_INTL,
  EDITOR_PHONE_INTL_DISPLAY,
  EDITOR_STREET,
  EDITOR_POSTCODE,
  EDITOR_CITY,
} from "@/lib/legal";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const { t, lang } = useLanguage();
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
      <div className="mx-auto max-w-6xl px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start lg:items-stretch">
        <div className="lg:col-span-5">
          <p className="fig-label text-cyan mb-3">{c.figLabel}</p>
          <h2 className="font-display uppercase text-4xl sm:text-5xl mb-6">{c.title}</h2>
          <p className="text-muted leading-relaxed mb-8 max-w-md text-base sm:text-lg">
            {c.desc}
          </p>

          <div className="rounded-2xl border border-white/[0.08] glass-panel p-6 space-y-4">
            <div>
              <span className="fig-label text-[0.65rem] block mb-1">{c.emailLabel}</span>
              <a
                href={`mailto:${c.emailAddress}`}
                className="font-mono text-sm sm:text-base text-cyan hover:text-amber transition-colors"
              >
                {c.emailAddress}
              </a>
            </div>
            <div>
              <span className="fig-label text-[0.65rem] block mb-1">{c.phoneLabel}</span>
              <a
                href={`tel:${EDITOR_PHONE_INTL}`}
                className="font-mono text-sm sm:text-base text-cyan hover:text-amber transition-colors"
              >
                {lang === "en" ? EDITOR_PHONE_INTL_DISPLAY : EDITOR_PHONE}
              </a>
            </div>
            <div>
              <span className="fig-label text-[0.65rem] block mb-1">{c.addressLabel}</span>
              <address className="not-italic text-sm sm:text-base text-foreground/90 leading-relaxed">
                {EDITOR_STREET}
                <br />
                {EDITOR_POSTCODE} {EDITOR_CITY}
                {lang === "en" && ", France"}
              </address>
            </div>
            <div className="pt-4 border-t border-white/[0.08] flex items-center gap-2.5">
              <span className="node-dot" />
              <p className="fig-label text-foreground/90">{c.responseTime}</p>
            </div>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="lg:col-span-7 flex flex-col gap-5 rounded-2xl border border-white/10 glass-panel p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="fig-label block mb-2 text-foreground/80" htmlFor="name">
                {c.name}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength={200}
                className="w-full rounded-lg bg-background-deep/80 border border-white/10 px-4 py-3 text-foreground focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all"
              />
            </div>
            <div>
              <label className="fig-label block mb-2 text-foreground/80" htmlFor="email">
                {c.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={320}
                className="w-full rounded-lg bg-background-deep/80 border border-white/10 px-4 py-3 text-foreground focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all"
              />
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <label className="fig-label block mb-2 text-foreground/80" htmlFor="message">
              {c.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              maxLength={5000}
              className="w-full flex-1 min-h-[7rem] rounded-lg bg-background-deep/80 border border-white/10 px-4 py-3 text-foreground focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all"
            />
          </div>
          {/* Honeypot: hidden from humans, bots fill it and get silently dropped */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <label
            className="fig-label flex items-start gap-3 cursor-pointer"
            htmlFor="consent"
          >
            <input
              id="consent"
              name="consent"
              type="checkbox"
              required
              className="mt-0.5 rounded accent-[var(--cyan)]"
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
            className="btn-shine btn-primary w-full disabled:opacity-60"
          >
            <span>{status === "sending" ? c.sending : t.cta.quote}</span>
          </button>
          {status === "success" && (
            <p className="fig-label text-cyan" role="status">
              {c.success}
            </p>
          )}
          {status === "error" && (
            <p className="fig-label text-amber" role="alert">
              {c.error}{" "}
              <a
                href={`mailto:${c.emailAddress}`}
                className="underline hover:text-cyan transition-colors"
              >
                {c.emailAddress}
              </a>
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
