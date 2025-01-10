import { z } from "zod";

export const ContentSchema = z.object({
  revenue: z.number(),
  members: z.number(),
  reviews: z.number(),
  ranking: z.number(),
  niche: z.string()
});

export const ScrapedDataSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  date: z.string().datetime(),
  content: ContentSchema
});

export type ScrapedData = z.infer<typeof ScrapedDataSchema>;

export interface ScraperOptions {
  targetUrl: string;
}
