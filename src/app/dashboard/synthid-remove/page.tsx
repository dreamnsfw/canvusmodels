"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Shield, Upload, Download, Trash2, Link } from "lucide-react";

export default function SynthIDRemovePage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [url, setUrl] = useState("");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result as string;
      setImageData(data);
      setPreview(URL.createObjectURL(f));
      setResultUrl(null);
      setError("");
    };
    reader.readAsDataURL(f);
  };

  const handleRemove = async () => {
    setError("");
    setLoading(true);

    const payload: Record<string, unknown> = { strength: 0.15 };

    if (imageData) {
      payload.imageData = imageData;
    } else if (url.trim()) {
      payload.imageUrl = url.trim();
    } else {
      setError("Please upload an image or paste a URL");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/synthid-remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Removal failed");

      setResultUrl(data.generation.imageUrl);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImageData(null);
    setPreview(null);
    setUrl("");
    setResultUrl(null);
    setError("");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Shield size={24} className="text-accent-400" />
        <div>
          <h1 className="text-xl font-bold text-white">SynthID Remover</h1>
          <p className="text-sm text-white/50">
            Remove invisible SynthID watermark from AI-generated images
          </p>
        </div>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-white/70 mb-2 block">
              Upload an image or paste a URL
            </label>

            <div
              onClick={() => fileRef.current?.click()}
              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/10 p-8 text-white/40 transition hover:border-accent-500/40 hover:text-accent-400"
            >
              {preview ? (
                <img src={preview} alt="preview" className="max-h-48 rounded-lg object-contain" />
              ) : (
                <>
                  <Upload size={32} />
                  <span className="text-sm">Click to upload (PNG, JPEG, WebP)</span>
                </>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-white/30">OR</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="relative">
            <Link size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setImageData(null); setPreview(null); setResultUrl(null); }}
              className="w-full rounded-xl border border-white/10 bg-transparent py-2.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-accent-500/50"
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-lg bg-error/10 px-4 py-2 text-sm text-error">{error}</div>
        )}

        <div className="mt-6 flex items-center gap-3">
          <Button onClick={handleRemove} loading={loading} icon={<Shield size={16} />}>
            {loading ? "Removing SynthID..." : "Remove SynthID"}
          </Button>
          <Button variant="ghost" onClick={handleReset} icon={<Trash2 size={16} />}>
            Clear
          </Button>
        </div>
      </Card>

      {resultUrl && (
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-white/70">Result</h2>
            <a
              href={resultUrl}
              download
              className="flex items-center gap-2 text-sm text-accent-400 hover:text-accent-300"
            >
              <Download size={16} /> Download
            </a>
          </div>
          <img
            src={resultUrl}
            alt="Cleaned image"
            className="w-full rounded-lg object-contain"
          />
        </Card>
      )}
    </div>
  );
}
