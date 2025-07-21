import { Calculator, Home, Plus, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NavigationProps {
  currentPage: string
  onNavigate: (page: string) => void
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'calculator', label: 'Goals', icon: Calculator },
  { id: 'log', label: 'Add Food', icon: Plus },
  { id: 'history', label: 'History', icon: History },
]

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-elevated z-50">
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 h-14 px-3 py-2 transition-all duration-300",
                isActive && "bg-primary/10 text-primary"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 transition-all duration-300",
                isActive && "scale-110"
              )} />
              <span className="text-xs">{item.label}</span>
            </Button>
          )
        })}
      </div>
    </nav>
  )
}