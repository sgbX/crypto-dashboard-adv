import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { HistoricalData } from "@/types/crypto"
import { formatPrice } from "@/lib/crypto/formatters"
import { CustomTooltip } from "./crypto-tooltip"

interface CryptoChartProps {
  data: HistoricalData[]
  symbol: string
}

export function CryptoChart({ data, symbol }: CryptoChartProps) {
  return (
    <Card className="md:col-span-2 lg:col-span-3">
      <CardHeader>
        <CardTitle>{symbol} Price (7 Days)</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis 
              domain={['auto', 'auto']}
              tickFormatter={(value) => formatPrice(value)}
            />
            <Tooltip content={CustomTooltip} />
            <Line
              type="monotone"
              dataKey="price"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}