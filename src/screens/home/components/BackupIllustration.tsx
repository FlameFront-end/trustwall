import type { FC } from 'react'

import s from './BackupIllustration.module.scss'

export const BackupIllustration: FC = () => (
  <div className={s.wrapper}>
    <img
      src="backup-illustration.png"
      alt="Back up secret phrase"
      className={s.illustration}
    />
  </div>
)
