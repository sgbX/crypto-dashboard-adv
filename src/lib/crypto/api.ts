import { BinanceTickerResponse, CryptoData, HistoricalData } from '@/types/crypto'

export async function fetchTickerData(cryptoPairs: string[]): Promise<CryptoData[]> {
  const tickerUrl = `/api/crypto?endpoint=ticker/24hr&params=symbols=${encodeURIComponent(JSON.stringify(cryptoPairs))}`
  const response = await fetch(tickerUrl)
  
  if (!response.ok) {
    throw new Error(`Failed to fetch ticker data: ${response.statusText}`)
  }
  
  const tickerData: BinanceTickerResponse[] = await response.json()

  if (!Array.isArray(tickerData)) {
    throw new Error('Invalid ticker data format')
  }

  return tickerData.map((ticker) => ({
    symbol: ticker.symbol,
    price: Number(ticker.lastPrice),
    change: Number(ticker.priceChangePercent),
    volume: Number(ticker.volume),
    high24h: Number(ticker.highPrice),
    low24h: Number(ticker.lowPrice)
  }))
}

export async function fetchHistoricalData(selectedPair: string): Promise<HistoricalData[]> {
  const klineUrl = `/api/crypto?endpoint=klines&params=${encodeURIComponent(`symbol=${selectedPair}&interval=1d&limit=7`)}`
  const response = await fetch(klineUrl)
  
  if (!response.ok) {
    throw new Error(`Failed to fetch kline data: ${response.statusText}`)
  }
  
  const klineData = await response.json()

  if (!Array.isArray(klineData)) {
    throw new Error('Invalid kline data format')
  }

  return klineData
    .map((kline: any[]) => {
      if (!Array.isArray(kline) || kline.length < 6) {
        throw new Error('Invalid kline data structure')
      }
      return {
        timestamp: Number(kline[0]),
        date: new Date(Number(kline[0])).toLocaleDateString(),
        price: Number(kline[4]), // Closing price
        volume: Number(kline[5])
      }
    })
    .sort((a, b) => a.timestamp - b.timestamp)
}