'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CorrelationMatrix } from "./correlation-matrix"
import { RiskMetricsGrid } from "./risk-metrics"
import { LiquidityAnalysis } from "./liquidity-analysis"
import { VolumeBreakdown } from "./volume-breakdown"

export function AdvancedAnalytics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Correlation Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <CorrelationMatrix />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Risk Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <RiskMetricsGrid />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Liquidity Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <LiquidityAnalysis />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Volume Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <VolumeBreakdown />
        </CardContent>
      </Card>
    </div>
  )
}