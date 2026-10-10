import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/BlogPostPage";
import { blogContent, getPost, getSlugPair } from "@/lib/blog";

const SITE_URL = "https://www.lafabriknumerique.fr";

export function generateStaticParams() {
  return blogContent.en.posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("en", slug);
  if (!post) return {};

  const canonicalUrl = post.canonicalUrl ?? `${SITE_URL}/en/blog/${slug}`;
  const title =
    post.metaTitle ??
    (post.title.length <= 42 ? `${post.title} — La Fabrik` : post.title);
  const description = post.metaDescription ?? post.excerpt;
  const pair = getSlugPair(post.id);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      ...(post.canonicalUrl
        ? {}
        : {
            languages: {
              en: `${SITE_URL}/en/blog/${slug}`,
              ...(pair.fr ? { fr: `${SITE_URL}/blog/${pair.fr}` } : {}),
              "x-default": pair.fr ? `${SITE_URL}/blog/${pair.fr}` : `${SITE_URL}/en/blog/${slug}`,
            },
          }),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "La Fabrik Numérique",
      type: "article",
      publishedTime: post.date,
      authors: ["La Fabrik Numérique"],
      images: [
        {
          url: `${SITE_URL}/img/og.png`,
          width: 1640,
          height: 624,
          alt: post.title,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/img/og.png`],
    },
  };
}

export default async function BlogPostEn({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost("en", slug);
  if (!post) notFound();
  return <BlogPostPage lang="en" post={post} />;
}
