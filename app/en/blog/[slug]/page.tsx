import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/BlogPostPage";
import { blogContent, getPost, getSlugPair } from "@/lib/blog";

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
  if (post.canonicalUrl) {
    return {
      title: `${post.title} — La Fabrik Numérique`,
      description: post.excerpt,
      alternates: { canonical: post.canonicalUrl },
    };
  }
  const pair = getSlugPair(post.id);
  return {
    title: `${post.title} — La Fabrik Numérique`,
    description: post.excerpt,
    alternates: {
      canonical: `/en/blog/${slug}`,
      languages: {
        en: `/en/blog/${slug}`,
        ...(pair.fr ? { fr: `/blog/${pair.fr}` } : {}),
        "x-default": pair.fr ? `/blog/${pair.fr}` : `/en/blog/${slug}`,
      },
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
