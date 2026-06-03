import { Card } from "@/components/ui/Card";
import { Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <section className="px-4 pt-32 pb-24">
      <div className="mx-auto max-w-3xl space-y-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold md:text-6xl">
            About <span className="text-gradient">CanvasModels</span>
          </h1>
          <p className="mt-4 text-lg text-white/50">
            One platform. All AI models. Simple credits.
          </p>
        </div>
        <Card glass className="p-8 space-y-4 text-white/70 leading-relaxed">
          <p>
            CanvasModels is a premium AI content generation platform that brings together the world&apos;s best AI
            models under one roof. Instead of juggling multiple subscriptions across different platforms, you buy
            credits once and use them across all models.
          </p>
          <p>
            Our mission is to make AI content generation accessible, affordable, and simple. Whether you&apos;re a
            digital artist, content creator, video producer, or marketing professional, CanvasModels gives you the
            tools you need to create stunning content.
          </p>
        </Card>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "10+ AI Models", desc: "Access the best image and video models" },
            { title: "Fair Pricing", desc: "Pay only for what you use, no subscriptions" },
            { title: "API Access", desc: "Integrate with your own applications" },
          ].map((item) => (
            <Card key={item.title} glass className="p-6 text-center">
              <Sparkles size={20} className="mx-auto text-accent-400 mb-3" />
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-white/50">{item.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
