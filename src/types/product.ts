export type ProductNiche = "gambling" | "trading" | "betting" | "social media" | "sales";

export interface Product {
  id: string;
  name: string;
  category: 'gambling' | 'trading' | 'betting' | 'social media' | 'sales';
  dailyRevenue: number;
  valueProposition: string;
}

export type Category = Product['category'];