import markdownToHtml from "@/lib/markdownToHtml";
import { OstDocument } from "outstatic";
import { getDocumentSlugs, load } from "outstatic/server";
import { notFound } from "next/navigation";
import Link from "next/link";

import { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";

type Post = {
  keywords?: { value: string; label: string }[];
} & OstDocument;

interface Params {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getData({ params });

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: absoluteUrl(`/posts/${post.slug}`),
      images: [
        {
          url: absoluteUrl(post?.coverImage || "/images/og-image.png"),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: absoluteUrl(post?.coverImage || "/images/og-image.png"),
    },
  };
}

export default async function PostPage({ params }: Params) {
  const post = await getData({ params });

  return (
    <div className="mx-auto w-full max-w-5xl px-8 pb-20 sm:px-8">
      <article>
        <header className="pt-12 text-center sm:pt-16">
          <h1 className="post-title">{post.title}</h1>

          {Array.isArray(post?.keywords) && post.keywords.length > 0 ? (
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {post.keywords.map(({ label, value }) => (
                <Link
                  key={value}
                  href={`/blog/tags/${encodeURIComponent(value)}`}
                  className="rounded-full bg-neutral-800 px-3 py-1 text-sm text-neutral-300 transition-colors hover:bg-neutral-700"
                >
                  {label}
                </Link>
              ))}
            </div>
          ) : null}
        </header>

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}

async function getData({ params }: Params) {
  const { slug } = await params;
  const db = await load();

  const post = await db
    .find<Post>({ collection: "posts", slug }, [
      "title",
      "publishedAt",
      "description",
      "slug",
      "author",
      "content",
      "coverImage",
      "keywords",
    ])
    .first();

  if (!post) {
    notFound();
  }

  const content = await markdownToHtml(post.content);

  return {
    ...post,
    content,
  };
}

export async function generateStaticParams() {
  const posts = getDocumentSlugs("posts");
  return posts.map((slug) => ({ slug }));
}
