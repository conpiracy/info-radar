export interface ScrapedData {
  title: string
  url: string
  date: string
  content?: any
}

export interface ScraperOptions {
  targetUrl: string
  validateData?: boolean
}
