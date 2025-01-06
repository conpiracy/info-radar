import { chromium } from 'playwright';
import { PrismaClient } from '@prisma/client';
import { TextServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';

const prisma = new PrismaClient();
const MODEL_NAME = "models/text-bison-001";

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(process.env.GENERATIVE_LANGUAGE_API_KEY || 'AIzaSyCBytvgze6WX9TC3xGw1bXMpqfyFtZcutg'),
});

async function recursiveScrape(baseUrl, depth = 0, maxDepth = 5) {
  if (depth >= maxDepth) return [];

  const browser = await chromium.launch();
  const page = await browser.newPage();
  const results = [];

  try {
    await page.goto(baseUrl);
    results.push({
      url: baseUrl,
      content: await page.content()
    });

    const nextUrl = baseUrl + (baseUrl.endsWith('/') ? `p/${depth + 1}/` : `/p/${depth + 1}/`);
    const nextResults = await recursiveScrape(nextUrl, depth + 1, maxDepth);
    results.push(...nextResults);

  } catch (error) {
    console.error(`Error scraping ${baseUrl}:`, error);
  } finally {
    await browser.close();
  }

  return results;
}

async function validateWithAI(scrapedData) {
  const prompt = `Validate this scraped data and format it correctly: ${JSON.stringify(scrapedData)}`;
  
  const result = await client.generateText({
    model: MODEL_NAME,
    prompt: {
      text: prompt,
    },
  });
  
  return result[0]?.candidates[0]?.output || null;
}

async function checkAgainstReference(data) {
  try {
    const response = await fetch(process.env.VALIDATION_SERVICE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    console.error('Validation service error:', error);
    return false;
  }
}

async function saveToDatabase(data) {
  return await prisma.scrapedData.create({
    data: data
  });
}

export default async function handler(req, res) {
  const { url } = req.query;
  const scrapedData = await recursiveScrape(url);

  const validatedData = await validateWithAI(scrapedData);
  const isValid = await checkAgainstReference(validatedData);

  if (isValid) {
    await saveToDatabase(validatedData);
    res.status(200).json({ message: 'Data saved successfully' });
  } else {
    res.status(400).json({ message: 'Data validation failed' });
  }
}
