
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const endpoint = searchParams.get('endpoint')
  const params = searchParams.get('params')

  if (!endpoint) {
    return NextResponse.json({ error: 'Endpoint is required' }, { status: 400 })
  }

  try {
    const baseUrl = 'https://api.binance.com/api/v3'
    let url = `${baseUrl}/${endpoint}`
    
   
    if (params) {
      try {
     
        if (params.includes('symbols=')) {
          url += '?' + params
        } else {
          url += '?' + params
        }
      } catch (e) {
        url += '?' + params
      }
    }

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Binance API error: ${response.statusText}`)
    }

    const data = await response.json()
    
    
    if (endpoint === 'klines') {
      return NextResponse.json(data)
    }
    
 
    return NextResponse.json(data)

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data from Binance' },
      { status: 500 }
    )
  }
}