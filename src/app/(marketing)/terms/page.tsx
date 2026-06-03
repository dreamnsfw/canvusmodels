import { Card } from "@/components/ui/Card";

export default function TermsPage() {
  return (
    <section className="px-4 pt-32 pb-24">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Terms of Service</h1>
        </div>
        <Card glass className="p-8 text-white/70 leading-relaxed space-y-4">
          <p>By using CanvasModels, you agree to these terms. Credits are non-refundable unless a technical error occurs. You are responsible for content you generate and must comply with all applicable laws.</p>
          <p>We reserve the right to suspend accounts that violate our policies, including generating harmful or illegal content.</p>
        </Card>
      </div>
    </section>
  );
}
