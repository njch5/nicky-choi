import React from "react";
import { Metadata } from "next";
import { OstDocument } from "outstatic";
import { getDocumentSlugs, load } from "outstatic/server";
import { notFound } from "next/navigation";
import markdownToHtml from "@/lib/markdownToHtml";

type Post = {
  tags: { value: string; label: string }[];
} & OstDocument;

interface Params {
  params: {
    slug: string;
  };
}

async function retrieveData({ params }: Params) {
  const db = await load();

  const post = await db
    .find<Post>({ collection: "posts", slug: params.slug }, [
      "title",
      "publishedAt",
      "description",
      "slug",
      "author",
      "content",
      "coverImage",
      "tags",
    ])
    .first();

  if (!post) {
    notFound();
  }

  const content = await markdownToHtml(post.content || "");
  return { ...post, content };
}

export async function generateStaticParams() {
  const posts = getDocumentSlugs("posts");
  return posts.map((slug) => ({ slug }));
}
