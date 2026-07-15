"use client";

import Link from "next/link";
import { LanguageProvider, useLanguage, type Lang } from "@/lib/i18n";
import { blogContent, getSlugPair, type BlogPost } from "@/lib/blog";
import BlogHeader from "./BlogHeader";
import Footer from "./Footer";

export default function BlogPostPage({ lang, post }: { lang: Lang; post: BlogPost }) {
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

  return (
    <>
      <BlogHeader />
      <main className="flex-1">
        <article className="py-24 circuit-bg">
          <div className="mx-auto max-w-3xl px-6">
            <Link href={base} className="fig-label text-cyan hover:text-amber transition-colors">
              {b.backBlog}
            </Link>
            <p className="fig-label mt-8 mb-3">{post.dateLabel}</p>
            <h1 className="font-display uppercase text-4xl">{post.title}</h1>
            <div className="flex flex-wrap gap-2 mt-5">
              {post.tags.map((tag) => (
                <span key={tag} className="fig-label border border-line px-2 py-1 text-[0.65rem]">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-10 space-y-8">
              {post.sections.map((s) => (
                <section key={s.h}>
                  <h2 className="font-display uppercase text-xl text-cyan">{s.h}</h2>
                  <div className="mt-3 space-y-3">
                    {s.p.map((para, i) => (
                      <p key={i} className="text-muted leading-relaxed">
                        {para}
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
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="fig-label block text-cyan hover:text-amber transition-colors"
                    >
                      {link.label}
                    </a>
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
