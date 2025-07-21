import { useState, useEffect } from "react"
import { Navigation } from "@/components/Navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FoodEntry, calculateDailyTotals } from "@/lib/nutrition"
import { Calendar, ChevronLeft, ChevronRight, History as HistoryIcon } from "lucide-react"
import { format, subDays, addDays, startOfDay, isSameDay } from "date-fns"

export default function History() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([])
  const [availableDates, setAvailableDates] = useState<string[]>([])

  // Load available dates from localStorage
  useEffect(() => {
    const dates: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('food-entries-')) {
        const dateStr = key.replace('food-entries-', '')
        dates.push(dateStr)
      }
    }
    setAvailableDates(dates)
  }, [])

  // Load entries for selected date
  useEffect(() => {
    const dateKey = selectedDate.toDateString()
    const stored = localStorage.getItem(`food-entries-${dateKey}`)
    if (stored) {
      const entries = JSON.parse(stored).map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      }))
      setFoodEntries(entries)
    } else {
      setFoodEntries([])
    }
  }, [selectedDate])

  const goToPreviousDay = () => {
    setSelectedDate(prev => subDays(prev, 1))
  }

  const goToNextDay = () => {
    setSelectedDate(prev => addDays(prev, 1))
  }

  const hasDataForDate = (date: Date) => {
    return availableDates.includes(date.toDateString())
  }

  const dailyTotals = calculateDailyTotals(foodEntries)
  const isToday = isSameDay(selectedDate, new Date())
  const isFuture = selectedDate > new Date()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pb-20">
      <Navigation currentPage="history" onNavigate={(page) => {
        if (page === 'home') window.location.href = '/'
        else if (page === 'calculator') window.location.href = '/?tab=calculator'
        else if (page === 'log') window.location.href = '/log'
        else if (page === 'history') window.location.href = '/history'
      }} />
      
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="text-center space-y-2">
          <HistoryIcon className="h-12 w-12 text-primary mx-auto" />
          <h1 className="text-2xl font-bold">Food History</h1>
          <p className="text-muted-foreground">Review your past meals and nutrition</p>
        </div>

        {/* Date Navigation */}
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={goToPreviousDay}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-medium">
                    {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                  </span>
                </div>
                {isToday && (
                  <Badge variant="default" className="text-xs">Today</Badge>
                )}
                {hasDataForDate(selectedDate) && !isToday && (
                  <Badge variant="outline" className="text-xs">Has Data</Badge>
                )}
                {!hasDataForDate(selectedDate) && !isFuture && (
                  <Badge variant="secondary" className="text-xs">No Data</Badge>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={goToNextDay}
                disabled={isFuture}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Daily Summary */}
        {(foodEntries.length > 0 || isToday) && (
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle>Daily Totals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-calories">{dailyTotals.calories}</div>
                  <div className="text-xs text-muted-foreground">calories</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-protein">{dailyTotals.protein}g</div>
                  <div className="text-xs text-muted-foreground">protein</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-carbs">{dailyTotals.carbs}g</div>
                  <div className="text-xs text-muted-foreground">carbs</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-fats">{dailyTotals.fats}g</div>
                  <div className="text-xs text-muted-foreground">fats</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Food Entries */}
        <div className="space-y-3">
          {foodEntries.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                <HistoryIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                {isFuture ? (
                  <p>Future date - no data available</p>
                ) : isToday ? (
                  <p>No food logged today yet. Start tracking your meals!</p>
                ) : (
                  <p>No food logged on this date.</p>
                )}
              </CardContent>
            </Card>
          ) : (
            <>
              <h3 className="font-medium text-sm text-muted-foreground">
                {foodEntries.length} meal{foodEntries.length !== 1 ? 's' : ''} logged
              </h3>
              {foodEntries
                .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
                .map((entry) => (
                <Card key={entry.id} className="animate-slide-up">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{entry.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {entry.quantity} {entry.unit}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-3 text-sm">
                          <div>
                            <div className="font-semibold text-calories">{entry.calories}</div>
                            <div className="text-muted-foreground text-xs">cal</div>
                          </div>
                          <div>
                            <div className="font-semibold text-protein">{entry.protein}g</div>
                            <div className="text-muted-foreground text-xs">protein</div>
                          </div>
                          <div>
                            <div className="font-semibold text-carbs">{entry.carbs}g</div>
                            <div className="text-muted-foreground text-xs">carbs</div>
                          </div>
                          <div>
                            <div className="font-semibold text-fats">{entry.fats}g</div>
                            <div className="text-muted-foreground text-xs">fats</div>
                          </div>
                        </div>
                        
                        <div className="text-xs text-muted-foreground mt-2">
                          {format(entry.timestamp, 'h:mm a')}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </div>

        {/* Quick Date Navigation */}
        {availableDates.length > 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {availableDates
                  .slice(-7) // Show last 7 days with data
                  .map((dateStr) => {
                    const date = new Date(dateStr)
                    const isSelected = isSameDay(date, selectedDate)
                    return (
                      <Button
                        key={dateStr}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedDate(date)}
                      >
                        {format(date, 'MMM d')}
                      </Button>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}