export interface Product {
  id: string;
  title: string;
  niche: string;
  revenue: number;
  valueProposition: string;
  url: string;
  members: number;
  reviews: number;
  ranking: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}
