export async function generateWithReplicate(model: string, input: any) {
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ version: model, input }),
  });
  if (!response.ok) {
    throw new Error(`Replicate API error: ${response.statusText}`);
  }
  return response.json();
}

export async function getPrediction(predictionId: string) {
  const response = await fetch(
    `https://api.replicate.com/v1/predictions/${predictionId}`,
    {
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      },
    }
  );
  return response.json();
}
