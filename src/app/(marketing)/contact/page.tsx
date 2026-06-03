"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Message sent! We'll get back to you soon.");
    setLoading(false);
  };

  return (
    <section className="px-4 pt-32 pb-24">
      <div className="mx-auto max-w-lg space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold md:text-6xl">
            Contact <span className="text-gradient">Us</span>
          </h1>
          <p className="mt-4 text-lg text-white/50">
            Have a question? We&apos;d love to hear from you.
          </p>
        </div>
        <Card glass className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input id="name" label="Name" placeholder="John Doe" />
            <Input id="email" label="Email" type="email" placeholder="you@example.com" required />
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/70 block">Message</label>
              <textarea
                rows={4}
                className="w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 px-4 py-3 text-sm outline-none focus:border-accent-500/50 transition-colors"
                placeholder="How can we help?"
                required
              />
            </div>
            <Button type="submit" loading={loading} className="w-full">
              Send Message
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
