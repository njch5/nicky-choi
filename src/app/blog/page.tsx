import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { OstDocument } from "outstatic";
import { getDocuments } from "outstatic/server";

export const metadata: Metadata = {
  title: "Blog",
};

type Keyword = {
  label: string;
  value: string;
};

type BlogPost = OstDocument & {
  keywords?: Keyword[];
};

type BlogOverviewPageProps = {
  searchParams: Promise<{ keyword?: string }>;
};

export default async function BlogOverviewPage({
  searchParams,
}: BlogOverviewPageProps) {
  const { keyword } = await searchParams;
  const allPosts = await getData();
  const posts = keyword
    ? allPosts.filter((post) =>
        post.keywords?.some((postKeyword) => postKeyword.value === keyword),
      )
    : allPosts;
  const keywordLabel = keyword
    ? allPosts
        .flatMap((post) => post.keywords ?? [])
        .find((postKeyword) => postKeyword.value === keyword)?.label ?? keyword
    : null;

  return (
    <main className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-3xl flex-col items-center px-8 py-16 sm:px-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="mt-3 text-neutral-600">
          {keywordLabel ? (
            <>
              Posts tagged &ldquo;{keywordLabel}&rdquo; ·{" "}
              <Link className="underline underline-offset-4" href="/blog">
                View all posts
              </Link>
            </>
          ) : (
            <>Thoughts, projects, and things I&apos;m learning.</>
          )}
        </p>
      </header>

      <div className="flex w-full flex-col gap-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-lg border border-neutral-200 p-6 text-left shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              <Link
                className="hover:underline hover:underline-offset-4"
                href={`/posts/${post.slug}`}
              >
                {post.title}
                {
                  <span className="ml-2 text-sm text-neutral-500">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                }
              </Link>
            </h2>
            <p className="text-neutral-600">{post.description}</p>
            {post.keywords?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.keywords.map((postKeyword: Keyword) => (
                  <Link
                    key={postKeyword.value}
                    href={{
                      pathname: "/blog",
                      query: { keyword: postKeyword.value },
                    }}
                    className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-300 transition-colors hover:bg-neutral-700"
                  >
                    {postKeyword.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </article>
        ))}

        {posts.length === 0 ? (
          <p className="text-center text-neutral-600">
            No posts found with this keyword.
          </p>
        ) : null}
      </div>
    </main>
  );
}

async function getData(): Promise<BlogPost[]> {
  const posts = await getDocuments("posts", [
    "title",
    "description",
    "slug",
    "publishedAt",
    "keywords",
  ]);
  return posts as BlogPost[];
}
