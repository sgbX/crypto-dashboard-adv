// src/lib/crypto/websocket.ts
import { CryptoData } from '@/types/crypto'

interface BinanceWebSocketData {
  e: string      // Event type
  s: string      // Symbol
  p: string      // Price change
  P: string      // Price change percent
  w: string      // Weighted average price
  c: string      // Last price
  Q: string      // Last quantity
  v: string      // Total traded volume
  h: string      // High price
  l: string      // Low price
}

export class CryptoWebSocketService {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectTimeout: NodeJS.Timeout | null = null
  private subscribers: ((data: CryptoData[]) => void)[] = []

  constructor() {
    this.connect()
  }

  private connect() {
    try {
      // Using individual streams for better control
      const symbols = ['btcusdt', 'ethusdt', 'bnbusdt'].join('/')
      this.ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${symbols}@ticker`)
      
      this.ws.onopen = this.handleOpen.bind(this)
      this.ws.onmessage = this.handleMessage.bind(this)
      this.ws.onclose = this.handleClose.bind(this)
      this.ws.onerror = this.handleError.bind(this)
    } catch (error) {
      console.error('WebSocket connection error:', error)
      this.scheduleReconnect()
    }
  }

  private handleOpen() {
    console.log('WebSocket connected')
    this.reconnectAttempts = 0
  }

  private handleMessage(event: MessageEvent) {
    try {
      const response = JSON.parse(event.data)
      if (!response.data) return

      const data: BinanceWebSocketData = response.data
      const formattedData: CryptoData = {
        symbol: data.s,
        price: Number(data.c),
        change: Number(data.P),
        volume: Number(data.v),
        high24h: Number(data.h),
        low24h: Number(data.l)
      }
      
      this.notifySubscribers([formattedData])
    } catch (error) {
      console.error('Error parsing WebSocket message:', error)
    }
  }

  private handleClose() {
    console.log('WebSocket disconnected')
    this.scheduleReconnect()
  }

  private handleError(error: Event) {
    console.error('WebSocket error:', error)
    this.ws?.close()
  }

  private scheduleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached')
      return
    }

    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000)
    this.reconnectTimeout = setTimeout(() => {
      this.reconnectAttempts++
      this.connect()
    }, delay)
  }

  subscribe(callback: (data: CryptoData[]) => void) {
    this.subscribers.push(callback)
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback)
    }
  }

  private notifySubscribers(data: CryptoData[]) {
    this.subscribers.forEach(callback => callback(data))
  }

  disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
    }
    this.ws?.close()
  }
}

export const cryptoWebSocket = new CryptoWebSocketService()