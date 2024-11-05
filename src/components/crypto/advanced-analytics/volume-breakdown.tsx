'use client'

import { useState, useEffect } from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { VolumeAnalysis } from '@/types/crypto'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export function VolumeBreakdown() {
  const [volumeData, setVolumeData] = useState<VolumeAnalysis[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchVolumeData() {
      try {
        const response = await fetch('/api/crypto/advanced?metric=volume')
        const data = await response.json()
        setVolumeData(data)
      } catch (error) {
        console.error('Error fetching volume data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVolumeData()
  }, [])

  if (loading) {
    return <div className="animate-pulse h-48 bg-gray-100 dark:bg-gray-800 rounded-lg" />
  }

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={volumeData}
            dataKey="volume24h"
            nameKey="exchange"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {volumeData.map((entry, index) => (
              <Cell key={entry.exchange} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}