import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Store } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FoodProduct {
  id: string
  name: string
  brand: string | null
  barcode: string | null
  calories_per_100g: number
  protein_per_100g: number
  carbs_per_100g: number
  fat_per_100g: number
  category: string | null
  store: string | null
}

interface FoodSearchProps {
  onSelectFood: (food: {
    name: string
    quantity: number
    unit: string
    calories: number
    protein: number
    carbs: number
    fats: number
  }) => void
  onClose: () => void
  initialBarcode?: string
}

export function FoodSearch({ onSelectFood, onClose, initialBarcode }: FoodSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [foods, setFoods] = useState<FoodProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedFood, setSelectedFood] = useState<FoodProduct | null>(null)
  const [quantity, setQuantity] = useState(100)
  const { toast } = useToast()

  // Search for food by barcode if provided
  useEffect(() => {
    if (initialBarcode) {
      searchByBarcode(initialBarcode)
    }
  }, [initialBarcode])

  const searchByBarcode = async (barcode: string) => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('food_products')
        .select('*')
        .eq('barcode', barcode)
        .limit(1)

      if (error) throw error

      if (data && data.length > 0) {
        setFoods(data)
        setSelectedFood(data[0])
        toast({
          title: "Product found!",
          description: `Found ${data[0].name} in our database.`
        })
      } else {
        toast({
          title: "Product not found",
          description: "This barcode is not in our database yet. Try searching by name.",
          variant: "destructive"
        })
        setFoods([])
      }
    } catch (error) {
      console.error('Error searching by barcode:', error)
      toast({
        title: "Search error",
        description: "Could not search for product. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const searchFoods = async (term: string) => {
    if (!term.trim()) {
      setFoods([])
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('food_products')
        .select('*')
        .or(`name.ilike.%${term}%,brand.ilike.%${term}%`)
        .limit(20)

      if (error) throw error
      setFoods(data || [])
    } catch (error) {
      console.error('Error searching foods:', error)
      toast({
        title: "Search error",
        description: "Could not search for foods. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    searchFoods(value)
  }

  const calculateNutrition = (food: FoodProduct, grams: number) => {
    const factor = grams / 100
    return {
      name: food.name,
      quantity: grams,
      unit: "g",
      calories: Math.round(food.calories_per_100g * factor),
      protein: Math.round(food.protein_per_100g * factor * 10) / 10,
      carbs: Math.round(food.carbs_per_100g * factor * 10) / 10,
      fats: Math.round(food.fat_per_100g * factor * 10) / 10
    }
  }

  const handleAddFood = () => {
    if (selectedFood) {
      const nutrition = calculateNutrition(selectedFood, quantity)
      onSelectFood(nutrition)
      toast({
        title: "Food added!",
        description: `${nutrition.name} (${nutrition.quantity}g) added to your log.`
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Food Database
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for food products..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-4 text-muted-foreground">
              Searching...
            </div>
          )}

          {/* Search Results */}
          {!loading && foods.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-muted-foreground">
                Found {foods.length} products
              </h3>
              {foods.map((food) => (
                <Card 
                  key={food.id} 
                  className={`cursor-pointer transition-colors ${
                    selectedFood?.id === food.id ? 'ring-2 ring-primary' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedFood(food)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{food.name}</h4>
                          {food.store && (
                            <Badge variant="outline" className="text-xs">
                              <Store className="h-3 w-3 mr-1" />
                              {food.store}
                            </Badge>
                          )}
                        </div>
                        {food.brand && (
                          <p className="text-sm text-muted-foreground mb-2">{food.brand}</p>
                        )}
                        
                        <div className="grid grid-cols-4 gap-2 text-xs">
                          <div>
                            <span className="font-medium text-calories">{food.calories_per_100g}</span>
                            <span className="text-muted-foreground"> cal</span>
                          </div>
                          <div>
                            <span className="font-medium text-protein">{food.protein_per_100g}g</span>
                            <span className="text-muted-foreground"> protein</span>
                          </div>
                          <div>
                            <span className="font-medium text-carbs">{food.carbs_per_100g}g</span>
                            <span className="text-muted-foreground"> carbs</span>
                          </div>
                          <div>
                            <span className="font-medium text-fats">{food.fat_per_100g}g</span>
                            <span className="text-muted-foreground"> fats</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && searchTerm && foods.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No products found for "{searchTerm}"</p>
              <p className="text-sm">Try a different search term or add the food manually.</p>
            </div>
          )}

          {/* Selected Food Details */}
          {selectedFood && (
            <Card className="bg-muted/20">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Add to your log</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Quantity (grams)</label>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      min="1"
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 text-sm bg-background rounded-lg p-3">
                    <div className="text-center">
                      <div className="font-medium text-calories">
                        {Math.round(selectedFood.calories_per_100g * quantity / 100)}
                      </div>
                      <div className="text-xs text-muted-foreground">calories</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-protein">
                        {Math.round(selectedFood.protein_per_100g * quantity / 100 * 10) / 10}g
                      </div>
                      <div className="text-xs text-muted-foreground">protein</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-carbs">
                        {Math.round(selectedFood.carbs_per_100g * quantity / 100 * 10) / 10}g
                      </div>
                      <div className="text-xs text-muted-foreground">carbs</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-fats">
                        {Math.round(selectedFood.fat_per_100g * quantity / 100 * 10) / 10}g
                      </div>
                      <div className="text-xs text-muted-foreground">fats</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>

        {/* Actions */}
        <div className="border-t p-4 flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button 
            onClick={handleAddFood} 
            disabled={!selectedFood}
            className="flex-1"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Food
          </Button>
        </div>
      </Card>
    </div>
  )
}