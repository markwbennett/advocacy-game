import { useState, useEffect } from 'react'
import './Scenario.css'

function Scenario({ scenario, onComplete }) {
  const [timeRemaining, setTimeRemaining] = useState(scenario.timerSeconds)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [timerActive, setTimerActive] = useState(true)

  useEffect(() => {
    if (!timerActive || timeRemaining <= 0) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setTimerActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timerActive, timeRemaining])

  const handleOptionSelect = (option) => {
    if (showResult) return

    setSelectedOption(option)
    setTimerActive(false)
    setShowResult(true)
  }

  const handleContinue = () => {
    onComplete(selectedOption?.correct || false)
  }

  const getTimerColor = () => {
    if (timeRemaining > 10) return '#2c5aa0'
    if (timeRemaining > 5) return '#ff9800'
    return '#d32f2f'
  }

  return (
    <div className="scenario">
      {/* Timer */}
      <div className="timer" style={{ backgroundColor: getTimerColor() }}>
        <div className="timer-label">Time Remaining</div>
        <div className="timer-value">{timeRemaining}s</div>
      </div>

      {/* Case Context */}
      <div className="case-context">
        <h2>Case: State v. {scenario.context.defendant}</h2>
        <div className="charge-badge">{scenario.context.charge}</div>
        <p className="background">{scenario.context.background}</p>
      </div>

      {/* Current Situation */}
      <div className="situation">
        <h3>What's Happening Now</h3>
        <div className="phase-indicator">
          {scenario.situation.phase.replace('_', ' ').toUpperCase()} - {scenario.situation.moment.replace('_', ' ')}
        </div>
        <p className="situation-description">{scenario.situation.description}</p>
      </div>

      {/* Options */}
      <div className="options">
        <h3>What do you do?</h3>
        <div className="options-grid">
          {scenario.options.map((option) => (
            <button
              key={option.id}
              className={`option-btn ${selectedOption?.id === option.id ? 'selected' : ''} ${
                showResult && option.correct ? 'correct' : ''
              } ${showResult && selectedOption?.id === option.id && !option.correct ? 'incorrect' : ''}`}
              onClick={() => handleOptionSelect(option)}
              disabled={showResult || timeRemaining === 0}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>

      {/* Result/Explanation */}
      {showResult && selectedOption && (
        <div className={`result ${selectedOption.correct ? 'success' : 'failure'}`}>
          <h3>{selectedOption.correct ? '✓ Correct!' : '✗ Incorrect'}</h3>
          <div className="explanation">
            <p><strong>Explanation:</strong> {selectedOption.explanation}</p>
            {selectedOption.ruleCitation && (
              <p className="citation"><strong>Rule:</strong> {selectedOption.ruleCitation}</p>
            )}
          </div>
          <div className="result-message">
            {selectedOption.correct ? scenario.successMessage : scenario.failureMessage}
          </div>
          <button className="btn-continue" onClick={handleContinue}>
            Continue
          </button>
        </div>
      )}

      {/* Time's Up */}
      {timeRemaining === 0 && !selectedOption && (
        <div className="result failure">
          <h3>Time's Up!</h3>
          <p>In court, you must make decisions quickly. The moment has passed.</p>
          <button className="btn-continue" onClick={() => onComplete(false)}>
            Continue
          </button>
        </div>
      )}
    </div>
  )
}

export default Scenario
