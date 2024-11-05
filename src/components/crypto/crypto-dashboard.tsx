// src/components/crypto/crypto-dashboard.tsx
'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RefreshCcw } from 'lucide-react'
import { CryptoCard } from './crypto-card'
import { CryptoChart } from './crypto-chart'
import { fetchHistoricalData } from '@/lib/crypto/api'
import { cryptoPairs } from '@/lib/crypto/formatters'
import { CryptoData, HistoricalData } from '@/types/crypto'
import { useCryptoWebSocket } from '@/hooks/useCryptoWebSocket'
import { AdvancedAnalytics } from './advanced-analytics'

export default function CryptoDashboard() {
  const [selectedPair, setSelectedPair] = useState('BTCUSDT')
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // WebSocket data
  const websocketData = useCryptoWebSocket()

  // Memoized filtered data
  const filteredData = useMemo(() => {
    return websocketData.filter(crypto => 
      cryptoPairs.includes(crypto.symbol)
    )
  }, [websocketData])

  const fetchHistorical = useCallback(async () => {
    setLoading(true)
    try {
      const klineData = await fetchHistoricalData(selectedPair)
      setHistoricalData(klineData)
    } catch (error) {
      console.error('Error fetching historical data:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }, [selectedPair])

  useEffect(() => {
    fetchHistorical()
  }, [fetchHistorical])

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Advanced Crypto Analytics Dashboard by Grishma Singh
        </h1>
        <div className="flex items-center space-x-4">
          <Select value={selectedPair} onValueChange={setSelectedPair}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select pair" />
            </SelectTrigger>
            <SelectContent>
              {cryptoPairs.map(pair => (
                <SelectItem key={pair} value={pair}>{pair}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button 
            onClick={fetchHistorical} 
            className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 
              disabled:opacity-50 transition-colors duration-300"
            disabled={loading}
          >
            <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {error && (
        <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map(crypto => (
          <CryptoCard key={crypto.symbol} crypto={crypto} />
        ))}
      </div>

      {historicalData.length > 0 && (
  <>
    <div className="mt-6">
      <CryptoChart data={historicalData} symbol={selectedPair} />
    </div>
    <AdvancedAnalytics />
  </>
)}
    </div>
  )
}