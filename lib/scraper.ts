import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
import prisma from './db'
import type { ScrapedData, ScraperOptions } from '../types'

export async function scrapeData({ targetUrl }: ScraperOptions): Promise<ScrapedData[]> {
  if (!targetUrl) throw new Error('Target URL is required')

  try {
    const response = await fetch(targetUrl)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

    const html = await response.text()
    const $ = cheerio.load(html)
    const scrapedData: ScrapedData[] = []

    $('.product-card').each((_, el) => {
      const product = $(el).find('.product-title').text().trim()
      const revenue = $(el).find('.affiliate-earnings').text().trim()
      const members = $(el).find('.members-count').text().trim()
      const reviews = $(el).find('.reviews-count').text().trim()
      const ranking = $(el).find('.whop-ranking').text().trim()
      const niche = $(el).find('.niche').text().trim()

      if (product && revenue && members && reviews && ranking && niche) {
        scrapedData.push({
          title: product,
          url: targetUrl,
          date: new Date().toISOString(),
          content: { revenue, members, reviews, ranking, niche }
        })
      }
    })

    const validData = scrapedData.filter(item => (
      item.title && item.url && item.date &&
      item.content.revenue && item.content.members &&
      item.content.reviews && item.content.ranking && item.content.niche
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
    console.error('Scraping failed:', error)
    throw error
  }
}