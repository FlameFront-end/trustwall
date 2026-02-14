import type { FC } from 'react'

import backupImg from '@/shared/assets/backup-illustration.png'
import s from './BackupIllustration.module.scss'

export const BackupIllustration: FC = () => (
  <div className={s.wrapper}>
    <img
      src={backupImg}
      alt="Back up secret phrase"
      className={s.illustration}
    />
  </div>
)
