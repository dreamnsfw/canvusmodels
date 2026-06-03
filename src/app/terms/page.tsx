import { Navbar } from "@/components/Navbar";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="px-4 pt-32 pb-24">
        <div className="mx-auto max-w-3xl prose prose-invert">
          <h1 className="text-5xl font-bold">Terms of Service</h1>
          <div className="mt-8 space-y-4 text-gray-400">
            <p>By using CanvasModels, you agree to these terms. Our platform provides AI content generation services on a credit-based system.</p>
            <h2 className="text-2xl font-bold text-white">Usage</h2>
            <p>You must not misuse our services for illegal purposes. We reserve the right to suspend accounts that violate our terms.</p>
            <h2 className="text-2xl font-bold text-white">Credits</h2>
            <p>Credits are non-refundable and non-transferable. They do not expire unless otherwise stated.</p>
            <h2 className="text-2xl font-bold text-white">Content</h2>
            <p>You retain ownership of content you generate. You are responsible for ensuring your content complies with applicable laws.</p>
          </div>
        </div>
      </main>
    </>
  );
}
