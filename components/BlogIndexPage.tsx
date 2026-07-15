"use client";

import Link from "next/link";
import { LanguageProvider, useLanguage, type Lang } from "@/lib/i18n";
import { blogContent } from "@/lib/blog";
import BlogHeader from "./BlogHeader";
import Footer from "./Footer";

export default function BlogIndexPage({ lang }: { lang: Lang }) {
  return (
    <LanguageProvider initialLang={lang} routes={{ fr: "/blog", en: "/en/blog" }}>
      <BlogIndex />
    </LanguageProvider>
  );
}

function BlogIndex() {
  const { lang } = useLanguage();
  const b = blogContent[lang];
  const base = lang === "en" ? "/en/blog" : "/blog";

  return (
    <>
      <BlogHeader />
      <main className="flex-1">
        <section className="py-24 circuit-bg">
          <div className="mx-auto max-w-3xl px-6">
            <Link href={lang === "en" ? "/en" : "/"} className="fig-label text-cyan hover:text-amber transition-colors">
              {b.backHome}
            </Link>
            <p className="fig-label mt-8 mb-3">{b.figLabel}</p>
            <h1 className="font-display uppercase text-4xl mb-4">{b.indexTitle}</h1>
            <p className="text-muted leading-relaxed max-w-xl">{b.indexDesc}</p>

            <div className="mt-12 space-y-6">
              {b.posts.map((post) => (
                <article
                  key={post.slug}
                  className="border border-line p-6 hover:border-cyan transition-colors"
                >
                  <p className="fig-label text-muted">{post.dateLabel}</p>
                  <h2 className="font-display uppercase text-2xl mt-2">{post.title}</h2>
                  <p className="text-muted text-sm leading-relaxed mt-3">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="fig-label border border-line px-2 py-1 text-[0.65rem]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`${base}/${post.slug}`}
                    className="fig-label text-cyan mt-5 inline-flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    {b.readMore}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
