'use client'

import { useState, useEffect, Fragment } from 'react'

type CorrelationMatrix = number[][]

export function CorrelationMatrix() {
  const [correlations, setCorrelations] = useState<CorrelationMatrix>([])
  const [loading, setLoading] = useState(true)
  const assets = ['BTC', 'ETH', 'BNB', 'XRP', 'ADA']

  useEffect(() => {
    async function fetchCorrelations() {
      try {
        const response = await fetch('/api/crypto/advanced?metric=correlation')
        const data = await response.json()
        setCorrelations(data)
      } catch (error) {
        console.error('Error fetching correlations:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCorrelations()
  }, [])

  if (loading) {
    return <div className="animate-pulse h-48 bg-gray-100 dark:bg-gray-800 rounded-lg" />
  }

  const getColorForCorrelation = (value: number) => {
    const hue = ((value + 1) * 120).toString(10)
    return `hsl(${hue}, 70%, 50%)`
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="grid grid-cols-[40px_repeat(5,1fr)] gap-0.5 p-4">
        {/* Header row */}
        <div className="h-8"></div>
        {assets.map((asset, colIndex) => (
          <div 
            key={`header-${colIndex}`} 
            className="h-8 font-medium text-sm text-center"
          >
            {asset}
          </div>
        ))}

        {/* Data rows */}
        {correlations.map((row, rowIndex) => (
          <Fragment key={`row-${rowIndex}`}>
            <div className="h-8 font-medium text-sm flex items-center">
              {assets[rowIndex]}
            </div>
            {row.map((value, colIndex) => (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                className="h-8 flex items-center justify-center text-xs font-medium"
                style={{
                  backgroundColor: getColorForCorrelation(value),
                  color: value > 0 ? 'black' : 'white'
                }}
              >
                {value.toFixed(2)}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
}