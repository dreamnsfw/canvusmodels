"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Trash2, Image, Video } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
interface GalleryProps {
  generations: any[];
}

export function Gallery({ generations }: GalleryProps) {
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const [selected, setSelected] = useState<any>(null);

  const filtered = generations.filter((g) => filter === "all" || g.type === filter);

  return (
    <>
      <div className="flex items-center gap-2">
        {(["all", "image", "video"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-all capitalize",
              filter === f
                ? "bg-accent-500/10 text-accent-300 border border-accent-500/20"
                : "text-white/40 hover:text-white border border-transparent"
            )}
          >
            {f === "all" ? "All" : f === "image" ? <span className="flex items-center gap-1.5"><Image size={14} />Images</span> : <span className="flex items-center gap-1.5"><Video size={14} />Videos</span>}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
            <Image size={28} className="text-white/20" />
          </div>
          <p className="text-white/50">No generations yet</p>
          <p className="mt-1 text-sm text-white/20">Start creating to see your work here</p>
        </div>
      ) : (
        <motion.div
          layout
          className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4"
        >
          <AnimatePresence>
            {filtered.map((gen, i) => (
              <motion.div
                key={gen.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: (i % 12) * 0.03 }}
                className="mb-4 break-inside-avoid"
              >
                <Card
                  glass
                  hover
                  onClick={() => setSelected(gen)}
                  className="p-0 overflow-hidden group"
                >
                  <div className={cn("bg-white/5", gen.imageUrl || gen.videoUrl ? "" : "aspect-square flex items-center justify-center")}>
                    {gen.imageUrl ? (
                      <img src={gen.imageUrl} alt={gen.prompt} className="w-full object-cover" loading="lazy" />
                    ) : gen.videoUrl ? (
                      <video src={gen.videoUrl} className="w-full object-cover" />
                    ) : (
                      <span className="text-3xl text-white/20">{gen.type === "image" ? "🖼️" : "🎬"}</span>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-sm truncate text-white/70">{gen.prompt}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant={gen.type === "image" ? "info" : "premium"} size="sm">
                        {gen.type}
                      </Badge>
                      <span className="text-xs text-white/30">{gen.credits} cr</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} size="lg">
        {selected && (
          <div className="space-y-4">
            {selected.imageUrl && (
              <img src={selected.imageUrl} alt={selected.prompt} className="w-full rounded-xl" />
            )}
            {selected.videoUrl && (
              <video src={selected.videoUrl} className="w-full rounded-xl" controls />
            )}
            <div>
              <p className="font-medium">{selected.prompt}</p>
              <div className="mt-2 flex items-center gap-3 text-sm text-white/40">
                <Badge variant={selected.type === "image" ? "info" : "premium"}>{selected.type}</Badge>
                <span>{selected.credits} credits</span>
                <span>{new Date(selected.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <a href={selected.imageUrl ?? selected.videoUrl ?? "#"} download>
                <Button variant="secondary" size="sm" icon={<Download size={14} />}>
                  Download
                </Button>
              </a>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}


