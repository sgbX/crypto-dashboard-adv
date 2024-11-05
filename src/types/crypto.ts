export interface CryptoData {
    symbol: string
    price: number
    change: number
    volume: number
    high24h: number
    low24h: number
  }
  
  export interface HistoricalData {
    date: string
    price: number
    volume: number
    timestamp: number
  }
  
  export interface BinanceTickerResponse {
    symbol: string
    lastPrice: string
    priceChangePercent: string
    volume: string
    highPrice: string
    lowPrice: string
  }
  
  export interface ChartTooltipProps {
    active?: boolean
    payload?: any[]
    label?: string
  }

  export interface CorrelationData {
    value: number
  }
  
  export interface RiskMetrics {
    symbol: string
    volatility: number
    sharpeRatio: number
    beta: number
    valueAtRisk: number
  }
  
  export interface LiquidityMetrics {
    symbol: string
    bidAskSpread: number
    marketDepth: number
    orderBookImbalance: number
  }
  
  export interface VolumeAnalysis {
    symbol: string
    exchange: string
    volume24h: number
    marketShare: number
  }