"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

const items = [
  { id: 1, label: "Flux — Cinematic Portrait" },
  { id: 2, label: "Kling — City Drone Shot" },
  { id: 3, label: "Nano Banana — Product Shot" },
  { id: 4, label: "Veo — Nature Timelapse" },
  { id: 5, label: "Seedream — Anime Scene" },
  { id: 6, label: "GPT Image — Abstract Art" },
];

export function Showcase() {
  return (
    <section className="relative px-4 py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold md:text-5xl">
            See What's <span className="text-gradient">Possible</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            Browse generations from our community and get inspired.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          className="mt-16 columns-1 gap-4 sm:columns-2 lg:columns-3"
        >
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className={`mb-4 break-inside-avoid ${i % 3 === 0 ? "sm:mt-0" : ""}`}
            >
              <Card hover className="p-0 overflow-hidden">
                <div className={`aspect-[${i % 2 === 0 ? "4/3" : "3/4"}] bg-gradient-to-br from-accent-500/10 to-bg-hover flex items-center justify-center`}>
                  <span className="text-4xl text-white/20">{i % 2 === 0 ? "🖼️" : "🎬"}</span>
                </div>
                <div className="p-4">
                  <p className="text-sm text-white/70">{item.label}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
