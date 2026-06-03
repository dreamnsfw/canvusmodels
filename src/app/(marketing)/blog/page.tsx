import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const posts = [
  { slug: "getting-started", title: "Getting Started with CanvasModels", desc: "Learn how to create your account, buy credits, and start generating.", date: "Mar 15, 2026", tag: "Guide" },
  { slug: "best-ai-models-2026", title: "Best AI Models for Image & Video in 2026", desc: "A comprehensive comparison of available models and their strengths.", date: "Mar 10, 2026", tag: "Comparison" },
  { slug: "credit-system-explained", title: "How Our Credit System Works", desc: "Everything you need to know about credits, costs, and usage.", date: "Mar 5, 2026", tag: "Guide" },
];

export default function BlogPage() {
  return (
    <section className="px-4 pt-32 pb-24">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold md:text-6xl">
            <span className="text-gradient">Blog</span>
          </h1>
          <p className="mt-4 text-lg text-white/50">Tips, guides, and updates</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card glass hover className="p-6 h-full">
                <Badge variant="default" size="sm">{post.tag}</Badge>
                <h2 className="mt-4 font-semibold">{post.title}</h2>
                <p className="mt-2 text-sm text-white/50">{post.desc}</p>
                <p className="mt-4 text-xs text-white/30">{post.date}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
