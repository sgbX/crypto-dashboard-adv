'use client'

import { useState, useEffect } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { LiquidityMetrics } from '@/types/crypto'

export function LiquidityAnalysis() {
  const [metrics, setMetrics] = useState<LiquidityMetrics[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLiquidityMetrics() {
      try {
        const response = await fetch('/api/crypto/advanced?metric=liquidity')
        const data = await response.json()
        setMetrics(data)
      } catch (error) {
        console.error('Error fetching liquidity metrics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLiquidityMetrics()
  }, [])

  if (loading) {
    return <div className="animate-pulse h-48 bg-gray-100 dark:bg-gray-800 rounded-lg" />
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border dark:border-gray-700 rounded-lg shadow-lg">
          <p className="font-medium mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {Number(entry.value).toLocaleString()}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-[300px] w-full p-4 bg-white dark:bg-gray-800 rounded-lg">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={metrics}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(156, 163, 175, 0.2)" 
          />
          <XAxis 
            dataKey="symbol" 
            tick={{ fill: 'currentColor' }}
            axisLine={{ stroke: 'rgba(156, 163, 175, 0.2)' }}
          />
          <YAxis 
            tick={{ fill: 'currentColor' }}
            axisLine={{ stroke: 'rgba(156, 163, 175, 0.2)' }}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="bidAskSpread" 
            fill="rgb(247, 147, 26)" // Bitcoin orange
            radius={[4, 4, 0, 0]}
            name="Bid-Ask Spread" 
          />
          <Bar 
            dataKey="marketDepth" 
            fill="rgb(98, 126, 234)" // Ethereum blue
            radius={[4, 4, 0, 0]}
            name="Market Depth" 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}