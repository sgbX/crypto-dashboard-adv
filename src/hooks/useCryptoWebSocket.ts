// src/hooks/useCryptoWebSocket.ts
import { useState, useEffect } from 'react'
import { CryptoData } from '@/types/crypto'
import { cryptoWebSocket } from '@/lib/crypto/websocket'

export function useCryptoWebSocket() {
  const [data, setData] = useState<CryptoData[]>([])

  useEffect(() => {
    const unsubscribe = cryptoWebSocket.subscribe((newData) => {
      setData(prevData => {
        // Update existing data or add new data
        const updatedData = [...prevData]
        newData.forEach(item => {
          const index = updatedData.findIndex(d => d.symbol === item.symbol)
          if (index !== -1) {
            updatedData[index] = item
          } else {
            updatedData.push(item)
          }
        })
        return updatedData
      })
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return data
}