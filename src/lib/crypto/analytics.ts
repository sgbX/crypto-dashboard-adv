export function calculateVolatility(prices: number[]): number {
    if (prices.length < 2) return 0
    
    const returns = prices.slice(1).map((price, i) => 
      Math.log(price / prices[i])
    )
    
    const meanReturn = returns.reduce((a, b) => a + b, 0) / returns.length
    const squaredDiffs = returns.map(r => Math.pow(r - meanReturn, 2))
    const variance = squaredDiffs.reduce((a, b) => a + b, 0) / (returns.length - 1)
    
    return Math.sqrt(variance * 252) // Annualized volatility
  }
  
  export function calculateSharpeRatio(returns: number[], riskFreeRate = 0.02): number {
    const meanReturn = returns.reduce((a, b) => a + b, 0) / returns.length
    const volatility = calculateVolatility(returns)
    return (meanReturn - riskFreeRate) / volatility
  }
  
  export function calculateCorrelation(prices1: number[], prices2: number[]): number {
    if (prices1.length !== prices2.length || prices1.length < 2) return 0
    
    const returns1 = prices1.slice(1).map((price, i) => 
      Math.log(price / prices1[i])
    )
    const returns2 = prices2.slice(1).map((price, i) => 
      Math.log(price / prices2[i])
    )
    
    const mean1 = returns1.reduce((a, b) => a + b, 0) / returns1.length
    const mean2 = returns2.reduce((a, b) => a + b, 0) / returns2.length
    
    let num = 0, den1 = 0, den2 = 0
    
    for (let i = 0; i < returns1.length; i++) {
      const diff1 = returns1[i] - mean1
      const diff2 = returns2[i] - mean2
      num += diff1 * diff2
      den1 += diff1 * diff1
      den2 += diff2 * diff2
    }
    
    return num / Math.sqrt(den1 * den2)
  }
  
  export function calculateValueAtRisk(prices: number[], confidence = 0.95): number {
    const returns = prices.slice(1).map((price, i) => 
      Math.log(price / prices[i])
    )
    returns.sort((a, b) => a - b)
    const index = Math.floor(returns.length * (1 - confidence))
    return -returns[index]
  }
  
  export function calculateBidAskSpread(bids: number[], asks: number[]): number {
    if (!bids.length || !asks.length) return 0
    const bestBid = Math.max(...bids)
    const bestAsk = Math.min(...asks)
    return (bestAsk - bestBid) / bestAsk * 100
  }