import { scrapeData } from '../lib/scraper.js';  // Add .js extension
import { writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TARGET_URL = 'https://whop.com/discover/f/most_affiliate_earnings_24_hours/';

(async () => {
  console.log('Starting scrape test...');
  console.log(`Target URL: ${TARGET_URL}`);
  
  try {
    const result = await scrapeData({ targetUrl: TARGET_URL });
    
    console.log(`Successfully scraped ${result.length} items`);
    
    // Save results to a JSON file for inspection
    const outputPath = join(__dirname, 'scrape-results.json');
    writeFileSync(outputPath, JSON.stringify(result, null, 2));
    console.log(`Results saved to: ${outputPath}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Scraping failed:', error);
    process.exit(1);
  }
})();