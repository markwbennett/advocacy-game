import { useState } from 'react'
import './ScenarioBuilder.css'

function ScenarioBuilder({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    offenseLevel: 'class_c',
    offenseType: '',
    topic: '',
    difficulty: 1,
    defendant: '',
    charge: '',
    background: '',
    phase: 'trial',
    moment: 'direct_examination',
    description: '',
    timerSeconds: 20,
    successMessage: '',
    failureMessage: '',
    options: [
      { text: '', correct: false, explanation: '', ruleCitation: '' },
      { text: '', correct: false, explanation: '', ruleCitation: '' },
    ]
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...formData.options]
    newOptions[index] = { ...newOptions[index], [field]: value }
    setFormData(prev => ({ ...prev, options: newOptions }))
  }

  const addOption = () => {
    if (formData.options.length < 5) {
      setFormData(prev => ({
        ...prev,
        options: [...prev.options, { text: '', correct: false, explanation: '', ruleCitation: '' }]
      }))
    }
  }

  const removeOption = (index) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index)
      setFormData(prev => ({ ...prev, options: newOptions }))
    }
  }

  const toggleCorrect = (index) => {
    const newOptions = formData.options.map((opt, i) => ({
      ...opt,
      correct: i === index
    }))
    setFormData(prev => ({ ...prev, options: newOptions }))
  }

  const validateForm = () => {
    const errors = []

    if (!formData.defendant.trim()) errors.push('Defendant name is required')
    if (!formData.charge.trim()) errors.push('Charge is required')
    if (!formData.background.trim()) errors.push('Background is required')
    if (!formData.description.trim()) errors.push('Situation description is required')
    if (!formData.topic.trim()) errors.push('Topic is required')
    if (!formData.successMessage.trim()) errors.push('Success message is required')
    if (!formData.failureMessage.trim()) errors.push('Failure message is required')

    const hasCorrectAnswer = formData.options.some(opt => opt.correct)
    if (!hasCorrectAnswer) errors.push('At least one option must be marked as correct')

    const emptyOptions = formData.options.filter(opt => !opt.text.trim())
    if (emptyOptions.length > 0) errors.push('All options must have text')

    const emptyExplanations = formData.options.filter(opt => !opt.explanation.trim())
    if (emptyExplanations.length > 0) errors.push('All options must have explanations')

    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const errors = validateForm()
    if (errors.length > 0) {
      alert('Please fix the following errors:\n\n' + errors.join('\n'))
      return
    }

    const scenario = {
      id: `scenario_${Date.now()}`,
      offenseLevel: formData.offenseLevel,
      offenseType: formData.offenseType,
      topic: formData.topic,
      difficulty: parseInt(formData.difficulty),
      context: {
        defendant: formData.defendant,
        charge: formData.charge,
        background: formData.background
      },
      situation: {
        phase: formData.phase,
        moment: formData.moment,
        description: formData.description
      },
      options: formData.options.map((opt, idx) => ({
        id: `opt_${String.fromCharCode(97 + idx)}`,
        text: opt.text,
        correct: opt.correct,
        explanation: opt.explanation,
        ruleCitation: opt.ruleCitation || null
      })),
      timerSeconds: parseInt(formData.timerSeconds),
      successMessage: formData.successMessage,
      failureMessage: formData.failureMessage
    }

    onSave(scenario)
  }

  const exportAsJSON = () => {
    const errors = validateForm()
    if (errors.length > 0) {
      alert('Please fix all form errors before exporting')
      return
    }

    const scenario = {
      id: `scenario_${Date.now()}`,
      offenseLevel: formData.offenseLevel,
      offenseType: formData.offenseType,
      topic: formData.topic,
      difficulty: parseInt(formData.difficulty),
      context: {
        defendant: formData.defendant,
        charge: formData.charge,
        background: formData.background
      },
      situation: {
        phase: formData.phase,
        moment: formData.moment,
        description: formData.description
      },
      options: formData.options.map((opt, idx) => ({
        id: `opt_${String.fromCharCode(97 + idx)}`,
        text: opt.text,
        correct: opt.correct,
        explanation: opt.explanation,
        ruleCitation: opt.ruleCitation || null
      })),
      timerSeconds: parseInt(formData.timerSeconds),
      successMessage: formData.successMessage,
      failureMessage: formData.failureMessage
    }

    const jsonStr = JSON.stringify(scenario, null, 2)
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `scenario_${formData.topic}_${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="scenario-builder">
      <div className="builder-header">
        <h2>Create New Scenario</h2>
        <button className="btn-close" onClick={onClose}>✕</button>
      </div>

      <form onSubmit={handleSubmit} className="builder-form">
        {/* Case Information */}
        <section className="form-section">
          <h3>Case Information</h3>

          <div className="form-row">
            <div className="form-group">
              <label>Offense Level *</label>
              <select value={formData.offenseLevel} onChange={(e) => handleInputChange('offenseLevel', e.target.value)}>
                <option value="class_c">Class C Misdemeanor</option>
                <option value="class_b">Class B Misdemeanor</option>
                <option value="class_a">Class A Misdemeanor</option>
                <option value="state_jail">State Jail Felony</option>
                <option value="third_degree">Third Degree Felony</option>
                <option value="second_degree">Second Degree Felony</option>
                <option value="first_degree">First Degree Felony</option>
              </select>
            </div>

            <div className="form-group">
              <label>Offense Type *</label>
              <input
                type="text"
                value={formData.offenseType}
                onChange={(e) => handleInputChange('offenseType', e.target.value)}
                placeholder="e.g., assault, theft, DWI"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Topic *</label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => handleInputChange('topic', e.target.value)}
                placeholder="e.g., hearsay, relevance, character_evidence"
              />
            </div>

            <div className="form-group">
              <label>Difficulty (1-5) *</label>
              <input
                type="number"
                min="1"
                max="5"
                value={formData.difficulty}
                onChange={(e) => handleInputChange('difficulty', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Defendant Name *</label>
            <input
              type="text"
              value={formData.defendant}
              onChange={(e) => handleInputChange('defendant', e.target.value)}
              placeholder="e.g., Maria Rodriguez"
            />
          </div>

          <div className="form-group">
            <label>Charge *</label>
            <input
              type="text"
              value={formData.charge}
              onChange={(e) => handleInputChange('charge', e.target.value)}
              placeholder="e.g., Class C Assault"
            />
          </div>

          <div className="form-group">
            <label>Background *</label>
            <textarea
              value={formData.background}
              onChange={(e) => handleInputChange('background', e.target.value)}
              placeholder="Brief background of the case..."
              rows="3"
            />
          </div>
        </section>

        {/* Trial Situation */}
        <section className="form-section">
          <h3>Trial Situation</h3>

          <div className="form-row">
            <div className="form-group">
              <label>Phase *</label>
              <select value={formData.phase} onChange={(e) => handleInputChange('phase', e.target.value)}>
                <option value="voir_dire">Voir Dire</option>
                <option value="trial">Trial</option>
                <option value="sentencing">Sentencing</option>
              </select>
            </div>

            <div className="form-group">
              <label>Moment *</label>
              <select value={formData.moment} onChange={(e) => handleInputChange('moment', e.target.value)}>
                <option value="direct_examination">Direct Examination</option>
                <option value="cross_examination">Cross Examination</option>
                <option value="opening_statement">Opening Statement</option>
                <option value="closing_argument">Closing Argument</option>
                <option value="jury_instruction">Jury Instruction</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description (What just happened?) *</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe what just happened that requires a decision..."
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Timer (seconds) *</label>
            <input
              type="number"
              min="10"
              max="60"
              value={formData.timerSeconds}
              onChange={(e) => handleInputChange('timerSeconds', e.target.value)}
            />
          </div>
        </section>

        {/* Answer Options */}
        <section className="form-section">
          <h3>Answer Options (2-5 options required)</h3>

          {formData.options.map((option, index) => (
            <div key={index} className="option-builder">
              <div className="option-header">
                <h4>Option {index + 1}</h4>
                <div className="option-controls">
                  <label className="correct-toggle">
                    <input
                      type="radio"
                      checked={option.correct}
                      onChange={() => toggleCorrect(index)}
                    />
                    Correct Answer
                  </label>
                  {formData.options.length > 2 && (
                    <button type="button" className="btn-remove" onClick={() => removeOption(index)}>
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Option Text *</label>
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                  placeholder="e.g., Object - Hearsay"
                />
              </div>

              <div className="form-group">
                <label>Explanation *</label>
                <textarea
                  value={option.explanation}
                  onChange={(e) => handleOptionChange(index, 'explanation', e.target.value)}
                  placeholder="Explain why this option is correct or incorrect..."
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Rule Citation (optional)</label>
                <input
                  type="text"
                  value={option.ruleCitation}
                  onChange={(e) => handleOptionChange(index, 'ruleCitation', e.target.value)}
                  placeholder="e.g., Tex. R. Evid. 801(d)"
                />
              </div>
            </div>
          ))}

          {formData.options.length < 5 && (
            <button type="button" className="btn-add-option" onClick={addOption}>
              + Add Another Option
            </button>
          )}
        </section>

        {/* Feedback Messages */}
        <section className="form-section">
          <h3>Feedback Messages</h3>

          <div className="form-group">
            <label>Success Message *</label>
            <textarea
              value={formData.successMessage}
              onChange={(e) => handleInputChange('successMessage', e.target.value)}
              placeholder="Message shown when the user selects the correct answer..."
              rows="2"
            />
          </div>

          <div className="form-group">
            <label>Failure Message *</label>
            <textarea
              value={formData.failureMessage}
              onChange={(e) => handleInputChange('failureMessage', e.target.value)}
              placeholder="Message shown when the user selects an incorrect answer..."
              rows="2"
            />
          </div>
        </section>

        {/* Action Buttons */}
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={exportAsJSON}>
            Export as JSON
          </button>
          <button type="submit" className="btn-primary">
            Save Scenario
          </button>
        </div>
      </form>
    </div>
  )
}

export default ScenarioBuilder
