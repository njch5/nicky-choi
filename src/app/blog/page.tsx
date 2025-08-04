import React from "react";
import { Metadata } from "next";
import { getDocuments } from "outstatic/server";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function BlogOverviewPage() {
  const posts = await getData();

  return (
    <div className="p-8 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="border border-gray-300 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
            <p className="text-gray-700">{post.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

async function getData() {
  const posts = await getDocuments("posts", ["title", "slug"]);
  return posts;
}
