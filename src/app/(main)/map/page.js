'use client'
import Image from 'next/image'
import classNames from 'classnames'
import styles from './page.module.css'
import { useEffect, useRef, useState } from 'react'
import { fourthData, FourthFloorSVG } from '@/components/map/FourthFloor'
import { fifthData, FifthFloorSVG } from '@/components/map/FifthFloor'
import { loyolaData, LoyolaSVG } from '@/components/map/Loyola'
import { useRouter } from 'next/navigation'
//
//
//
export default function Home() {
  const router = useRouter()
  const tabList = ['하비에르관 4F', '하비에르관 5F', '로욜라도서관 1관']
  const [selectedTab, setSelectedTab] = useState(0)
  const tabRefs = useRef([])
  const mapRefs = useRef([])
  const boxRef = useRef(null)
  const [popupOpen, setPopupOpen] = useState(false)
  const [selectedCircle, setSelectedCircle] = useState(0)
  const circleRefs = useRef([])
  const [clickedPos, setclickedPos] = useState({
    x: 0,
    y: 0
  })

  useEffect(() => {
    tabRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.fontWeight = index === selectedTab ? '700' : '400'
        ref.style.color = index === selectedTab ? '#000000' : '#a5a5a5'
      }
    })
  }, [popupOpen])

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
    if (index === selectedCircle && popupOpen) {
      setSelectedCircle(null)
      setPopupOpen(false)
    } else {
      setSelectedCircle(index)
      setPopupOpen(true)
    }
  }

  function handlePopupPos(pos) {
    if (boxRef.current) {
      boxRef.current.style.transform = `translate(${pos.x - 100}px, ${
        pos.y - 100
      }px)`
    }
  }

  useEffect(() => {
    mapRefs.current.forEach(el => {
      if (el) {
        circleRefs.current = el.querySelectorAll('circle')
        circleRefs.current.forEach((circle, index) => {
          circle.addEventListener('click', e => {
            const client = {
              x: e.clientX,
              y: e.clientY
            }
            handlePopupPos(client)
            setclickedPos(client)
            handleCircleClick(index)
            // handlePosition(circle)
          })
        })
      }
    })
  }, [mapRefs])

  return (
    <main className={styles.main}>
      <h6
        ref={el => (boxRef.current = el)}
        className={classNames({
          [styles.selectedCircleInfo]: true,
          [styles.visible]: popupOpen,
          [styles.hidden]: !popupOpen
        })}>
        <div>
          <span className={styles.popupImage}>
            <Image
              onClick={() => setPopupOpen(false)}
              src="/images/works/exit.svg"
              width={15}
              height={15}
              alt="close"
            />
          </span>
        </div>
        <span className={styles.popupTeam}>
          {selectedTab === 0 ? fourthData[selectedCircle]?.team : null}
          {selectedTab === 1 ? fifthData[selectedCircle]?.team : null}
          {selectedTab === 2 ? loyolaData[selectedCircle]?.team : null}
        </span>
        <span className={styles.popupTitle}>
          {selectedTab === 0 ? fourthData[selectedCircle]?.title : null}
          {selectedTab === 1 ? fifthData[selectedCircle]?.title : null}
          {selectedTab === 2 ? loyolaData[selectedCircle]?.title : null}
        </span>
        {selectedTab === 0 ? (
          <button
            onClick={() => router.push(`${fourthData[selectedCircle]._id}`)}>
            보러가기
          </button>
        ) : null}
        {selectedTab === 1 ? (
          <button
            onClick={() => router.push(`${fifthData[selectedCircle]._id}`)}>
            보러가기
          </button>
        ) : null}
        {selectedTab === 2 ? (
          <button
            onClick={() => router.push(`${loyolaData[selectedCircle]._id}`)}>
            보러가기
          </button>
        ) : null}
      </h6>

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
          <br /> 아래 지도에서 공간 별로 전시되는 작품들을{' '}
          <span className={styles.spanHighLight}>CLICK</span>
          <span className={styles.spanMobile}>확인</span>해보세요!
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
            <FourthFloorSVG />
            <p>{tabList[0]}</p>
          </span>
          <span
            ref={el => (mapRefs.current[1] = el)}
            className={styles.secondSpan}>
            <FifthFloorSVG />
            <p>{tabList[1]}</p>
          </span>
          <span
            ref={el => (mapRefs.current[2] = el)}
            className={styles.thirdSpan}>
            <LoyolaSVG />
            <p>{tabList[2]}</p>
          </span>
        </div>
      </section>
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
    </main>
  )
}
