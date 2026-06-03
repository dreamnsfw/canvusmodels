import { generateImage as falImage, generateVideo as falVideo } from "../fal";
import { generateWithReplicate } from "../replicate";

export interface AIProvider {
  name: string;
  generateImage(params: {
    prompt: string;
    model?: string;
  }): Promise<{ url: string }[]>;
  generateVideo(params: {
    prompt: string;
  }): Promise<{ url: string }>;
}

class FalProvider implements AIProvider {
  name = "fal.ai";

  async generateImage(params: { prompt: string; model?: string }) {
    const result = await falImage(params);
    return result.images?.map((img: any) => ({ url: img.url })) ?? [];
  }

  async generateVideo(params: { prompt: string }) {
    const result = await falVideo(params);
    return { url: result.video?.url ?? result.output };
  }
}

class ReplicateProvider implements AIProvider {
  name = "replicate";

  async generateImage(params: { prompt: string; model?: string }) {
    const result = await generateWithReplicate(params.model ?? "", {
      prompt: params.prompt,
    });
    return [{ url: result.output?.[0] ?? "" }];
  }

  async generateVideo(params: { prompt: string }) {
    const result = await generateWithReplicate("", {
      prompt: params.prompt,
    });
    return { url: result.output ?? "" };
  }
}

export function getProvider(name: string): AIProvider {
  switch (name) {
    case "fal":
      return new FalProvider();
    case "replicate":
      return new ReplicateProvider();
    default:
      return new FalProvider();
  }
}
