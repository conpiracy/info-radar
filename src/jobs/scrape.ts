import { scrapeData } from '/workspaces/info-radar/scripts/scrape-manual.ts';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export interface ScrapedData {
  // Add your data structure here
  title: string;
  url: string;
  date: string;
  content: {
    revenue: number;
    members: number;
    reviews: number;
    ranking: number;
    niche: string;
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body as { url?: string };
  
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const data = await scrapeData({ targetUrl: url });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
