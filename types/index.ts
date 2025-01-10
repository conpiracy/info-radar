export interface ScrapedContent {
  revenue: number;
  members: number;
  reviews: number;
  ranking: number;
  niche: string;
  socialLinks?: string[];
  salesPageHtml?: string;
}

export interface ScrapedData {
  title: string;
  url: string;
  date: string;
  content: ScrapedContent;
}

export interface PrismaScrapedData {
  title: string;
  url: string;
  date: Date;
  content: string; // JSON string for Prisma
}

export interface ScraperOptions {
  targetUrl: string;
}
