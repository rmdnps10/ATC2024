import React, { useEffect, useRef } from 'react'
import styles from './ToCreditPage.module.css'
import Link from 'next/link'
import Image from 'next/image'
//
//
//
export default function ToCreditPage() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animate)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.8
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`${styles.credit}`}>
      <div className={styles.gradContainer}>
        <div className={styles.box}>
          <p>Credit</p>
          <p>ATC를 함께 만들어간 분들을 소개합니다</p>
          <Link
            href={'/credit'}
            passHref
            className={styles.creditButton}>
            {' '}
            Credit List
            <Image
              src="/icon/button/credit-button.svg"
              alt="버튼 화살표"
              width={24}
              height={24}
            />
          </Link>
        </div>
      </div>
      <div className={`${styles.designedTags} ${styles.animate}`}>
        <div>A & T</div>
        <div>Atc Staff</div>
        <div>Artist</div>
      </div>
    </section>
  )
}
