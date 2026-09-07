import Link from "next/link";
import { OstDocument } from "outstatic";

export type Keyword = { label: string; value: string };

export type BlogPost = OstDocument & {
  keywords?: Keyword[];
};

export default function BlogPostList({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="flex w-full flex-col gap-6">
      {posts.map((post) => (
        <article key={post.slug} className="rounded-lg border border-neutral-200 p-6 text-left shadow-sm transition-shadow duration-300 hover:shadow-md">
          <h2 className="mb-3 text-2xl font-semibold">
            <Link className="hover:underline hover:underline-offset-4" href={`/posts/${post.slug}`}>
              {post.title}
              <span className="ml-2 text-sm text-neutral-500">
                {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </Link>
          </h2>
          <p className="text-neutral-600">{post.description}</p>
          {post.keywords?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.keywords.map((keyword) => (
                <Link key={keyword.value} href={`/blog/tags/${encodeURIComponent(keyword.value)}`} className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-300 transition-colors hover:bg-neutral-700">
                  {keyword.label}
                </Link>
              ))}
            </div>
          ) : null}
        </article>
      ))}
      {posts.length === 0 ? <p className="text-center text-neutral-600">No published posts yet.</p> : null}
    </div>
  );
}
