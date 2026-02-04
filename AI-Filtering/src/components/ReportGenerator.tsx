import { useState, useRef, useEffect } from 'react'
import { IconButton, AwesomeIcon } from '@koddidev/katalyst-ui'

interface ReportGeneratorProps {
  onGenerate: (prompt: string) => void
  isGenerating?: boolean
}

const suggestions = [
  'Campaigns with at least 1 order',
  'Only campaigns that drove revenue',
  'High spend campaigns with low ROAS',
]

export function ReportGenerator({ onGenerate, isGenerating }: ReportGeneratorProps) {
  const [prompt, setPrompt] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(true)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea to fit content
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto'
      // Calculate height: min 2 lines (line-height * 2), max based on content
      const lineHeight = 20 // 14px font-size * 1.43 line-height ≈ 20px
      const minHeight = lineHeight * 2 // 2 lines minimum
      const newHeight = Math.max(minHeight, textarea.scrollHeight)
      textarea.style.height = `${newHeight}px`
    }
  }, [prompt])

  // Automatically close suggestions when loading starts
  useEffect(() => {
    if (isGenerating) {
      setShowSuggestions(false)
    }
  }, [isGenerating])

  const handleSubmit = () => {
    if (prompt.trim()) {
      onGenerate(prompt.trim())
      // Keep the text in the textarea after submission
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    // Autofill the textarea with the suggestion
    setPrompt(suggestion)
    // Automatically submit - use requestAnimationFrame to ensure textarea updates first
    requestAnimationFrame(() => {
      onGenerate(suggestion)
      // Keep the text in the textarea after submission
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div
      className="flex flex-col items-start p-6 w-[300px] bg-white border border-[#F3F4F6] rounded-tr-[6px]"
      style={{ marginTop: '-1px' }}
    >
      {/* Sidebar Header */}
      <div className="flex items-center gap-1.5 w-full">
        {/* Dice-d8 icon - light variant */}
        <AwesomeIcon 
          name="dice-d8" 
          variant="light"
          size="sm" 
          className="text-[#6A7282] shrink-0"
        />

        {/* Title */}
        <span className="flex-1 text-sm font-medium text-[#030712] leading-5">Report generator</span>
      </div>

      {/* Content block:
          - Always 24px below header
          - When suggestions are hidden, button stays exactly 24px below header (no extra “gap”) */}
      <div className="mt-6 w-full">
        {/* Suggestions collapse area (less jumpy than max-height animation) */}
        <div
          className={[
            'grid transition-[grid-template-rows,opacity] duration-300 ease-in-out',
            showSuggestions ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none',
          ].join(' ')}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="flex flex-col justify-center items-start pl-2 gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  disabled={isGenerating}
                  className="flex items-center justify-center px-3 py-1.5 h-7 bg-white border border-[#E5E7EB] rounded-[6px] shadow-[0px_4px_20px_rgba(0,0,0,0.04)] text-xs text-[#6A7282] leading-4 disabled:opacity-50 hover:bg-gray-50 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer area: its spacing animates so it doesn’t “jump” when suggestions collapse */}
        <div
          className={[
            'w-full flex flex-col items-start transition-[margin-top] duration-300 ease-in-out',
            showSuggestions ? 'mt-6' : 'mt-0',
          ].join(' ')}
        >
          {/* Footer Item - Hide suggestions button */}
          <div className="flex flex-col items-start pl-2" style={{ marginBottom: '-1px' }}>
            <button
              onClick={() => setShowSuggestions((v) => !v)}
              className="flex items-center justify-center px-3 py-1.5 h-7 bg-white border border-[#DAE9FF] rounded-t-[6px] text-xs text-[#367DFE] leading-4 transition-colors duration-200 hover:bg-[#EEF6FF]"
            >
              {showSuggestions ? 'Hide suggestions' : 'Show suggestions'}
            </button>
          </div>

          {/* Search Container */}
          <div className="flex flex-col justify-end items-start">
          {/* Search Box - 252px width, auto height, padding 16px 16px 12px */}
          <div
            className="flex flex-col items-start gap-4 bg-white border border-[#DAE9FF] rounded-lg shadow-[0px_0px_24px_8px_rgba(238,246,255,0.5)]"
            style={{ width: '252px', padding: '16px 16px 12px' }}
          >
              {/* Input text */}
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Generate me a report with…"
                disabled={isGenerating}
                className="w-full bg-transparent text-sm text-[#6A7282] placeholder-[#99A1AF] resize-none outline-none border-none leading-[1.43] disabled:opacity-50 focus:ring-0 focus:outline-none overflow-hidden"
                style={{ 
                  boxShadow: 'none',
                  minHeight: '40px', // 2 lines minimum (20px line-height * 2)
                  height: 'auto'
                }}
              />

              {/* Search Button Row */}
              <div className="flex justify-end items-end pt-6 w-full">
                <IconButton
                  icon={{
                    name: isGenerating ? 'spinner' : 'arrow-right',
                    iconFamily: 'sharp',
                    shouldSpin: isGenerating,
                  }}
                  variant="primary"
                  size="sm"
                  onClick={handleSubmit}
                  isDisabled={!prompt.trim() || isGenerating}
                  testId="submit-prompt"
                  className="!w-7 !h-7 bg-[#367DFE] rounded-[6px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

