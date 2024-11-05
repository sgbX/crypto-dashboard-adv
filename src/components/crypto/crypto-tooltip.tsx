import { ChartTooltipProps } from '@/types/crypto'
import { formatPrice } from '@/lib/crypto/formatters'

export function CustomTooltip({ active, payload, label }: ChartTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Date
            </span>
            <span className="font-bold text-muted-foreground">
              {label}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Price
            </span>
            <span className="font-bold">
              {formatPrice(payload[0].value as number)}
            </span>
          </div>
        </div>
      </div>
    )
  }
  return null
}