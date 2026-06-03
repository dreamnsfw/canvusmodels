import { Card } from "@/components/ui/Card";

export default function PrivacyPage() {
  return (
    <section className="px-4 pt-32 pb-24">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Privacy Policy</h1>
        </div>
        <Card glass className="p-8 text-white/70 leading-relaxed space-y-4">
          <p>We collect only the data needed to provide our service: email, name, and usage information. We do not sell your data. Generated content is stored securely and is only accessible to you.</p>
          <p>We use Stripe for payment processing. We do not store payment card information.</p>
        </Card>
      </div>
    </section>
  );
}
