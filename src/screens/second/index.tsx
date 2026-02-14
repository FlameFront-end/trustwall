import type { FC } from 'react'
import { Link } from 'react-router-dom'

import { ROUTES } from '@/shared/model/routes'

import s from './SecondScreen.module.scss'

export const SecondScreen: FC = () => (
  <div className={s.root}>
    <h1>Second</h1>
    <nav>
      <Link to={ROUTES.HOME}>Home</Link>
      <Link to={ROUTES.THIRD}>Third</Link>
    </nav>
  </div>
)
