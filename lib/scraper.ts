import { FirecrawlClient } from './firecrawl';
import prisma from './db';
import { ScrapedData, ScrapedContent } from '../types';
import { Prisma } from '@prisma/client';

interface FirecrawlProduct {
  title: string;
  earnings: number;
  memberCount: number;
  reviewCount: number;
  rank: number;
  category: string;
  productUrl: string;
}

interface FirecrawlResponse {
  products: FirecrawlProduct[];
}

export async function scrapeData({ targetUrl }: { targetUrl: string }): Promise<ScrapedData[]> {
  if (!targetUrl) throw new Error('Target URL is required');

  const firecrawl = new FirecrawlClient();
  const scrapedData: ScrapedData[] = [];

  try {
    for (let page = 0; page < 4; page++) {
      const url = page === 0 ? targetUrl : `${targetUrl}/p/${page}/`;
      const data = await firecrawl.scrape(url) as FirecrawlResponse;

      for (const item of data.products) {
        const salesPageContent = await scrapeSalesPage(item.productUrl);

        scrapedData.push({
          title: item.title,
          url,
          date: new Date().toISOString(),
          content: {
            revenue: item.earnings,
            members: item.memberCount,
            reviews: item.reviewCount,
            ranking: item.rank,
            niche: item.category,
            socialLinks: salesPageContent.socialLinks,
            salesPageHtml: salesPageContent.html,
          },
        });
      }
    }

    const validData = scrapedData
      .filter(validateScrapedData)
      .map(item => ({
        ...item,
        date: new Date(item.date),
        content: item.content as Prisma.JsonValue
      }));

    // Convert scraped data to Prisma-compatible format
    const prismaData = validData.map(item => ({
      title: item.title,
      url: item.url,
      date: new Date(item.date),
      content: JSON.stringify(item.content) // Explicitly convert to JSON string
    }));

    if (prismaData.length > 0) {
      await prisma.scrapedData.createMany({
        data: prismaData,
        skipDuplicates: true
      });
    }

    return validData;
  } catch (error) {
    console.error('Scraping failed:', error);
    throw error;
  }
}

async function scrapeSalesPage(productUrl: string) {
  const firecrawl = new FirecrawlClient();
  const pageContent = await firecrawl.scrape(productUrl);
  return {
    socialLinks: extractSocialLinks(pageContent.html),
    html: pageContent.html
  };
}

function extractSocialLinks(html: string): string[] {
  const links: string[] = [];
  const regex = /<a[^>]+href="([^"]+)"[^>]*>/g;
  let match;
  
  while ((match = regex.exec(html)) !== null) {
    if (match[1].includes('twitter.com') || match[1].includes('instagram.com')) {
      links.push(match[1]);
    }
  }
  return links;
}

function validateScrapedData(item: ScrapedData): boolean {
  return !!(
    item.title &&
    item.content?.revenue &&
    item.content?.members &&
    item.content?.ranking &&
    item.content?.niche
  );
}
