import { ProgressCircle } from "@/components/ui/progress-circle"
import { StatCard } from "@/components/ui/stat-card"
import { MacroTargets, calculateProgress } from "@/lib/nutrition"
import { Flame, Zap, Wheat, Droplet } from "lucide-react"

interface MacroProgressProps {
  targets: MacroTargets
  consumed: MacroTargets
}

export function MacroProgress({ targets, consumed }: MacroProgressProps) {
  const calorieProgress = calculateProgress(targets.calories, consumed.calories)
  const proteinProgress = calculateProgress(targets.protein, consumed.protein)
  const carbProgress = calculateProgress(targets.carbs, consumed.carbs)
  const fatProgress = calculateProgress(targets.fats, consumed.fats)

  return (
    <div className="space-y-6">
      {/* Main Calorie Circle */}
      <div className="flex justify-center">
        <ProgressCircle
          progress={calorieProgress}
          size={160}
          strokeWidth={12}
          color="calories"
          className="animate-scale-in"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-calories">
              {consumed.calories}
            </div>
            <div className="text-sm text-muted-foreground">
              of {targets.calories}
            </div>
            <div className="text-xs text-muted-foreground">
              calories
            </div>
          </div>
        </ProgressCircle>
      </div>

      {/* Macro Breakdown */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          title="Protein"
          value={`${consumed.protein}g`}
          subtitle={`of ${targets.protein}g`}
          color="protein"
          icon={<Zap className="h-5 w-5" />}
          className="animate-slide-up"
        />
        <StatCard
          title="Carbs"
          value={`${consumed.carbs}g`}
          subtitle={`of ${targets.carbs}g`}
          color="carbs"
          icon={<Wheat className="h-5 w-5" />}
          className="animate-slide-up"
          style={{ animationDelay: '0.1s' }}
        />
        <StatCard
          title="Fats"
          value={`${consumed.fats}g`}
          subtitle={`of ${targets.fats}g`}
          color="fats"
          icon={<Droplet className="h-5 w-5" />}
          className="animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        />
      </div>

      {/* Remaining */}
      <div className="bg-gradient-card rounded-lg p-4 space-y-2">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Flame className="h-4 w-4 text-calories" />
          Remaining Today
        </h3>
        <div className="grid grid-cols-4 gap-2 text-sm">
          <div className="text-center">
            <div className="font-medium text-calories">
              {Math.max(0, targets.calories - consumed.calories)}
            </div>
            <div className="text-xs text-muted-foreground">cal</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-protein">
              {Math.max(0, targets.protein - consumed.protein)}g
            </div>
            <div className="text-xs text-muted-foreground">protein</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-carbs">
              {Math.max(0, targets.carbs - consumed.carbs)}g
            </div>
            <div className="text-xs text-muted-foreground">carbs</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-fats">
              {Math.max(0, targets.fats - consumed.fats)}g
            </div>
            <div className="text-xs text-muted-foreground">fats</div>
          </div>
        </div>
      </div>
    </div>
  )
}