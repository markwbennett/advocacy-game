import { useState, useEffect } from 'react'
import './App.css'
import Scenario from './components/Scenario'
import ScenarioBuilder from './components/ScenarioBuilder'
import scenarios from './data/scenarios'

const STORAGE_KEY = 'advocacy-game-custom-scenarios'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0)
  const [results, setResults] = useState([])
  const [gameComplete, setGameComplete] = useState(false)
  const [showBuilder, setShowBuilder] = useState(false)
  const [customScenarios, setCustomScenarios] = useState([])

  // Load custom scenarios from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setCustomScenarios(parsed)
      } catch (e) {
        console.error('Failed to parse custom scenarios:', e)
      }
    }
  }, [])

  // Combine built-in and custom scenarios
  const allScenarios = [...scenarios, ...customScenarios]

  const handleStart = () => {
    setGameStarted(true)
    setCurrentScenarioIndex(0)
    setResults([])
    setGameComplete(false)
  }

  const handleScenarioComplete = (wasCorrect) => {
    const newResults = [...results, {
      scenarioId: allScenarios[currentScenarioIndex].id,
      correct: wasCorrect
    }]
    setResults(newResults)

    if (currentScenarioIndex < allScenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1)
    } else {
      setGameComplete(true)
    }
  }

  const handleSaveScenario = (scenario) => {
    const updated = [...customScenarios, scenario]
    setCustomScenarios(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    setShowBuilder(false)
    alert('Scenario saved successfully!')
  }

  const calculateScore = () => {
    const correct = results.filter(r => r.correct).length
    const total = results.length
    return { correct, total, percentage: Math.round((correct / total) * 100) }
  }

  if (showBuilder) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Texas Criminal Trial Advocacy</h1>
          <p>Scenario Builder</p>
        </header>

        <main className="app-main">
          <ScenarioBuilder
            onClose={() => setShowBuilder(false)}
            onSave={handleSaveScenario}
          />
        </main>
      </div>
    )
  }

  if (!gameStarted) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Texas Criminal Trial Advocacy</h1>
          <p>Master Evidence and Procedure Through Practice</p>
        </header>

        <main className="app-main">
          <div className="welcome">
            <h2>Welcome, Counselor</h2>
            <p>
              You'll represent defendants in criminal cases, making real-time decisions
              on evidence and procedure under time pressure.
            </p>
            <p>
              Each scenario presents a critical moment in trial. You must decide how to
              respond - quickly and correctly. The clock is ticking.
            </p>
            <div className="welcome-actions">
              <button className="btn-primary" onClick={handleStart}>
                Start Practice
              </button>
              <button className="btn-secondary" onClick={() => setShowBuilder(true)}>
                Create Scenario
              </button>
            </div>
            {customScenarios.length > 0 && (
              <p className="scenario-count">
                {allScenarios.length} total scenarios ({customScenarios.length} custom)
              </p>
            )}
          </div>
        </main>
      </div>
    )
  }

  if (gameComplete) {
    const score = calculateScore()
    return (
      <div className="app">
        <header className="app-header">
          <h1>Texas Criminal Trial Advocacy</h1>
          <p>Master Evidence and Procedure Through Practice</p>
        </header>

        <main className="app-main">
          <div className="results-screen">
            <h2>Practice Session Complete</h2>
            <div className="score-display">
              <div className="score-big">{score.percentage}%</div>
              <div className="score-detail">
                {score.correct} correct out of {score.total} scenarios
              </div>
            </div>

            <div className="performance-message">
              {score.percentage === 100 && (
                <p>Perfect! You demonstrated excellent knowledge of Texas criminal procedure and evidence rules.</p>
              )}
              {score.percentage >= 70 && score.percentage < 100 && (
                <p>Good work! You're developing solid trial skills. Review the scenarios you missed and try again.</p>
              )}
              {score.percentage >= 50 && score.percentage < 70 && (
                <p>You're making progress. Review the rules and practice more to improve your objection skills.</p>
              )}
              {score.percentage < 50 && (
                <p>Keep practicing! Trial advocacy takes time to master. Review the Texas Rules of Evidence and try again.</p>
              )}
            </div>

            <button className="btn-primary" onClick={handleStart}>
              Practice Again
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Texas Criminal Trial Advocacy</h1>
        <p>Scenario {currentScenarioIndex + 1} of {allScenarios.length}</p>
      </header>

      <main className="app-main">
        <Scenario
          scenario={allScenarios[currentScenarioIndex]}
          onComplete={handleScenarioComplete}
        />
      </main>
    </div>
  )
}

export default App
