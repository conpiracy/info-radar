import { chromium, Browser, Page } from 'playwright';
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
const API_KEY = process.env.GENERATIVE_LANGUAGE_API_KEY || '';

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { url } = req.body as { url?: string };
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Launch browser with specific configuration for Vercel environment
    const browser = await chromium.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true
    });

    try {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle' });
      const content = await page.content();
      
      return res.status(200).json({ success: true, data: { url, content } });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Browser operation failed:', errorMessage);
      return res.status(500).json({ error: 'Failed to scrape content' });
    } finally {
      await browser.close();
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Handler error:', errorMessage);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
