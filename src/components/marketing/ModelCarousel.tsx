"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

const items = [
  { name: "Flux Pro", type: "Image", gradient: "from-purple-600/30 to-blue-600/30", label: "Photorealistic portraits, product shots, landscapes" },
  { name: "Nano Banana Pro", type: "Image", gradient: "from-yellow-600/30 to-orange-600/30", label: "High-quality visuals, marketing materials" },
  { name: "Kling 1.5", type: "Video", gradient: "from-green-600/30 to-emerald-600/30", label: "Cinematic video from text prompts" },
  { name: "Veo 3", type: "Video", gradient: "from-red-600/30 to-pink-600/30", label: "High-fidelity video generation" },
  { name: "Seedream", type: "Image", gradient: "from-cyan-600/30 to-blue-600/30", label: "Anime, artistic, creative styles" },
  { name: "GPT Image", type: "Image", gradient: "from-purple-600/30 to-pink-600/30", label: "Versatile image generation" },
  { name: "Seedance", type: "Video", gradient: "from-teal-600/30 to-green-600/30", label: "Smooth motion video" },
  { name: "Soul Cinema", type: "Video", gradient: "from-violet-600/30 to-purple-600/30", label: "Cinematic storytelling" },
];

const duplicated = [...items, ...items, ...items];

export function ModelCarousel() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative px-4 py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold md:text-5xl" style={{ color: 'var(--text-primary)' }}>
            Powered by <span className="text-gradient">Premium Models</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Access the most advanced AI models for every creative need
          </p>
        </motion.div>
      </div>

      <div className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[var(--bg-deep)] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[var(--bg-deep)] to-transparent pointer-events-none" />

        <motion.div
          className="flex gap-6"
          animate={isHovered ? { x: 0 } : { x: ["0%", "-33.33%"] }}
          transition={isHovered ? {} : { duration: 40, ease: "linear", repeat: Infinity }}
        >
          {duplicated.map((item, i) => (
            <div
              key={i}
              className="relative w-[320px] shrink-0 rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className={`aspect-[4/3] bg-gradient-to-br ${item.gradient} p-6 flex flex-col justify-end`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-3 py-1 text-xs font-medium mb-3 w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    {item.type}
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.name}</h3>
                  <p className="text-sm text-white/70 mt-1">{item.label}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
