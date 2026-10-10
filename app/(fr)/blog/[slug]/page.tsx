import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/BlogPostPage";
import { blogContent, getPost, getSlugPair } from "@/lib/blog";

const SITE_URL = "https://www.lafabriknumerique.fr";

export function generateStaticParams() {
  return blogContent.fr.posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("fr", slug);
  if (!post) return {};

  const canonicalUrl = post.canonicalUrl ?? `${SITE_URL}/blog/${slug}`;
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
              fr: `${SITE_URL}/blog/${slug}`,
              ...(pair.en ? { en: `${SITE_URL}/en/blog/${pair.en}` } : {}),
              "x-default": `${SITE_URL}/blog/${slug}`,
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
      locale: "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/img/og.png`],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost("fr", slug);
  if (!post) notFound();
  return <BlogPostPage lang="fr" post={post} />;
}
