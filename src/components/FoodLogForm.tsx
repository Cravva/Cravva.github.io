import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FoodEntry } from "@/lib/nutrition"
import { Plus, Apple } from "lucide-react"

interface FoodLogFormProps {
  onAddFood: (food: Omit<FoodEntry, 'id' | 'timestamp'>) => void
}

export function FoodLogForm({ onAddFood }: FoodLogFormProps) {
  const [food, setFood] = useState({
    name: '',
    quantity: 1,
    unit: 'serving',
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (food.name.trim()) {
      onAddFood(food)
      setFood({
        name: '',
        quantity: 1,
        unit: 'serving',
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0
      })
    }
  }

  const updateFood = (field: string, value: any) => {
    setFood(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Apple className="h-12 w-12 text-primary mx-auto" />
        <h1 className="text-2xl font-bold">Add Food</h1>
        <p className="text-muted-foreground">Log what you're eating today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Food Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Food Name</Label>
              <Input
                id="name"
                placeholder="e.g. Chicken breast, Rice, Apple..."
                value={food.name}
                onChange={(e) => updateFood('name', e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={food.quantity}
                  onChange={(e) => updateFood('quantity', parseFloat(e.target.value))}
                  min="0.1"
                  step="0.1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Input
                  id="unit"
                  placeholder="serving, grams, cups..."
                  value={food.unit}
                  onChange={(e) => updateFood('unit', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle>Nutrition Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="calories">Calories</Label>
              <Input
                id="calories"
                type="number"
                value={food.calories}
                onChange={(e) => updateFood('calories', parseInt(e.target.value))}
                min="0"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="protein" className="text-protein">Protein (g)</Label>
                <Input
                  id="protein"
                  type="number"
                  value={food.protein}
                  onChange={(e) => updateFood('protein', parseFloat(e.target.value))}
                  min="0"
                  step="0.1"
                  className="border-l-4 border-l-protein"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="carbs" className="text-carbs">Carbs (g)</Label>
                <Input
                  id="carbs"
                  type="number"
                  value={food.carbs}
                  onChange={(e) => updateFood('carbs', parseFloat(e.target.value))}
                  min="0"
                  step="0.1"
                  className="border-l-4 border-l-carbs"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fats" className="text-fats">Fats (g)</Label>
                <Input
                  id="fats"
                  type="number"
                  value={food.fats}
                  onChange={(e) => updateFood('fats', parseFloat(e.target.value))}
                  min="0"
                  step="0.1"
                  className="border-l-4 border-l-fats"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" variant="gradient" size="lg" className="w-full">
          Add Food
        </Button>
      </form>
    </div>
  )
}