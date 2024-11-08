'use client'
import Image from 'next/image'
import styles from './Container.module.css'

export default function Container() {
  const width = 5356 * 0.7
  const height = 842 * 0.7

  return (
    <section className={styles.scrollContainer}>
      <Image
        src="/images/archive/연표.png"
        width={width}
        height={height}
      />
      <button></button>
      <Image
        src={'/images/archive/코끼리.webp'}
        width={171}
        height={163}
      />
    </section>
  )
}
