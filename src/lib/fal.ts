const FAL_API_BASE = "https://fal.run";

async function falRequest(endpoint: string, body: any) {
  const response = await fetch(`${FAL_API_BASE}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Key ${process.env.FAL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Fal.ai API error: ${response.statusText}`);
  }
  return response.json();
}

export async function generateImage(params: {
  prompt: string;
  model?: string;
  image_size?: string;
  num_images?: number;
}) {
  return falRequest("/fal-ai/flux-pro/v1.1", params);
}

export async function generateVideo(params: {
  prompt: string;
  duration?: number;
}) {
  return falRequest("/fal-ai/kling-video/v1.5/pro/image-to-video", params);
}
