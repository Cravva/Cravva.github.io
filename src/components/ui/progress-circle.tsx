import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressCircleProps {
  progress: number
  size?: number
  strokeWidth?: number
  className?: string
  color?: "calories" | "protein" | "carbs" | "fats" | "primary"
  children?: React.ReactNode
}

const colorMap = {
  calories: "calories",
  protein: "protein", 
  carbs: "carbs",
  fats: "fats",
  primary: "primary"
}

export function ProgressCircle({ 
  progress, 
  size = 120, 
  strokeWidth = 8,
  className,
  color = "primary",
  children 
}: ProgressCircleProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          className="text-muted opacity-20"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          className={cn(
            "transition-all duration-500 ease-out",
            `text-${colorMap[color]}`
          )}
          style={{
            strokeDasharray,
            strokeDashoffset,
            strokeLinecap: 'round'
          }}
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  )
}