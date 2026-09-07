import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDocuments } from "outstatic/server";
import BlogPostList, { BlogPost } from "@/components/BlogPostList";

type Props = { params: Promise<{ keyword: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { keyword } = await params;
  return { title: `Posts tagged ${decodeURIComponent(keyword)}` };
}

export default async function TaggedPostsPage({ params }: Props) {
  const { keyword } = await params;
  const decodedKeyword = decodeURIComponent(keyword);
  const allPosts = getPosts();
  const matchingKeyword = allPosts.flatMap((post) => post.keywords ?? []).find((item) => item.value === decodedKeyword);

  if (!matchingKeyword) notFound();

  const posts = allPosts.filter((post) => post.keywords?.some((item) => item.value === decodedKeyword));

  return (
    <main className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-3xl flex-col items-center px-8 py-16 sm:px-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="mt-3 text-neutral-600">
          Posts tagged &ldquo;{matchingKeyword.label}&rdquo; ·{" "}
          <Link className="underline underline-offset-4" href="/blog">View all posts</Link>
        </p>
      </header>
      <BlogPostList posts={posts} />
    </main>
  );
}

export function generateStaticParams() {
  const keywords = getPosts().flatMap((post) => post.keywords ?? []);
  return Array.from(new Set(keywords.map((keyword) => keyword.value))).map((keyword) => ({ keyword }));
}

function getPosts(): BlogPost[] {
  return getDocuments("posts", ["title", "description", "slug", "publishedAt", "keywords"]) as BlogPost[];
}
