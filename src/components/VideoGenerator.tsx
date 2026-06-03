"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export function VideoGenerator() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/generate/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Generation failed");
        return;
      }
      setResult(data.generation.videoUrl);
      toast.success("Video generated!");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleGenerate} className="flex gap-3">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A cinematic drone shot of a futuristic city..."
          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="rounded-lg bg-purple-600 px-6 py-3 font-semibold transition hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>
      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-12">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
            <p className="mt-4 text-gray-400">Creating your video...</p>
          </div>
        </div>
      )}
      {result && (
        <div className="overflow-hidden rounded-lg border border-white/10">
          <video
            src={result}
            controls
            className="w-full"
          >
            Your browser does not support video playback.
          </video>
          <div className="flex items-center justify-between border-t border-white/10 bg-white/5 p-4">
            <p className="text-sm text-gray-400">Cost: 100 credits</p>
            <a
              href={result}
              download
              className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold transition hover:bg-purple-700"
            >
              Download
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
