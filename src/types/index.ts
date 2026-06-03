export type UserRole = "user" | "admin";

export interface GenerationResult {
  id: string;
  type: "image" | "video";
  prompt: string;
  imageUrl?: string;
  videoUrl?: string;
  credits: number;
  createdAt: Date;
}

export interface TransactionResult {
  id: string;
  amount: number;
  type: "purchase" | "usage";
  description: string;
  createdAt: Date;
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  type: "image" | "video";
  creditsCost: number;
  enabled: boolean;
}
