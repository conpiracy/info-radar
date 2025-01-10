import { scrapeData, playwrightScrapeData } from '../lib/scraper.js'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

async function main() {
  try {
    if (!process.env.TARGET_URL) {
      throw new Error('TARGET_URL environment variable is not set')
    }

    console.log('Starting manual scrape...')
    let results;
    if (process.env.SCRAPER_TYPE === 'playwright') {
      results = await playwrightScrapeData({ targetUrl: process.env.TARGET_URL });
    } else {
      results = await scrapeData({ targetUrl: process.env.TARGET_URL });
    }
    console.log('Scraping completed successfully!')
    console.log(`Found ${results.length} items`)
    console.log('Results:', JSON.stringify(results, null, 2))
  } catch (error) {
    console.error('Scraping failed:', error)
    process.exit(1)
  }
}

main()