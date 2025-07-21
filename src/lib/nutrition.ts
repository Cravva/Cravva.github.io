// BMR and TDEE calculation utilities

export interface UserStats {
  age: number
  gender: 'male' | 'female'
  weight: number // kg
  height: number // cm
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very' | 'extreme'
  goal: 'maintain' | 'cut' | 'bulk'
  macroSplit: 'balanced' | 'high-protein' | 'low-carb' | 'high-carb' | 'custom'
}

export interface MacroSplit {
  name: string
  description: string
  protein: number // percentage
  carbs: number // percentage
  fats: number // percentage
}

export const macroSplitOptions: Record<string, MacroSplit> = {
  balanced: {
    name: 'Balanced',
    description: '30% protein, 40% carbs, 30% fats',
    protein: 30,
    carbs: 40,
    fats: 30
  },
  'high-protein': {
    name: 'High Protein',
    description: '40% protein, 30% carbs, 30% fats',
    protein: 40,
    carbs: 30,
    fats: 30
  },
  'low-carb': {
    name: 'Low Carb',
    description: '35% protein, 20% carbs, 45% fats',
    protein: 35,
    carbs: 20,
    fats: 45
  },
  'high-carb': {
    name: 'High Carb',
    description: '25% protein, 50% carbs, 25% fats',
    protein: 25,
    carbs: 50,
    fats: 25
  },
  custom: {
    name: 'Custom',
    description: 'Set your own macro ratios',
    protein: 30,
    carbs: 40,
    fats: 30
  }
}

export interface MacroTargets {
  calories: number
  protein: number // grams
  carbs: number // grams
  fats: number // grams
}

export interface FoodEntry {
  id: string
  name: string
  quantity: number
  unit: string
  calories: number
  protein: number
  carbs: number
  fats: number
  timestamp: Date
}

// Mifflin-St Jeor BMR calculation
export function calculateBMR(stats: UserStats): number {
  const { age, gender, weight, height } = stats
  
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161
  }
}

// Activity multipliers
const activityMultipliers = {
  sedentary: 1.2,     // Little/no exercise
  light: 1.375,       // Light exercise 1-3 days/week
  moderate: 1.55,     // Moderate exercise 3-5 days/week
  very: 1.725,        // Hard exercise 6-7 days/week
  extreme: 1.9        // Very hard exercise, physical job
}

// Calculate TDEE (Total Daily Energy Expenditure)
export function calculateTDEE(stats: UserStats): number {
  const bmr = calculateBMR(stats)
  return bmr * activityMultipliers[stats.activityLevel]
}

// Calculate calorie target based on goal
export function calculateCalorieTarget(stats: UserStats): number {
  const tdee = calculateTDEE(stats)
  
  switch (stats.goal) {
    case 'cut':
      return Math.round(tdee * 0.8) // 20% deficit
    case 'bulk':
      return Math.round(tdee * 1.1) // 10% surplus
    case 'maintain':
    default:
      return Math.round(tdee)
  }
}

// Calculate macro targets using selected macro split
export function calculateMacroTargets(stats: UserStats): MacroTargets {
  const calories = calculateCalorieTarget(stats)
  const split = macroSplitOptions[stats.macroSplit]
  
  const proteinCalories = calories * (split.protein / 100)
  const carbCalories = calories * (split.carbs / 100)
  const fatCalories = calories * (split.fats / 100)
  
  return {
    calories,
    protein: Math.round(proteinCalories / 4), // 4 cal/g
    carbs: Math.round(carbCalories / 4), // 4 cal/g
    fats: Math.round(fatCalories / 9) // 9 cal/g
  }
}

// Calculate daily totals from food entries
export function calculateDailyTotals(entries: FoodEntry[]): MacroTargets {
  return entries.reduce(
    (totals, entry) => ({
      calories: totals.calories + entry.calories,
      protein: totals.protein + entry.protein,
      carbs: totals.carbs + entry.carbs,
      fats: totals.fats + entry.fats
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  )
}

// Calculate remaining macros
export function calculateRemaining(targets: MacroTargets, consumed: MacroTargets): MacroTargets {
  return {
    calories: Math.max(0, targets.calories - consumed.calories),
    protein: Math.max(0, targets.protein - consumed.protein),
    carbs: Math.max(0, targets.carbs - consumed.carbs),
    fats: Math.max(0, targets.fats - consumed.fats)
  }
}

// Calculate progress percentage
export function calculateProgress(target: number, consumed: number): number {
  return Math.min(100, Math.round((consumed / target) * 100))
}