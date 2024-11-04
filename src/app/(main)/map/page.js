'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useRef, useState } from 'react'
//
//
//
export default function Home() {
  const tabList = ['하비에르관 4F', '하비에르관 5F', '로욜라도서관 1관']
  const [selectedTab, setSelectedTab] = useState(0)
  const tabRefs = useRef([])
  const mapRefs = useRef([])
  useEffect(() => {
    tabRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.fontWeight = index === selectedTab ? '700' : '400'
        ref.style.color = index === selectedTab ? '#000000' : '#a5a5a5'
      }
    })
  }, [])
  function handleTabClick(key) {
    tabRefs.current.forEach((ref, idx) => {
      if (ref) {
        ref.style.fontWeight = key === idx ? '700' : '400'
        ref.style.color = key === idx ? '#000000' : '#a5a5a5'
      }
    })
    mapRefs.current.forEach(ref => {
      if (ref) {
        switch (key) {
          case 0:
            ref.style.transform = 'translateX(100%)'
            break
          case 1:
            ref.style.transform = 'translateX(0%)'
            break
          case 2:
            ref.style.transform = 'translateX(-100%)'
            break
        }
      }
    })
    setSelectedTab(key)
  }

  return (
    <main className={styles.main}>
      <header>
        <div className={styles.headerTitle}>오프라인 맵 | OFFLINE MAP</div>
        <div className={styles.headerDesc}>
          <span className={styles.spanRainbow}>
            2024 ATC : 코끼리를 냉장고에 넣는 방법
          </span>{' '}
          은<br />
          서강대학교{' '}
          <span className={styles.spanBold}>
            하비에르관(X관) 4층&5층과 로욜라도서관 1층
          </span>
          에서 진행됩니다.
          <br /> 아래 지도에서 공간 별로 전시되는 작품들을 확인해보세요!
        </div>
      </header>
      <section>
        <ul>
          <li
            onClick={() => handleTabClick(0)}
            ref={el => (tabRefs.current[0] = el)}>
            {tabList[0]}
          </li>
          <span>|</span>
          <li
            onClick={() => handleTabClick(1)}
            ref={el => (tabRefs.current[1] = el)}>
            {tabList[1]}
          </li>
          <span>|</span>
          <li
            onClick={() => handleTabClick(2)}
            ref={el => (tabRefs.current[2] = el)}>
            {tabList[2]}
          </li>
        </ul>
        <div>
          <span
            ref={el => (mapRefs.current[0] = el)}
            className={styles.firstSpan}>
            <Image
              src={'/images/map/4f.svg'}
              alt="maps"
              fill
              objectFit="contain"
            />
          </span>
          <span
            ref={el => (mapRefs.current[1] = el)}
            className={styles.secondSpan}>
            <Image
              src={'/images/map/5f.svg'}
              alt="maps"
              fill
              objectFit="contain"
            />
          </span>
          <span
            ref={el => (mapRefs.current[2] = el)}
            className={styles.thirdSpan}>
            <Image
              src={'/images/map/loyola.svg'}
              alt="maps"
              fill
              objectFit="contain"
            />
          </span>
        </div>
        {selectedTab === 0 ? null : (
          <Image
            onClick={() => handleTabClick((selectedTab + 2) % 3)}
            className={styles.arrowLeft}
            src={'/images/map/Arrow_right.png'}
            alt="arrow-left"
            width={50}
            height={50}
          />
        )}
        {selectedTab === 2 ? null : (
          <Image
            onClick={() => handleTabClick((selectedTab + 1) % 3)}
            className={styles.arrowRight}
            src={'/images/map/Arrow_right.png'}
            alt="arrow-right"
            width={50}
            height={50}
          />
        )}
      </section>
    </main>
  )
}
