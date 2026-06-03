"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
  { feature: "Single dashboard for all models", us: true, them: false },
  { feature: "Pay-as-you-go credits", us: true, them: false },
  { feature: "5+ premium AI models", us: true, them: false },
  { feature: "Image generation", us: true, them: true },
  { feature: "Video generation", us: true, them: true },
  { feature: "One-time credit purchase", us: true, them: false },
  { feature: "Separate subscriptions per model", us: false, them: true },
  { feature: "API access", us: true, them: false },
];

export function ComparisonTable() {
  return (
    <section className="relative px-4 py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold md:text-5xl">
            Why <span className="text-gradient">CanvasModels</span>?
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            Stop juggling 5 different AI platforms. One account, one credit balance, all models.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 overflow-hidden rounded-2xl border border-white/[0.08]"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                <th className="px-6 py-4 text-left text-sm font-semibold text-white/70">Feature</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-accent-300">CanvasModels</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-white/40">Other Platforms</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.feature} className={i < rows.length - 1 ? "border-b border-white/[0.04]" : ""}>
                  <td className="px-6 py-4 text-sm text-white/70">{row.feature}</td>
                  <td className="px-6 py-4 text-center">
                    {row.us ? (
                      <Check size={18} className="inline text-success" />
                    ) : (
                      <X size={18} className="inline text-white/20" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {row.them ? (
                      <Check size={18} className="inline text-white/20" />
                    ) : (
                      <X size={18} className="inline text-error/60" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
