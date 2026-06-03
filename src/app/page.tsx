import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden px-4 pt-32 pb-24">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-black" />
          <div className="relative mx-auto max-w-6xl text-center">
            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              Generate Stunning{" "}
              <span className="text-gradient">AI Content</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
              Create beautiful images and videos with cutting-edge AI models.
              Pay as you go with our simple credit system.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/register"
                className="rounded-lg bg-purple-600 px-8 py-3 font-semibold transition hover:bg-purple-700"
              >
                Get Started Free
              </Link>
              <Link
                href="/pricing"
                className="rounded-lg border border-white/20 px-8 py-3 font-semibold transition hover:bg-white/5"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>

        <section className="px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-3xl font-bold">Powerful Features</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-gray-400">
              Everything you need to create amazing AI-generated content
            </p>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "AI Image Generation",
                  desc: "Generate stunning images with Flux, SDXL, and more. Multiple styles and resolutions.",
                  icon: "🎨",
                },
                {
                  title: "AI Video Generation",
                  desc: "Create captivating videos from text prompts. Powered by Kling and Veo.",
                  icon: "🎬",
                },
                {
                  title: "Credit System",
                  desc: "Simple pay-as-you-go pricing. Buy credits and use them across all models.",
                  icon: "⚡",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-white/10 bg-white/5 p-8 transition hover:border-purple-500/50"
                >
                  <div className="text-4xl">{feature.icon}</div>
                  <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold">Ready to Create?</h2>
            <p className="mt-4 text-gray-400">
              Join thousands of creators using CanvasModels
            </p>
            <Link
              href="/register"
              className="mt-8 inline-block rounded-lg bg-purple-600 px-8 py-3 font-semibold transition hover:bg-purple-700"
            >
              Start Creating
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
