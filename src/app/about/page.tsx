import { Navbar } from "@/components/Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="px-4 pt-32 pb-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-5xl font-bold">About CanvasModels</h1>
          <p className="mt-8 text-lg leading-relaxed text-gray-400">
            CanvasModels is a cutting-edge AI content generation platform that empowers creators
            to produce stunning images and videos using the latest AI models.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-gray-400">
            Our mission is to make AI-powered creativity accessible to everyone. With our simple
            credit-based system, you only pay for what you use.
          </p>
        </div>
      </main>
    </>
  );
}
