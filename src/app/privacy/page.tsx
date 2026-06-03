import { Navbar } from "@/components/Navbar";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="px-4 pt-32 pb-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-5xl font-bold">Privacy Policy</h1>
          <div className="mt-8 space-y-4 text-gray-400">
            <p>We take your privacy seriously. This policy describes how we collect and handle your data.</p>
            <h2 className="text-2xl font-bold text-white">Data We Collect</h2>
            <p>We collect your name, email, and payment information necessary to provide our services.</p>
            <h2 className="text-2xl font-bold text-white">How We Use Data</h2>
            <p>We use your data to provide and improve our services, process payments, and communicate with you.</p>
            <h2 className="text-2xl font-bold text-white">Data Protection</h2>
            <p>We implement industry-standard security measures to protect your personal information.</p>
          </div>
        </div>
      </main>
    </>
  );
}
