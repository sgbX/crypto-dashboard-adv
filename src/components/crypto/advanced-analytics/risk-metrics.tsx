'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RiskMetrics } from '@/types/crypto'

export function RiskMetricsGrid() {
  const [metrics, setMetrics] = useState<RiskMetrics[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRiskMetrics() {
      try {
        const response = await fetch('/api/crypto/advanced?metric=risk')
        const data = await response.json()
        setMetrics(data)
      } catch (error) {
        console.error('Error fetching risk metrics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRiskMetrics()
  }, [])

  if (loading) {
    return <div className="animate-pulse h-48 bg-gray-100 dark:bg-gray-800 rounded-lg" />
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Asset</TableHead>
          <TableHead>Volatility</TableHead>
          <TableHead>Sharpe Ratio</TableHead>
          <TableHead>Beta</TableHead>
          <TableHead>VaR (95%)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {metrics.map((metric) => (
          <TableRow key={metric.symbol}>
            <TableCell>{metric.symbol}</TableCell>
            <TableCell>{(metric.volatility * 100).toFixed(2)}%</TableCell>
            <TableCell>{metric.sharpeRatio.toFixed(2)}</TableCell>
            <TableCell>{metric.beta.toFixed(2)}</TableCell>
            <TableCell>{(metric.valueAtRisk * 100).toFixed(2)}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}