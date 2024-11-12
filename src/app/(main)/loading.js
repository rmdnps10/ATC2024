import React from 'react'
import styles from './loading.module.css'
import Image from 'next/image'

export default function Loading() {
  return (
    <main className={styles.loading}>
      <img
        src={'/images/loading/loading.gif'}
        alt="로딩 중..."
      />
    </main>
  )
}
