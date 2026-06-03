"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

const models = [
  { name: "Flux Pro", provider: "Fal.ai", type: "Image", color: "from-blue-500/20 to-purple-500/20" },
  { name: "Nano Banana Pro", provider: "Fal.ai", type: "Image", color: "from-yellow-500/20 to-orange-500/20" },
  { name: "Kling 1.5", provider: "Fal.ai", type: "Video", color: "from-green-500/20 to-emerald-500/20" },
  { name: "Veo 3", provider: "Replicate", type: "Video", color: "from-red-500/20 to-pink-500/20" },
  { name: "Seedream", provider: "Fal.ai", type: "Image", color: "from-cyan-500/20 to-blue-500/20" },
  { name: "GPT Image", provider: "Replicate", type: "Image", color: "from-purple-500/20 to-pink-500/20" },
];

export function FeaturedModels() {
  return (
    <section className="relative px-4 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold md:text-5xl">
            Choose from <span className="text-gradient">Premium Models</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            Access the most advanced AI models for image and video generation, all in one place.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {models.map((model) => (
            <motion.div
              key={model.name}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Card hover className="p-6">
                <div className={`mb-4 h-12 w-12 rounded-xl bg-gradient-to-br ${model.color} flex items-center justify-center`}>
                  <span className="text-lg font-bold">{model.name[0]}</span>
                </div>
                <h3 className="text-lg font-semibold">{model.name}</h3>
                <div className="mt-3 flex items-center gap-2">
                  <span className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-white/50">{model.provider}</span>
                  <span className="rounded-md bg-accent-500/10 px-2 py-0.5 text-xs text-accent-300">{model.type}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
