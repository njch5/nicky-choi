import { Metadata } from "next";
import { getDocuments } from "outstatic/server";
import BlogPostList, { BlogPost } from "@/components/BlogPostList";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogOverviewPage() {
  const posts = getDocuments("posts", [
    "title",
    "description",
    "slug",
    "publishedAt",
    "keywords",
  ]) as BlogPost[];

  return (
    <main className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-3xl flex-col items-center px-8 py-16 sm:px-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="mt-3 text-neutral-600">
          Thoughts, projects, and things I&apos;m learning.
        </p>
      </header>

      <BlogPostList posts={posts} />
    </main>
  );
}
