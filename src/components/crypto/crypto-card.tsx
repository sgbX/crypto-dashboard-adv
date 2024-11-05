import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'
import { CryptoData } from "@/types/crypto"
import { formatPrice } from "@/lib/crypto/formatters"

export function CryptoCard({ crypto }: { crypto: CryptoData }) {
  return (
    <Card className="group">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium">
          {crypto.symbol}
        </CardTitle>
        <div className="flex flex-col items-end">
          <span className="text-xs text-muted-foreground">
            24h Volume: {crypto.volume.toLocaleString()}
          </span>
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-2xl font-bold transition-transform duration-300 group-hover:scale-105">
          {formatPrice(crypto.price)}
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className={`text-xs flex items-center rounded-full px-2 py-1 transition-colors duration-300
            ${crypto.change >= 0 
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
            {crypto.change >= 0 ? 
              <ArrowUpIcon className="inline w-4 h-4 mr-1" /> : 
              <ArrowDownIcon className="inline w-4 h-4 mr-1" />}
            {Math.abs(crypto.change).toFixed(2)}%
          </p>
          <div className="text-xs text-muted-foreground space-x-2">
            <span className="px-2 py-1 rounded-full bg-background/50">H: {formatPrice(crypto.high24h)}</span>
            <span className="px-2 py-1 rounded-full bg-background/50">L: {formatPrice(crypto.low24h)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}