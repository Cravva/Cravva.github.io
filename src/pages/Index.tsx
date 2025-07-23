import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import MacroTracker from "./MacroTracker"
import { UserStatsForm } from "@/components/UserStatsForm"
import { Navigation } from "@/components/Navigation"
import { UserStats } from "@/lib/nutrition"

const Index = () => {
  const [currentTab, setCurrentTab] = useState('home')
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const navigate = useNavigate()

  const handleNavigate = (page: string) => {
    if (page === 'log') {
      navigate('/log')
    } else if (page === 'history') {
      navigate('/history')
    } else if (page === 'calculator') {
      setCurrentTab('calculator')
    } else {
      setCurrentTab('home')
    }
  }

  const handleStatsCalculated = (stats: UserStats) => {
    setUserStats(stats)
    localStorage.setItem('user-stats', JSON.stringify(stats))
    setCurrentTab('home')
  }

  // Load saved stats on mount
  useEffect(() => {
    const saved = localStorage.getItem('user-stats')
    if (saved) {
      setUserStats(JSON.parse(saved))
    } else {
      setCurrentTab('calculator')
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pb-20">
      <Navigation currentPage={currentTab} onNavigate={handleNavigate} />
      
      {currentTab === 'calculator' ? (
        <div className="container mx-auto px-4 py-8">
          <UserStatsForm 
            onCalculate={handleStatsCalculated}
            initialStats={userStats || undefined}
          />
        </div>
      ) : (
        <MacroTracker />
      )}
    </div>
  )
}

export default Index;
