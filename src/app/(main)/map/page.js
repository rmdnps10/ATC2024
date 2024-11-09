'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useRef, useState } from 'react'
import { fourthData, FourthFloorSVG } from '@/components/map/FourthFloor'
// import FourthFloorSVG from '/public/images/map/edited4floor.svg'
//
//
//
export default function Home() {
  const tabList = ['하비에르관 4F', '하비에르관 5F', '로욜라도서관 1관']
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedTitle, setSelectedTitle] = useState()
  const tabRefs = useRef([])
  const mapRefs = useRef([])
  const boxRef = useRef(null)
  const [selectedCircle, setSelectedCircle] = useState(0)
  const [selectedPos, setSelectedPos] = useState(null)
  const circleRefs = useRef([])
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
  const handleCircleClick = index => {
    setSelectedCircle(index)
    // Here you can implement any specific interaction per circle
    console.log(`Circle ${index + 1} clicked`)
    if (fourthData[index]) {
      console.log(`${fourthData[index]?.title}`)
    }
  }

  const handlePosition = circle => {
    console.log(circle.cx.animVal.value, circle.cy.animVal.value)
    const newPos = {
      x: circle.cx.animVal.value,
      y: circle.cy.animVal.value
    }
    setSelectedPos(newPos)
    console.dir(newPos)

    if (boxRef.current) {
      // boxRef.current가 정의되어 있는지 확인
      boxRef.current.style.transform = `translate(${
        circle.cx.animVal.value * 0.5
      }px, ${circle.cy.animVal.value * 1.2}px)`
    }
  }
  const handleMouseMove = event => {
    console.log('Mouse X:', event.clientX, 'Mouse Y:', event.clientY)
  }
  useEffect(() => {
    console.dir(selectedPos)
  }, [selectedPos])
  useEffect(() => {
    if (mapRefs.current[0]) {
      circleRefs.current = mapRefs.current[0].querySelectorAll('circle')
      circleRefs.current.forEach((circle, index) => {
        circle.addEventListener('click', () => {
          handleCircleClick(index)
          handlePosition(circle)
        })
      })
    }
  }, [mapRefs])

  function map(value, start1, stop1, start2, stop2, clamp = true) {
    const ratio = (value - start1) / (stop1 - start1)
    let mappedValue = start2 + ratio * (stop2 - start2)

    if (clamp) {
      if (stop2 > start2) {
        mappedValue = Math.max(start2, Math.min(mappedValue, stop2))
      } else {
        mappedValue = Math.max(stop2, Math.min(mappedValue, start2))
      }
    }

    return mappedValue
  }
  return (
    <main
      className={styles.main}
      onMouseMove={handleMouseMove}>
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
          <h6
            ref={el => (boxRef.current = el)}
            className={styles.selectedCircleInfo}>
            {fourthData[selectedCircle].title}
          </h6>

          <span
            ref={el => (mapRefs.current[0] = el)}
            className={styles.firstSpan}>
            <FourthFloorSVG />
          </span>
          <span
            ref={el => (mapRefs.current[1] = el)}
            className={styles.secondSpan}>
            <Image
              src={'/images/map/edited5floor.svg'}
              alt="maps"
              fill
              objectFit="contain"
            />
          </span>
          <span
            ref={el => (mapRefs.current[2] = el)}
            className={styles.thirdSpan}>
            <Image
              src={'/images/map/editedloyola.svg'}
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
        <svg className={styles.line}>
          {selectedPos && (
            <line
              x1={selectedPos.x * 0.3} //up
              y1={selectedPos.y * 0.3}
              // x2={map(selectedPos.x, 46, 1343, 176, 919)}
              x2={selectedPos.x}
              // y2={map(selectedPos.y, 102, 456, 441, 640)}
              y2={selectedPos.y}
              // x1={200}
              // y1={200}
              // x2={400}
              // y2={400}
              stroke="black"
              strokeWidth="2"
            />
          )}
        </svg>
      </section>
    </main>
  )
}
