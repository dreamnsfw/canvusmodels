"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Image, Video, Settings2, Layers, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const models = [
  { id: "flux-pro", name: "Flux Pro", type: "image", cost: 10, provider: "Fal.ai" },
  { id: "nano-banana", name: "Nano Banana Pro", type: "image", cost: 8, provider: "Fal.ai" },
  { id: "seedream", name: "Seedream", type: "image", cost: 12, provider: "Fal.ai" },
  { id: "gpt-image", name: "GPT Image", type: "image", cost: 15, provider: "Replicate" },
  { id: "kling", name: "Kling 1.5", type: "video", cost: 30, provider: "Fal.ai" },
  { id: "veo", name: "Veo 3", type: "video", cost: 40, provider: "Replicate" },
];

const sizes = ["1:1", "16:9", "9:16", "4:3", "3:2"];

export function Workspace() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"image" | "video">(
    (searchParams.get("mode") as "image" | "video") || "image"
  );
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState("1:1");
  const [count, setCount] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const filteredModels = models.filter((m) => m.type === mode);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    try {
      const res = await fetch(`/api/generate/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model: selectedModel.id, size, count }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      if (data.generation?.imageUrl) setResults((r) => [data.generation.imageUrl, ...r]);
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-4">
      {/* Left — Model selector */}
      <div className="w-56 shrink-0 space-y-3 overflow-y-auto">
        <div className="flex rounded-xl border border-white/[0.08] p-1 bg-white/[0.03]">
          <button
            onClick={() => { setMode("image"); setSelectedModel(filteredModels[0]); }}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all",
              mode === "image" ? "bg-accent-500/10 text-accent-300" : "text-white/40 hover:text-white"
            )}
          >
            <Image size={14} /> Image
          </button>
          <button
            onClick={() => { setMode("video"); setSelectedModel(filteredModels[0]); }}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all",
              mode === "video" ? "bg-accent-500/10 text-accent-300" : "text-white/40 hover:text-white"
            )}
          >
            <Video size={14} /> Video
          </button>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium text-white/30 px-1">Models</p>
          {filteredModels.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedModel(m)}
              className={cn(
                "w-full rounded-xl px-3 py-2.5 text-left text-sm transition-all",
                selectedModel.id === m.id
                  ? "bg-accent-500/10 border border-accent-500/20"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              <div className="font-medium">{m.name}</div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-white/30">{m.provider}</span>
                <Badge variant="premium" size="sm">{m.cost} cr</Badge>
              </div>
            </button>
          ))}
        </div>

        {/* Settings */}
        <div className="space-y-3 border-t border-white/[0.06] pt-3">
          <div>
            <p className="text-xs font-medium text-white/30 mb-1.5">Aspect Ratio</p>
            <div className="flex flex-wrap gap-1">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all",
                    size === s
                      ? "bg-accent-500/10 text-accent-300 border border-accent-500/20"
                      : "bg-white/5 text-white/40 hover:text-white border border-transparent"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-white/30 mb-1.5">Count</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className={cn(
                    "rounded-lg w-8 h-8 text-xs font-medium transition-all",
                    count === n
                      ? "bg-accent-500/10 text-accent-300 border border-accent-500/20"
                      : "bg-white/5 text-white/40 hover:text-white border border-transparent"
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Center — Prompt + Canvas */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-2">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to create..."
            className="flex-1 bg-transparent resize-none h-10 px-3 py-2 text-sm outline-none placeholder:text-white/20"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleGenerate();
              }
            }}
          />
          <Button onClick={handleGenerate} loading={generating} size="sm">
            <Send size={14} />
            Generate
          </Button>
        </div>

        <div className="flex-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden flex items-center justify-center">
          {results.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 p-4 w-full h-full">
              <AnimatePresence>
                {results.map((url, i) => (
                  <motion.div
                    key={url + i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-xl overflow-hidden bg-white/5"
                  >
                    {mode === "image" ? (
                      <img src={url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <video src={url} className="w-full h-full object-cover" controls />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center p-12">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/10">
                <Sparkles size={24} className="text-accent-400" />
              </div>
              {generating ? (
                <div className="space-y-3">
                  <div className="animate-shimmer h-4 w-48 rounded-full mx-auto" />
                  <div className="animate-shimmer h-3 w-32 rounded-full mx-auto" />
                </div>
              ) : (
                <>
                  <p className="text-sm text-white/50">Describe what you want to create</p>
                  <p className="mt-1 text-xs text-white/20">
                    Press Enter or click Generate to start
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right — Info panel */}
      <div className="w-72 shrink-0 space-y-4">
        <Card glass className="p-4">
          <div className="flex items-center gap-2 text-sm font-medium mb-3">
            <Settings2 size={14} className="text-accent-400" />
            Generation Details
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-white/50">
              <span>Model</span>
              <span className="text-white/80">{selectedModel.name}</span>
            </div>
            <div className="flex justify-between text-white/50">
              <span>Type</span>
              <span className="text-white/80 capitalize">{mode}</span>
            </div>
            <div className="flex justify-between text-white/50">
              <span>Size</span>
              <span className="text-white/80">{size}</span>
            </div>
            <div className="flex justify-between text-white/50">
              <span>Count</span>
              <span className="text-white/80">{count}</span>
            </div>
            <div className="border-t border-white/[0.06] pt-2 flex justify-between font-medium">
              <span>Cost</span>
              <span className="text-accent-300">{selectedModel.cost * count} credits</span>
            </div>
          </div>
        </Card>
        <Card glass className="p-4">
          <div className="flex items-center gap-2 text-sm font-medium mb-3">
            <Layers size={14} className="text-accent-400" />
            Recent Results
          </div>
          {results.length === 0 ? (
            <p className="text-xs text-white/30">No results yet</p>
          ) : (
            <div className="space-y-2">
              {results.slice(0, 4).map((url, i) => (
                <div key={i} className="rounded-lg overflow-hidden bg-white/5 aspect-video">
                  {mode === "image" ? (
                    <img src={url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <video src={url} className="w-full h-full object-cover" />
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
