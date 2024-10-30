// page.js
'use client'

import styles from './page.module.css'
import Experience from '@/components/onboard/Experience'

export default function OnBoardPage() {
  return (
    <div className={styles.root}>
      <Experience />
    </div>
  )
}
