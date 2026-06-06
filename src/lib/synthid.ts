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

async function callReplicateSDXL(imageUrl: string, strength: number): Promise<string> {
  const token = process.env.REPLICATE_API_TOKEN!;

  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version: "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      input: {
        image: imageUrl,
        strength,
        prompt: "",
        num_inference_steps: 50,
        guidance_scale: 7.5,
        scheduler: "DDIM",
        num_outputs: 1,
      },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Replicate API error: ${response.status} ${text}`);
  }

  const prediction = await response.json();
  const predictionId = prediction.id;

  const maxAttempts = 60;
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((r) => setTimeout(r, 2000));

    const statusRes = await fetch(
      `https://api.replicate.com/v1/predictions/${predictionId}`,
      { headers: { Authorization: `Token ${token}` } }
    );
    const statusData = await statusRes.json();

    if (statusData.status === "succeeded") {
      return statusData.output?.[0] ?? statusData.output ?? "";
    }
    if (statusData.status === "failed") {
      throw new Error(`Replicate prediction failed: ${statusData.error}`);
    }
  }

  throw new Error("SynthID removal timed out after 2 minutes");
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

  const outputUrl = await callReplicateSDXL(imageUrl, strength);
  return { outputUrl };
}
