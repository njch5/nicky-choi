import React from 'react';
import { Metadata } from 'next';
import { getDocuments } from 'outstatic/server';

export const metadata: Metadata = {
  title: "Blog"
}

export async function generateStaticParams() {
  const posts = await getDocuments('posts')
  return posts.map(post => ({
    slug: post.slug
  }))
}

const blogPosts = [
  { id: 1, title: 'First Blog Post', summary: 'This is the summary of the first blog post.' },
  { id: 2, title: 'Second Blog Post', summary: 'This is the summary of the second blog post.' },
  { id: 3, title: 'Third Blog Post', summary: 'This is the summary of the third blog post.' },
  { id: 4, title: 'Last Blog Post', summary: 'This is the summary of the last blog post.' },
  // Add more blog posts here
];

const BlogOverviewPage: React.FC = () => {
  return (
    <div className="p-8">
      {/* <h1 className="text-3xl font-bold mb-8">Blog Overview</h1> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map(post => (
          <div key={post.id} className="border border-gray-300 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
            <p className="text-gray-700">{post.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogOverviewPage;