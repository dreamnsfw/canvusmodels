import { Navbar } from "@/components/Navbar";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="px-4 pt-32 pb-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-5xl font-bold">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-400">
            Have questions? We&apos;d love to hear from you.
          </p>
          <div className="mt-12 rounded-xl border border-white/10 bg-white/5 p-8">
            <p className="text-gray-400">
              Email us at:{" "}
              <a href="mailto:support@canvasmodels.com" className="text-purple-400 hover:underline">
                support@canvasmodels.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
