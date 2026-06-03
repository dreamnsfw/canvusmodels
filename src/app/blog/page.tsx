import { Navbar } from "@/components/Navbar";
import Link from "next/link";

const posts = [
  { slug: "getting-started-with-ai-generation", title: "Getting Started with AI Generation", excerpt: "Learn how to create stunning AI content with CanvasModels.", date: "2026-01-15" },
  { slug: "understanding-credit-system", title: "Understanding the Credit System", excerpt: "How our credit system works and how to maximize value.", date: "2026-01-10" },
  { slug: "top-5-ai-image-prompts", title: "Top 5 AI Image Prompts for 2026", excerpt: "Inspiration for your next AI image generation.", date: "2026-01-05" },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="px-4 pt-32 pb-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-5xl font-bold">Blog</h1>
          <p className="mt-4 text-xl text-gray-400">
            Tips, tutorials, and updates from CanvasModels
          </p>
          <div className="mt-12 space-y-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-purple-500/50"
              >
                <h2 className="text-2xl font-semibold">{post.title}</h2>
                <p className="mt-2 text-gray-400">{post.excerpt}</p>
                <p className="mt-4 text-sm text-gray-500">{post.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
