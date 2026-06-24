"use client";

import { useLanguage } from "@/lib/i18n";

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;

  return (
    <section id="contact" className="py-24 circuit-bg">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <p className="fig-label mb-3">{c.figLabel}</p>
          <h2 className="font-display uppercase text-4xl mb-6">{c.title}</h2>
          <p className="text-muted leading-relaxed mb-8 max-w-md">{c.desc}</p>
          <div className="space-y-2 fig-label">
            <p>contact@lafabriknumerique.fr</p>
            <p>+33 6 00 00 00 00</p>
          </div>
        </div>
        <form className="space-y-4 border border-line p-8 bg-background-deep">
          <div>
            <label className="fig-label block mb-2" htmlFor="name">{c.name}</label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full bg-panel border border-line px-4 py-3 text-foreground focus:outline-none focus:border-cyan"
            />
          </div>
          <div>
            <label className="fig-label block mb-2" htmlFor="email">{c.email}</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full bg-panel border border-line px-4 py-3 text-foreground focus:outline-none focus:border-cyan"
            />
          </div>
          <div>
            <label className="fig-label block mb-2" htmlFor="message">{c.message}</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full bg-panel border border-line px-4 py-3 text-foreground focus:outline-none focus:border-cyan"
            />
          </div>
          <button
            type="submit"
            className="fig-label w-full bg-cyan text-background-deep px-6 py-3 hover:bg-amber transition-colors"
          >
            {t.cta.quote}
          </button>
        </form>
      </div>
    </section>
  );
}
