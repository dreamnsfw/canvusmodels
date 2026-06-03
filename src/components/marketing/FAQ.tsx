"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  { q: "How do credits work?", a: "Buy a credit pack and use credits across any AI model. Each generation costs a fixed number of credits depending on the model and settings." },
  { q: "Do credits expire?", a: "No, credits never expire. Use them at your own pace." },
  { q: "What AI models are available?", a: "We offer Flux Pro, Nano Banana Pro, Kling 1.5, Veo 3, Seedream, and GPT Image — with more being added regularly." },
  { q: "Can I get a refund?", a: "If a generation fails due to a server error, the credits are automatically refunded to your account." },
  { q: "Is there an API?", a: "Yes, API access is available on the Ultra plan. You can generate images and videos programmatically." },
  { q: "How do I get started?", a: "Create a free account, buy a credit pack, and start generating. No subscription required." },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative px-4 py-32">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold md:text-5xl">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          className="mt-16 space-y-3"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex items-center justify-between w-full px-6 py-4 text-left transition-colors hover:bg-white/[0.02]"
              >
                <span className="text-sm font-medium text-white/80">{faq.q}</span>
                <ChevronDown
                  size={14}
                  className={cn(
                    "text-white/40 transition-transform shrink-0",
                    openIndex === i && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-4 text-sm text-white/50 leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
