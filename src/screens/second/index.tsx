import { useState, useCallback } from 'react'
import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/shared/model/routes'

import s from './SecondScreen.module.scss'

const SEED_WORDS = [
  'airport', 'humble', 'million', 'flower',
  'delta', 'oil', 'spark', 'avocado',
  'regent', 'vanity', 'crane', 'pigeon',
]

const SHUFFLED_WORDS = [...SEED_WORDS].sort(() => Math.random() - 0.5)

const TOTAL_SLOTS = 12

export const SecondScreen: FC = () => {
  const navigate = useNavigate()
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [wordBank] = useState(SHUFFLED_WORDS)

  const allFilled = selectedWords.length === TOTAL_SLOTS

  const handleWordClick = useCallback((word: string) => {
    setSelectedWords((prev) => {
      if (prev.length >= TOTAL_SLOTS) return prev
      return [...prev, word]
    })
  }, [])

  const handleSlotClick = useCallback((index: number) => {
    setSelectedWords((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const handleClearAll = useCallback(() => {
    setSelectedWords([])
  }, [])

  const handleNext = useCallback(() => {
    if (allFilled) {
      navigate(ROUTES.THIRD)
    }
  }, [allFilled, navigate])

  return (
    <div className={s.root}>
      <div className={s.progress}>
        <div className={s.progressSegment} />
        <div className={s.progressSegment} />
      </div>

      <h1 className={s.heading}>Confirm Your Secret Phrase</h1>
      <p className={s.subtitle}>
        Please select each word in the correct order to verify you have saved
        your Secret Phrase.
      </p>

      <div className={s.grid}>
        {Array.from({ length: TOTAL_SLOTS }).map((_, i) => {
          const word = selectedWords[i]
          return (
            <button
              key={i}
              type="button"
              className={`${s.slot} ${word ? s.slotFilled : ''}`}
              onClick={() => word && handleSlotClick(i)}
            >
              <span className={word ? s.slotNumber : s.slotNumberEmpty}>
                {i + 1}.
              </span>
              {word && <span className={s.slotWord}>{word}</span>}
            </button>
          )
        })}
      </div>

      <button type="button" className={s.clearAll} onClick={handleClearAll}>
        Clear all
      </button>

      <div className={s.wordBank}>
        {wordBank.map((word) => {
          const isUsed = selectedWords.includes(word)
          return (
            <button
              key={word}
              type="button"
              className={`${s.wordChip} ${isUsed ? s.wordChipUsed : ''}`}
              onClick={() => !isUsed && handleWordClick(word)}
              disabled={isUsed}
            >
              {word}
            </button>
          )
        })}
      </div>

      <div className={s.actions}>
        <button
          type="button"
          className={s.backButton}
          onClick={() => navigate(ROUTES.HOME)}
        >
          Back
        </button>
        <button
          type="button"
          className={`${s.nextButton} ${allFilled ? s.nextButtonActive : ''}`}
          onClick={handleNext}
          disabled={!allFilled}
        >
          Next
        </button>
      </div>
    </div>
  )
}
