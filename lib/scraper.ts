import { FirecrawlClient } from './firecrawl'
import prisma from './db'
import type { ScrapedData, ScraperOptions } from '../types'

interface FirecrawlProduct {
  title: string;
  earnings: number;
  memberCount: number;
  reviewCount: number;
  rank: number;
  category: string;
}

interface FirecrawlResponse {
  products: FirecrawlProduct[];
}

export async function scrapeData({ targetUrl }: ScraperOptions): Promise<ScrapedData[]> {
  if (!targetUrl || typeof targetUrl !== 'string') {
    throw new Error('Valid target URL is required')
  }

  try {
    const firecrawl = new FirecrawlClient()
    const data = await firecrawl.scrape(targetUrl) as FirecrawlResponse
    const scrapedData: ScrapedData[] = []

    // Transform Firecrawl response to our format
    for (const item of data.products) {
      scrapedData.push({
        title: item.title,
        url: targetUrl,
        date: new Date().toISOString(),
        content: {
          revenue: item.earnings,
          members: item.memberCount,
          reviews: item.reviewCount,
          ranking: item.rank,
          niche: item.category
        }
      })
    }

    const validData = scrapedData.filter(item => (
      item.title && 
      item.content.revenue > 0 &&
      item.content.members > 0 &&
      item.content.reviews >= 0 &&
      item.content.ranking > 0 &&
      item.content.niche
    ))

    if (validData.length > 0) {
      await prisma.scrapedData.createMany({
        data: validData.map(item => ({
          ...item,
          date: new Date(item.date),
          content: item.content
        })),
        skipDuplicates: true
      })
    }

    return validData
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Scraping failed:', errorMessage)
    throw new Error(`Scraping failed: ${errorMessage}`)
  }
}