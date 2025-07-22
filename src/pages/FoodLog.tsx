import { useState, useEffect } from "react"
import { Navigation } from "@/components/Navigation"
import { FoodLogForm } from "@/components/FoodLogForm"
import { FoodSearch } from "@/components/FoodSearch"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FoodEntry, calculateDailyTotals } from "@/lib/nutrition"
import { Utensils, Trash2, QrCode, Plus, Search } from "lucide-react"
import { BarcodeScanner } from "@capacitor-community/barcode-scanner"
import { useToast } from "@/hooks/use-toast"

export default function FoodLog() {
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([])
  const [showForm, setShowForm] = useState(false)
  const [showFoodSearch, setShowFoodSearch] = useState(false)
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null)
  const { toast } = useToast()

  // Load entries from localStorage on mount
  useEffect(() => {
    const today = new Date().toDateString()
    const stored = localStorage.getItem(`food-entries-${today}`)
    if (stored) {
      setFoodEntries(JSON.parse(stored))
    }
  }, [])

  // Save entries to localStorage whenever they change
  useEffect(() => {
    const today = new Date().toDateString()
    localStorage.setItem(`food-entries-${today}`, JSON.stringify(foodEntries))
  }, [foodEntries])

  const handleAddFood = (entry: Omit<FoodEntry, 'id' | 'timestamp'>) => {
    const newEntry: FoodEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: new Date()
    }
    setFoodEntries(prev => [...prev, newEntry])
    setShowForm(false)
    setShowFoodSearch(false)
    setScannedBarcode(null)
    toast({
      title: "Food added!",
      description: `${entry.name} has been logged to your daily intake.`
    })
  }

  const handleDeleteEntry = (id: string) => {
    setFoodEntries(prev => prev.filter(entry => entry.id !== id))
    toast({
      title: "Food removed",
      description: "Entry has been deleted from your log."
    })
  }

  const handleScanBarcode = async () => {
    try {
      // Check permission
      const status = await BarcodeScanner.checkPermission({ force: true })
      
      if (status.granted) {
        // Hide background
        document.body.classList.add('scanner-active')
        
        const result = await BarcodeScanner.startScan()
        
        // Show background
        document.body.classList.remove('scanner-active')
        
        if (result.hasContent) {
          setScannedBarcode(result.content)
          setShowFoodSearch(true)
          toast({
            title: "Barcode scanned!",
            description: `Searching for product: ${result.content}`
          })
        }
      } else {
        toast({
          title: "Camera permission required",
          description: "Please allow camera access to scan barcodes.",
          variant: "destructive"
        })
      }
    } catch (error) {
      document.body.classList.remove('scanner-active')
      toast({
        title: "Scanner error",
        description: "Could not start barcode scanner. Make sure you're on a mobile device.",
        variant: "destructive"
      })
    }
  }

  const dailyTotals = calculateDailyTotals(foodEntries)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pb-20">
      <Navigation currentPage="log" onNavigate={(page) => {
        if (page === 'home') window.location.href = '/'
        else if (page === 'calculator') window.location.href = '/?tab=calculator'
        else if (page === 'log') window.location.href = '/log'
        else if (page === 'history') window.location.href = '/history'
      }} />
      
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="text-center space-y-2">
          <Utensils className="h-12 w-12 text-primary mx-auto" />
          <h1 className="text-2xl font-bold">Today's Food Log</h1>
          <p className="text-muted-foreground">Track what you eat throughout the day</p>
        </div>

        {/* Daily Summary */}
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

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <Button 
            onClick={() => setShowForm(true)} 
            variant="gradient" 
            className="col-span-1"
          >
            <Plus className="h-4 w-4 mr-2" />
            Manual
          </Button>
          <Button 
            onClick={() => setShowFoodSearch(true)} 
            variant="outline"
            className="col-span-1"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button 
            onClick={handleScanBarcode} 
            variant="outline"
            className="col-span-1"
          >
            <QrCode className="h-4 w-4 mr-2" />
            Scan
          </Button>
        </div>

        {/* Food Entries */}
        <div className="space-y-3">
          {foodEntries.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                <Utensils className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No food logged today. Start by adding your first meal!</p>
              </CardContent>
            </Card>
          ) : (
            foodEntries.map((entry) => (
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
                        {entry.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Food Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <FoodLogForm 
                onSubmit={handleAddFood}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        )}

        {/* Food Search Modal */}
        {showFoodSearch && (
          <FoodSearch
            onSelectFood={handleAddFood}
            onClose={() => {
              setShowFoodSearch(false)
              setScannedBarcode(null)
            }}
            initialBarcode={scannedBarcode || undefined}
          />
        )}
      </div>
    </div>
  )
}