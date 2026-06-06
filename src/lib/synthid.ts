const FAL_API_BASE = "https://fal.run";

interface SynthIDRemoveParams {
  imageUrl?: string;
  imageData?: string;
  strength?: number;
}

interface SynthIDRemoveResult {
  outputUrl: string;
}

async function uploadToImgbb(base64: string): Promise<string> {
  const key = process.env.IMGBB_API_KEY;
  if (!key) throw new Error("IMGBB_API_KEY not configured for image uploads");

  const cleanBase64 = base64.includes(",") ? base64.split(",")[1] : base64;

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
    method: "POST",
    body: new URLSearchParams({ image: cleanBase64 }),
  });

  if (!res.ok) throw new Error("Failed to upload image to hosting");
  const data = await res.json();
  return data.data.url;
}

async function callFalSDXL(imageUrl: string, strength: number): Promise<string> {
  const key = process.env.FAL_API_KEY;
  if (!key) throw new Error("FAL_API_KEY is not configured");

  const response = await fetch(`${FAL_API_BASE}/fal-ai/stable-diffusion-xl/img2img`, {
    method: "POST",
    headers: {
      Authorization: `Key ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_url: imageUrl,
      strength,
      prompt: "",
      num_inference_steps: 50,
      guidance_scale: 7.5,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Fal.ai API error: ${response.status} ${text}`);
  }

  const result = await response.json();
  return result.image?.url ?? result.output?.[0] ?? result.images?.[0]?.url ?? "";
}

export async function removeSynthID(params: SynthIDRemoveParams): Promise<SynthIDRemoveResult> {
  const strength = params.strength ?? 0.15;
  let imageUrl = params.imageUrl;

  if (!imageUrl && params.imageData) {
    imageUrl = await uploadToImgbb(params.imageData);
  }

  if (!imageUrl) {
    throw new Error("Either imageUrl or imageData is required");
  }

  const outputUrl = await callFalSDXL(imageUrl, strength);
  return { outputUrl };
}
