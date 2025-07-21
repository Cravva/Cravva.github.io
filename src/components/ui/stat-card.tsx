import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  variant?: "default" | "gradient" | "outlined"
  color?: "calories" | "protein" | "carbs" | "fats" | "primary"
}

const colorVariants = {
  calories: "border-l-calories text-calories",
  protein: "border-l-protein text-protein", 
  carbs: "border-l-carbs text-carbs",
  fats: "border-l-fats text-fats",
  primary: "border-l-primary text-primary"
}

export function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  variant = "default",
  color = "primary",
  className,
  ...props
}: StatCardProps) {
  return (
    <Card 
      className={cn(
        "transition-all duration-300 hover:shadow-card hover:scale-105",
        variant === "gradient" && "bg-gradient-card",
        variant === "outlined" && "border-2",
        className
      )}
      {...props}
    >
      <CardContent className={cn(
        "p-4 border-l-4 border-l-transparent",
        colorVariants[color]
      )}>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {icon && (
            <div className="opacity-60">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}