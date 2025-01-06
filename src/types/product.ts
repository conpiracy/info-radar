export type ProductNiche = "gambling" | "trading" | "betting" | "social media" | "sales";

export interface Product {
  id: string;
  name: string;
  description: string;
  niche: ProductNiche;
  revenue: string;
  ranking: number;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    discord?: string;
  };
  valueProposition: string;
}