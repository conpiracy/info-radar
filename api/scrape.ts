import { chromium } from 'playwright';
import { PrismaClient } from '@prisma/client';
import { TextServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';
import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ScrapedContent {
  url: string;
  content: string;
}

const prisma = new PrismaClient();
const MODEL_NAME = "models/text-bison-001";
const API_KEY = process.env.GENERATIVE_LANGUAGE_API_KEY;

if (!API_KEY) {
  throw new Error('GENERATIVE_LANGUAGE_API_KEY is not set');
}

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

async function recursiveScrape(baseUrl: string, depth = 0, maxDepth = 5): Promise<ScrapedContent[]> {
  if (depth >= maxDepth) return [];

  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true
  });
  const results: ScrapedContent[] = [];

  try {
    const page = await browser.newPage();
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    results.push({
      url: baseUrl,
      content: await page.content()
    });
  } catch (error) {
    console.error(`Error scraping ${baseUrl}:`, error);
  } finally {
    await browser.close();
  }

  return results;
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
    const scrapedData = await recursiveScrape(url);
    await prisma.scrapedData.create({
      data: {
        url,
        content: JSON.stringify(scrapedData)
      }
    });
    
    return res.status(200).json({ success: true, data: scrapedData });
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
