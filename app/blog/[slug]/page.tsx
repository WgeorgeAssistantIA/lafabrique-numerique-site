import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/BlogPostPage";
import { blogContent, getPost, getSlugPair } from "@/lib/blog";

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
  const pair = getSlugPair(post.id);
  return {
    title: `${post.title} — La Fabrik Numérique`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
      languages: {
        fr: `/blog/${slug}`,
        ...(pair.en ? { en: `/en/blog/${pair.en}` } : {}),
        "x-default": `/blog/${slug}`,
      },
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
