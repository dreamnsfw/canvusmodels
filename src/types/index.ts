export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: string;
  credits: number;
  createdAt: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: string;
  description: string | null;
  stripeId: string | null;
  createdAt: Date;
}

export interface Generation {
  id: string;
  userId: string;
  type: string;
  prompt: string;
  modelId: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
  status: string;
  credits: number;
  createdAt: Date;
  model?: AIModel;
}

export interface AIModel {
  id: string;
  name: string;
  slug: string;
  provider: string;
  type: string;
  description: string | null;
  creditsCost: number;
  enabled: boolean;
  order: number;
}

export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  popular: boolean;
}

export interface ApiKey {
  id: string;
  userId: string;
  name: string;
  key: string;
  lastUsed: Date | null;
  createdAt: Date;
}

export interface WorkspaceState {
  mode: string;
  model: AIModel | null;
  prompt: string;
  negativePrompt: string;
  size: string;
  count: number;
  stylePreset: string;
}

export interface GenerationResult {
  id: string;
  url: string;
  type: string;
  prompt: string;
}

export type PageProps<T = {}> = {
  params: Promise<T>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
