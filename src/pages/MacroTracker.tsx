import { useState, useEffect } from "react"
import { MacroProgress } from "@/components/MacroProgress"
import { Navigation } from "@/components/Navigation"
import { UserStatsForm } from "@/components/UserStatsForm"
import { FoodLogForm } from "@/components/FoodLogForm"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserStats, MacroTargets, FoodEntry, calculateMacroTargets, calculateDailyTotals, calculateRemaining } from "@/lib/nutrition"
import { Clock, Trash2, Target } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function MacroTracker() {
  const [currentPage, setCurrentPage] = useState('home')
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [macroTargets, setMacroTargets] = useState<MacroTargets | null>(null)
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([])
  const { toast } = useToast()

  // Load data from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('macroTracker_userStats')
    const savedEntries = localStorage.getItem('macroTracker_foodEntries')
    
    if (savedStats) {
      const stats = JSON.parse(savedStats)
      setUserStats(stats)
      setMacroTargets(calculateMacroTargets(stats))
    }
    
    if (savedEntries) {
      const entries = JSON.parse(savedEntries).map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      }))
      setFoodEntries(entries)
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (userStats) {
      localStorage.setItem('macroTracker_userStats', JSON.stringify(userStats))
    }
  }, [userStats])

  useEffect(() => {
    localStorage.setItem('macroTracker_foodEntries', JSON.stringify(foodEntries))
  }, [foodEntries])

  const handleCalculateGoals = (stats: UserStats) => {
    setUserStats(stats)
    setMacroTargets(calculateMacroTargets(stats))
    setCurrentPage('home')
    toast({
      title: "Goals Updated!",
      description: "Your macro targets have been calculated.",
    })
  }

  const handleAddFood = (food: Omit<FoodEntry, 'id' | 'timestamp'>) => {
    const newEntry: FoodEntry = {
      ...food,
      id: Date.now().toString(),
      timestamp: new Date()
    }
    setFoodEntries(prev => [newEntry, ...prev])
    setCurrentPage('home')
    toast({
      title: "Food Added!",
      description: `${food.name} has been logged.`,
    })
  }

  const handleDeleteFood = (id: string) => {
    setFoodEntries(prev => prev.filter(entry => entry.id !== id))
    toast({
      title: "Food Removed",
      description: "Food entry has been deleted.",
    })
  }

  const getTodaysEntries = () => {
    const today = new Date().toDateString()
    return foodEntries.filter(entry => entry.timestamp.toDateString() === today)
  }

  const consumed = calculateDailyTotals(getTodaysEntries())
  const todaysEntries = getTodaysEntries()

  const renderHomePage = () => {
    if (!userStats || !macroTargets) {
      return (
        <div className="space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Welcome to Macro Tracker</h1>
            <p className="text-muted-foreground">Start by calculating your daily macro goals</p>
          </div>
          <Button variant="gradient" size="lg" onClick={() => setCurrentPage('calculator')}>
            Calculate My Goals
          </Button>
        </div>
      )
    }

    const remaining = calculateRemaining(macroTargets, consumed)
    
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <Target className="h-12 w-12 text-primary mx-auto" />
          <h1 className="text-2xl font-bold">Daily Progress</h1>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        <MacroProgress targets={macroTargets} consumed={consumed} />

        {/* Consumed vs Remaining */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Consumed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-calories">Calories</span>
                <span className="font-semibold text-calories">{consumed.calories}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-protein">Protein</span>
                <span className="font-semibold text-protein">{consumed.protein}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-carbs">Carbs</span>
                <span className="font-semibold text-carbs">{consumed.carbs}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-fats">Fats</span>
                <span className="font-semibold text-fats">{consumed.fats}g</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Remaining</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-calories">Calories</span>
                <span className="font-semibold text-calories">{remaining.calories}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-protein">Protein</span>
                <span className="font-semibold text-protein">{remaining.protein}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-carbs">Carbs</span>
                <span className="font-semibold text-carbs">{remaining.carbs}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-fats">Fats</span>
                <span className="font-semibold text-fats">{remaining.fats}g</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2">
          <Button variant="gradient" size="lg" className="flex-1" onClick={() => setCurrentPage('log')}>
            Add Food
          </Button>
          <Button variant="outline" onClick={() => setCurrentPage('calculator')}>
            Edit Goals
          </Button>
        </div>

        {todaysEntries.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Today's Food Log
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {todaysEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium">{entry.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {entry.quantity} {entry.unit} • {entry.calories} cal
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteFood(entry.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  const renderHistoryPage = () => {
    const groupedEntries = foodEntries.reduce((groups, entry) => {
      const date = entry.timestamp.toDateString()
      if (!groups[date]) groups[date] = []
      groups[date].push(entry)
      return groups
    }, {} as Record<string, FoodEntry[]>)

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Food History</h1>
          <p className="text-muted-foreground">Your past food entries</p>
        </div>

        {Object.keys(groupedEntries).length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No food entries yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedEntries)
              .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
              .map(([date, entries]) => {
                const dayTotals = calculateDailyTotals(entries)
                return (
                  <Card key={date}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {new Date(date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </CardTitle>
                      <div className="grid grid-cols-4 gap-2 text-sm">
                        <div className="text-center">
                          <div className="font-medium text-calories">{dayTotals.calories}</div>
                          <div className="text-xs text-muted-foreground">cal</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-protein">{dayTotals.protein}g</div>
                          <div className="text-xs text-muted-foreground">protein</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-carbs">{dayTotals.carbs}g</div>
                          <div className="text-xs text-muted-foreground">carbs</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-fats">{dayTotals.fats}g</div>
                          <div className="text-xs text-muted-foreground">fats</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {entries.map((entry) => (
                        <div key={entry.id} className="text-sm p-2 bg-muted/30 rounded">
                          <div className="font-medium">{entry.name}</div>
                          <div className="text-muted-foreground">
                            {entry.quantity} {entry.unit} • {entry.calories} cal
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-background pb-20">
      <div className="container max-w-md mx-auto px-4 py-6">
        {currentPage === 'home' && renderHomePage()}
        {currentPage === 'calculator' && (
          <UserStatsForm 
            onCalculate={handleCalculateGoals}
            initialStats={userStats || undefined}
          />
        )}
        {currentPage === 'log' && <FoodLogForm onAddFood={handleAddFood} />}
        {currentPage === 'history' && renderHistoryPage()}
      </div>
      
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  )
}