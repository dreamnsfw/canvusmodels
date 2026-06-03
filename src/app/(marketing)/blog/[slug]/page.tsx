import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { PageProps } from "@/types";

const posts: Record<string, { title: string; content: string; date: string }> = {
  "getting-started": {
    title: "Getting Started with CanvasModels",
    date: "Mar 15, 2026",
    content: "Create your account, buy a credit pack, and start generating stunning AI images and videos. Browse our model selection, enter your prompt, and let AI do the rest.",
  },
};

export default async function BlogPostPage({ params }: PageProps<{ slug: string }>) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <section className="px-4 pt-32 pb-24">
      <div className="mx-auto max-w-2xl space-y-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
          <ArrowLeft size={14} /> Back to Blog
        </Link>
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <p className="text-sm text-white/40">{post.date}</p>
        <Card glass className="p-8 text-white/70 leading-relaxed">
          <p>{post.content}</p>
        </Card>
      </div>
    </section>
  );
}
