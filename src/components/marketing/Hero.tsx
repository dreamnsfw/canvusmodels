"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 400], [0, 100]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-500/10 via-transparent to-bg-deep" />
      <div className="absolute inset-0 bg-noise" />

      <motion.div style={{ opacity, y }} className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-500/20 bg-accent-500/10 px-4 py-1.5 text-sm text-accent-300"
        >
          <Sparkles size={14} />
          Premium AI Content Generation
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-6xl font-bold leading-[0.95] tracking-tight md:text-8xl lg:text-9xl"
        >
          <span className="text-gradient">All AI Models.</span>
          <br />
          <span className="text-gradient-subtle">One Credit System.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-8 max-w-2xl text-lg text-white/50 leading-relaxed"
        >
          Generate stunning images and videos with the world's best AI models.
          Pay as you go with our simple, transparent credit system.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <Link href="/register">
            <Button size="lg" icon={<ArrowRight size={18} />}>
              Start Creating
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" size="lg">
              View Pricing
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 flex items-center justify-center gap-8 text-sm text-white/30"
        >
          {["Flux", "Kling", "Veo", "Nano Banana", "Seedream", "GPT Image"].map((model) => (
            <span key={model} className="font-medium tracking-wide">
              {model}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="h-12 w-6 rounded-full border border-white/20 flex items-start justify-center p-1.5">
          <div className="h-3 w-1 rounded-full bg-white/40 animate-pulse-glow" />
        </div>
      </motion.div>
    </section>
  );
}
