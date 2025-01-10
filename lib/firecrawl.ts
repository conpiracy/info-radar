import fetch from 'node-fetch'

export class FirecrawlClient {
  private apiKey: string
  private apiUrl: string

  constructor() {
    if (!process.env.FIRECRAWL_API_KEY || !process.env.FIRECRAWL_API_URL) {
      throw new Error('Firecrawl configuration missing')
    }
    this.apiKey = process.env.FIRECRAWL_API_KEY
    this.apiUrl = process.env.FIRECRAWL_API_URL
  }

  async scrape(url: string) {
    const response = await fetch(`${this.apiUrl}/scrape`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    })

    if (!response.ok) {
      throw new Error(`Firecrawl API error: ${response.status}`)
    }

    return response.json()
  }
}
