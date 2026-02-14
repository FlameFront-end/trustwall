import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/shared/model/routes'
import { BackupIllustration } from './components'

import s from './HomeScreen.module.scss'

export const HomeScreen: FC = () => {
  const navigate = useNavigate()

  return (
    <div className={s.root}>
    <header className={s.header}>
      <h1 className={s.title}>Backup</h1>
    </header>

    <div className={s.content}>
      <BackupIllustration />
      <h2 className={s.heading}>Back up secret phrase</h2>
      <p className={s.subtitle}>
        Protect your assets by backing up your seed phrase now.
      </p>
    </div>

    <div className={s.actions}>
      <button type="button" className={s.button} onClick={() => navigate(ROUTES.SECOND)}>
        Back up manually
      </button>
    </div>
  </div>
  )
}
