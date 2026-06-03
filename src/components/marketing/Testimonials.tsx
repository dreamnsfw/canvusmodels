"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  { name: "Alex Chen", role: "Digital Artist", content: "CanvasModels completely changed my workflow. Having all AI models in one place with a single credit system is genius.", rating: 5 },
  { name: "Sarah Johnson", role: "Content Creator", content: "I was spending $200/month across different AI subscriptions. Now I pay as I go and save 60%. The quality is incredible.", rating: 5 },
  { name: "Marcus Williams", role: "Video Producer", content: "The video generation with Kling is mind-blowing. And the fact that I can switch between image and video models instantly? Game changer.", rating: 5 },
  { name: "Emily Park", role: "Marketing Director", content: "We use CanvasModels for all our campaign visuals. The credit system makes budgeting simple, and the output quality rivals professional studios.", rating: 5 },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="relative px-4 py-32 overflow-hidden">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold md:text-5xl">
            Loved by <span className="text-gradient">Creators</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            Hear from the community using CanvasModels every day.
          </p>
        </motion.div>

        <div className="relative mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-2xl text-center"
            >
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={18} className="fill-warning text-warning" />
                ))}
              </div>
              <p className="text-lg text-white/80 leading-relaxed italic">
                &ldquo;{testimonials[current].content}&rdquo;
              </p>
              <div className="mt-8">
                <p className="font-semibold">{testimonials[current].name}</p>
                <p className="text-sm text-white/40">{testimonials[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))}
              className="rounded-full border border-white/10 p-2 text-white/40 hover:text-white hover:bg-white/5 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === current ? "w-6 bg-accent-400" : "w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))}
              className="rounded-full border border-white/10 p-2 text-white/40 hover:text-white hover:bg-white/5 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
