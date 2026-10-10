"use client";

import Link from "next/link";
import { LanguageProvider, useLanguage, type Lang } from "@/lib/i18n";
import { blogContent, getSlugPair, type BlogPost } from "@/lib/blog";
import Header from "./Header";
import Footer from "./Footer";
import type { ReactNode } from "react";

const SITE_URL = "https://www.lafabriknumerique.fr";

// Liens internes : [ancre](/chemin) dans les paragraphes -> <Link> (meme onglet).
function renderInline(text: string): ReactNode[] {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!m) return part;
    const cls = "text-cyan underline underline-offset-2 hover:text-amber";
    return m[2].startsWith("/") ? (
      <Link key={i} href={m[2]} className={cls}>
        {m[1]}
      </Link>
    ) : (
      <a key={i} href={m[2]} target="_blank" rel="noopener noreferrer" className={cls}>
        {m[1]}
      </a>
    );
  });
}

export default function BlogPostPage({
  lang,
  post,
}: {
  lang: Lang;
  post: BlogPost;
}) {
  const pair = getSlugPair(post.id);
  const routes = {
    fr: pair.fr ? `/blog/${pair.fr}` : "/blog",
    en: pair.en ? `/en/blog/${pair.en}` : "/en/blog",
  };

  return (
    <LanguageProvider initialLang={lang} routes={routes}>
      <BlogArticle post={post} />
    </LanguageProvider>
  );
}

function BlogArticle({ post }: { post: BlogPost }) {
  const { lang } = useLanguage();
  const b = blogContent[lang];
  const base = lang === "en" ? "/en/blog" : "/blog";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription ?? post.excerpt,
    image: [`${SITE_URL}/img/og.png`],
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.canonicalUrl ?? `${SITE_URL}${base}/${post.slug}`,
    },
    author: {
      "@type": "Organization",
      name: "La Fabrik Numérique",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "La Fabrik Numérique",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/img/logo.png`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <article className="pt-32 pb-24 circuit-bg">
          <div className="mx-auto max-w-3xl px-6">
            <Link
              href={base}
              className="fig-label text-cyan hover:text-amber transition-colors"
            >
              {b.backBlog}
            </Link>
            <p className="fig-label mt-8 mb-3">{post.dateLabel}</p>
            <h1 className="font-display uppercase text-4xl">{post.title}</h1>
            <div className="flex flex-wrap gap-2 mt-5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="fig-label border border-line px-2 py-1 text-[0.65rem]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-10 space-y-8">
              {post.sections.map((s) => (
                <section key={s.h}>
                  <h2 className="font-display uppercase text-xl text-cyan">
                    {s.h}
                  </h2>
                  <div className="mt-3 space-y-3">
                    {s.p.map((para, i) => (
                      <p key={i} className="text-muted leading-relaxed">
                        {renderInline(para)}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {post.links.length > 0 && (
              <div className="mt-10 border-t border-line pt-8">
                <p className="fig-label mb-4">{b.seeAlso}</p>
                <div className="space-y-2">
                  {post.links.map((link) => (
                    link.url.startsWith("/") ? (
                      <Link
                        key={link.url}
                        href={link.url}
                        className="fig-label block text-cyan hover:text-amber transition-colors"
                      >
                        {link.label} →
                      </Link>
                    ) : (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fig-label block text-cyan hover:text-amber transition-colors"
                      >
                        {link.label}
                      </a>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
