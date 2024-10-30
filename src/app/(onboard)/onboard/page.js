// page.js
'use client'

import styles from './page.module.css'
import Scene from '../../../components/onboard/Scene'
import Ocean from '../../../components/onboard/Ocean'

export default function OnBoardPage() {
  return (
    <div className={styles.root}>
      {/* <Scene /> */}
      <Ocean />
    </div>
  )
}
