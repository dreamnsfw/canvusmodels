import { Navbar } from "@/components/Navbar";
import Link from "next/link";

const posts: Record<string, { title: string; content: string; date: string }> = {
  "getting-started-with-ai-generation": {
    title: "Getting Started with AI Generation",
    date: "2026-01-15",
    content: "CanvasModels makes it easy to generate AI content. Simply buy credits, choose your model, write a prompt, and generate. Start with image generation for 10 credits per image or video generation for 100 credits per video.",
  },
  "understanding-credit-system": {
    title: "Understanding the Credit System",
    date: "2026-01-10",
    content: "Our credit system is simple: buy credit packs starting at $10 for 1000 credits. Each generation costs a fixed number of credits. Images cost 10 credits, videos cost 100 credits. Credits never expire.",
  },
  "top-5-ai-image-prompts": {
    title: "Top 5 AI Image Prompts for 2026",
    date: "2026-01-05",
    content: "1. 'Cinematic shot of a cyberpunk city at night' 2. 'A serene mountain landscape with aurora borealis' 3. 'Fantasy dragon in a magical forest' 4. 'Retro 80s synthwave sunset' 5. 'Minimalist geometric abstract art'",
  },
};

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = posts[slug];

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="px-4 pt-32 pb-24 text-center">
          <h1 className="text-4xl font-bold">Post Not Found</h1>
          <Link href="/blog" className="mt-4 inline-block text-purple-400 hover:underline">Back to Blog</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="px-4 pt-32 pb-24">
        <div className="mx-auto max-w-3xl">
          <Link href="/blog" className="text-sm text-purple-400 hover:underline">&larr; Back to Blog</Link>
          <h1 className="mt-4 text-4xl font-bold">{post.title}</h1>
          <p className="mt-2 text-sm text-gray-500">{post.date}</p>
          <p className="mt-8 text-lg leading-relaxed text-gray-400">{post.content}</p>
        </div>
      </main>
    </>
  );
}
