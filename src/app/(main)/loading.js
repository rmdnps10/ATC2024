import React from 'react'
import styles from './loading.module.css'
import Image from 'next/image'

export default function Loading() {
  return (
    <main className={styles.loading}>
      <p className={styles.loadingText}>
        Loading...{' '}
        <Image
          src={'/images/main/AtcElephant.png'}
          width={58}
          height={47}
        />
      </p>
    </main>
  )
}
