import { FirecrawlClient } from '/workspaces/info-radar/lib/firecrawl.ts'
import prisma from '../../lib/db'
import { ScrapedData, ScrapedDataSchema, ScraperOptions } from '../types'

interface FirecrawlProduct {
  title: string;
  earnings: string;
  memberCount: string;
  reviewCount: string;
  rank: string;
  category: string;
}

interface FirecrawlResponse {
  products: FirecrawlProduct[];
}

export async function scrapeData({ targetUrl }: ScraperOptions): Promise<ScrapedData[]> {
  if (!targetUrl) throw new Error('Target URL is required')

  try {
    const firecrawl = new FirecrawlClient()
    const data = await firecrawl.scrape(targetUrl) as FirecrawlResponse
    const scrapedData = data.products.map(item => ({
      title: item.title,
      url: targetUrl,
      date: new Date().toISOString(),
      content: {
        revenue: Number(item.earnings),
        members: Number(item.memberCount),
        reviews: Number(item.reviewCount),
        ranking: Number(item.rank),
        niche: item.category
      }
    }))

    const validData = scrapedData
      .map(item => {
        try {
          return ScrapedDataSchema.parse(item);
        } catch (e) {
          console.error('Validation failed for item:', e);
          return null;
        }
      })
      .filter((item): item is ScrapedData => item !== null);

    if (validData.length > 0) {
      await prisma.scrapedData.createMany({
        data: validData.map(item => ({
          ...item,
          date: new Date(item.date),
        })),
        skipDuplicates: true
      })
    }

    return validData
  } catch (error) {
    console.error('Scraping failed:', error)
    throw error
  }
}
