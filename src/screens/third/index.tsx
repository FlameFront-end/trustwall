import type { FC } from 'react'
import { Link } from 'react-router-dom'

import { ROUTES } from '@/shared/model/routes'

import s from './ThirdScreen.module.scss'

export const ThirdScreen: FC = () => (
  <div className={s.root}>
    <h1>Third</h1>
    <nav>
      <Link to={ROUTES.HOME}>Home</Link>
      <Link to={ROUTES.SECOND}>Second</Link>
    </nav>
  </div>
)
