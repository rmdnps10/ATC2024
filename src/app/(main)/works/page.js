'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { worksData } from '@/components/works/MockData'
//
//
//
export default function WorksPage({}) {
  const tabList = [
    '전체',
    '애니메이션',
    '설치미술',
    '미디어 아트',
    '인터렉티브 아트',
    '사운드',
    '입체조형',
    '애플리케이션',
    '게임',
    '비디오',
    '웹사이트'
  ]
  const router = useRouter()
  const tabRefs = useRef([])
  const indicatorRef = useRef()
  const tabListRef = useRef()
  const [tabSelected, setTabSelected] = useState('ALL')
  const [clickedId, setClickedId] = useState(null)
  const [works, setWorks] = useState(worksData)
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    //필터링 탭에 useRef
    tabRefs.current.forEach((ref, idx) => {
      if (ref) {
        ref.style.fontWeight = idx === 0 ? '600' : '500'
        ref.style.color = idx === 0 ? 'black' : '#767676'
        ref.style.background =
          idx === 0
            ? 'linear-gradient(90deg, #dd4ffc 0%, #1160f7 31%, #7340fb 64.5%, #35cffa 100%)'
            : 'none'
        ref.style.backgroundClip = idx === 0 ? 'text' : 'none'
        ref.style.webkitBackgroundClip = idx === 0 ? 'text' : 'none'
        ref.style.webkitTextFillColor = idx === 0 ? 'transparent' : 'inherit'
      }
    })

    //스크롤 인식
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function handleWorkClick(key) {
    setClickedId(key)
    setTimeout(() => {
      router.push(`/works/${key}`, undefined, { shallow: true })
    }, 300)
  }

  function handleTabClick(key) {
    tabRefs.current.forEach((ref, idx) => {
      if (ref && indicatorRef) {
        ref.style.color = '#767676'
        ref.style.background =
          idx === key
            ? 'linear-gradient(90deg, #dd4ffc 0%, #1160f7 31%, #7340fb 64.5%, #35cffa 100%)'
            : 'none'
        ref.style.backgroundClip = idx === key ? 'text' : 'none'
        ref.style.webkitBackgroundClip = idx === key ? 'text' : 'none'
        ref.style.webkitTextFillColor = idx === key ? 'transparent' : 'inherit'
        // indicatorRef.current.style.transform = `translate(${
        //   8.18 * key
        // }vw, -50%)`
      }
    })
    setTabSelected(key)
    if (key === 0) {
      //all을 선택하면 가져온 데이터 모두로 set
      setWorks(worksData)
    } else {
      //category와 string이 맞으면 필터링
      setWorks(worksData.filter(el => el.category === tabList[key]))
    }
  }

  return (
    <main className={styles.main}>
      <header>
        <div className={styles.headerTitle}>OUR WORKS</div>
        <div className={styles.headerSummary}>
          ${`ATC 2024, <코끼리를 냉장고에 넣는 방법>, 그리고 아테커들의 방식`}
        </div>
        <div className={styles.headerDesc}>
          <div>
            예술은 과감해졌고, 기술은 정교해졌습니다.
            <br />
            <span>아트&테크놀로지</span>라
            는 사회 속에서 우리는 항상 그 사이의 미묘한 균형을 찾고 있습니다. 
            <br />
            자유로운 표현의 바다와 정밀한 구조의 정글 사이에서, 각자의 길을 개척하며, 걷습니다.{' '}
            <br />
            {`<ATC 2024>에서 수많은 작품들은 다양한 색채와 형태로 질문에 대답하며, 저마다 다른 방식으로 이 도전과 마주합니다.`}
          </div>
          <div>
            이 방식은 각기 다를 것입니다. 어떤 이는 냉장고를 확장하고, 다른 이는 코끼리를 축소합니다. 
            <br />
            또 어떤 이는 그 사이의 빈 공간을 새롭게 정의합니다. 어쩌면 세상에 없던것을 가져오는 사람도 있을지 모릅니다.
            <br />
            이 전시는 그 아트&테크놀로지에 속한 <span>아테커</span>
             각자의 <span>방법</span>을 보여주는 공간입니다.
          </div>
        </div>
      </header>
      <nav>
        {/* <div
          className="indicator"
          ref={el => (indicatorRef.current = el)}></div> */}
        <ul ref={tabListRef}>
          {tabList.map((el, key) => (
            <li
              key={key}
              ref={el => (tabRefs.current[key] = el)}
              onClick={() => handleTabClick(key)}>
              <span>{el}</span>
            </li>
          ))}
        </ul>
      </nav>
      <section>
        {works.map(el => (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            layoutId={el.id}
            onClick={() => handleWorkClick(el.id)}
            className={styles.figure}
            key={el.id}>
            <Image
              className={styles.image}
              src={el.imgUrl}
              alt={el.title.title_kor}
              fill
            />
            <figcaption>
              <div className={styles.figCategory}>{el.category}</div>
              <div className={styles.figBox}>
                <span className={styles.figTeam}>{el.team.team_kor}</span>
                <span className={styles.figTitle}>{el.title.title_kor}</span>
                <span className={styles.figDesc}>{el.desc}</span>
              </div>
            </figcaption>
          </motion.div>
        ))}
      </section>
      <AnimatePresence>
        {clickedId !== null && (
          <motion.div
            style={{ transform: `translateY(${scrollY - 100}px)` }}
            className={styles.animateOverlay}
            onClick={() => {
              setClickedId(null)
            }}
            initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            animate={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
            <motion.div
              initial={{
                width: '100vw',
                height: '100vh',
                opacity: 1
              }}
              animate={{
                width: '100vw',
                height: '200vh',
                opacity: 1
              }}
              exit={{
                width: '100%',
                height: '100%',
                opacity: 0
              }}
              transition={{ ease: 'easeInOut', duration: 0.33 }}
              layoutId={clickedId}
              className={styles.animateBox}></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
