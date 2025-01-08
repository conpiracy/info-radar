import { scrapeData } from '../lib/scraper'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method === 'POST') {
    if (!process.env.TARGET_URL) {
      return res.status(500).json({ error: 'TARGET_URL environment variable is not set' })
    }

    try {
      const results = await scrapeData({ 
        targetUrl: process.env.TARGET_URL
      })
      return res.status(200).json({ success: true, data: results })
    } catch (error) {
      console.error('Cron job failed:', error)
      return res.status(500).json({ error: 'Failed to scrape data' })
    }
  }
  return res.status(405).json({ error: 'Method not allowed' })
}
