import type { FC } from 'react'

import successImg from '@/shared/assets/success-illustration.png'

import s from './ThirdScreen.module.scss'

export const ThirdScreen: FC = () => (
  <div className={s.root}>
    <div className={s.content}>
      <div className={s.illustrationWrapper}>
        <img
          src={successImg}
          alt="Your wallet is ready"
          className={s.illustration}
        />
      </div>
      <h2 className={s.heading}>Your wallet is ready to use!</h2>
      <p className={s.subtitle}>
        Remember to backup and keep your Secret Phrase safe.
      </p>
      <div className={s.actions}>
        <button type="button" className={s.button}>
          Open wallet
        </button>
      </div>
    </div>
  </div>
)
