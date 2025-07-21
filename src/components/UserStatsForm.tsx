import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserStats, calculateMacroTargets, macroSplitOptions } from "@/lib/nutrition"
import { Calculator, User, Target, Activity, Zap } from "lucide-react"

interface UserStatsFormProps {
  onCalculate: (stats: UserStats) => void
  initialStats?: UserStats
}

export function UserStatsForm({ onCalculate, initialStats }: UserStatsFormProps) {
  const [stats, setStats] = useState<UserStats>(initialStats || {
    age: 25,
    gender: 'male',
    weight: 70,
    height: 175,
    activityLevel: 'moderate',
    goal: 'maintain',
    macroSplit: 'balanced'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCalculate(stats)
  }

  const updateStats = (field: keyof UserStats, value: any) => {
    setStats(prev => ({ ...prev, [field]: value }))
  }

  const targets = calculateMacroTargets(stats)

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Calculator className="h-12 w-12 text-primary mx-auto" />
        <h1 className="text-2xl font-bold">Calculate Your Goals</h1>
        <p className="text-muted-foreground">Enter your stats to get personalized macro targets</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={stats.age}
                  onChange={(e) => updateStats('age', parseInt(e.target.value))}
                  min="18"
                  max="100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={stats.gender} onValueChange={(value) => updateStats('gender', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={stats.weight}
                  onChange={(e) => updateStats('weight', parseFloat(e.target.value))}
                  min="40"
                  max="200"
                  step="0.1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={stats.height}
                  onChange={(e) => updateStats('height', parseInt(e.target.value))}
                  min="140"
                  max="220"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity & Goals */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Activity & Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="activity">Activity Level</Label>
              <Select value={stats.activityLevel} onValueChange={(value) => updateStats('activityLevel', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (Little/no exercise)</SelectItem>
                  <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                  <SelectItem value="very">Very Active (6-7 days/week)</SelectItem>
                  <SelectItem value="extreme">Extremely Active (2x/day, intense)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="goal">Goal</Label>
              <Select value={stats.goal} onValueChange={(value) => updateStats('goal', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cut">Cut (Lose Weight)</SelectItem>
                  <SelectItem value="maintain">Maintain (Stay Same)</SelectItem>
                  <SelectItem value="bulk">Bulk (Gain Weight)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Macro Split */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.15s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Macro Split
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="macroSplit">Choose Your Macro Distribution</Label>
              <Select value={stats.macroSplit} onValueChange={(value) => updateStats('macroSplit', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(macroSplitOptions).map(([key, split]) => (
                    <SelectItem key={key} value={key}>
                      {split.name} - {split.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {stats.macroSplit && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="text-sm font-medium mb-2">Current Split:</div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-protein">{macroSplitOptions[stats.macroSplit].protein}%</div>
                    <div className="text-muted-foreground">Protein</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-carbs">{macroSplitOptions[stats.macroSplit].carbs}%</div>
                    <div className="text-muted-foreground">Carbs</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-fats">{macroSplitOptions[stats.macroSplit].fats}%</div>
                    <div className="text-muted-foreground">Fats</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="animate-slide-up bg-gradient-card" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Your Targets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-calories">{targets.calories}</div>
                <div className="text-xs text-muted-foreground">calories</div>
              </div>
              <div>
                <div className="text-lg font-bold text-protein">{targets.protein}g</div>
                <div className="text-xs text-muted-foreground">protein</div>
              </div>
              <div>
                <div className="text-lg font-bold text-carbs">{targets.carbs}g</div>
                <div className="text-xs text-muted-foreground">carbs</div>
              </div>
              <div>
                <div className="text-lg font-bold text-fats">{targets.fats}g</div>
                <div className="text-xs text-muted-foreground">fats</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" variant="gradient" size="lg" className="w-full">
          Set My Goals
        </Button>
      </form>
    </div>
  )
}