'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
// import { worksData } from '@/components/works/MockData'
import { getAllWorks } from '@/client-api/getAllWorks'
import { title } from 'framer-motion/client'
// import { getPlaiceholder } from 'plaiceholder'
//
//
//
export default function WorksPage({}) {
  const tabList = [
    '전체',
    '애니메이션',
    '설치미술',
    '미디어아트',
    '인터랙티브아트',
    '사운드',
    '입체조형',
    '애플리케이션',
    '게임',
    '비디오',
    '웹사이트'
  ]
  // const { base64 } = await getPlaiceholder(buffer)
  const router = useRouter()
  const tabRefs = useRef([])
  const indicatorRefs = useRef([])
  const tabListRef = useRef()
  const [tabSelected, setTabSelected] = useState(0)
  const [clickedId, setClickedId] = useState(null)
  const [defaultWorks, setDefaultWorks] = useState([])
  const [filteredWorks, setFilteredWorks] = useState([])
  const [scrollY, setScrollY] = useState(0)

  //db 연결
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllWorks()
        if (data) {
          const parsed = data.map(el => {
            el.category = el.category.split(',')
            if (el._id === '672cea5b0c11e50dbd25fa13') {
              el.title = el.title.split('(')[0]
              return el
            } else {
              return el
            }
          })
          setDefaultWorks(parsed)
          setFilteredWorks(parsed)

          const storageTab = window.sessionStorage.getItem('tab')
          function handleRef(key) {
            indicatorRefs.current.forEach((indiRef, indiIdx) => {
              if (indiRef) {
                indiRef.style.opacity = indiIdx === key ? '1' : '0'
              }
            })
            tabRefs.current.forEach((ref, idx) => {
              if (ref) {
                ref.style.fontWeight = idx === key ? '600' : '500'
                ref.style.color = idx === key ? 'black' : '#767676'
                ref.style.background =
                  idx === key
                    ? 'linear-gradient(90deg, #35CFFA 0%, #278FFB 20%, #3C79FB 40%, #DD4FFC 60%, #9734FB 80%, #7340FB 100%)'
                    : 'none'
                ref.style.backgroundClip = idx === key ? 'text' : 'none'
                ref.style.webkitBackgroundClip = idx === key ? 'text' : 'none'
                ref.style.webkitTextFillColor =
                  idx === key ? 'transparent' : 'inherit'
              }
            })
          }
          const initialTab = storageTab !== null ? parseInt(storageTab, 10) : 0

          handleRef(initialTab)

          if (initialTab === 0) {
            setFilteredWorks(parsed)
          } else {
            setFilteredWorks(
              parsed.filter(el => el.category.includes(tabList[initialTab]))
            )
          }
          setTabSelected(initialTab)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  //필터링 탭 초기화
  useEffect(() => {
    //스크롤 인식
    const handleScroll = () => {
      setScrollY(window.scrollY)
      window.sessionStorage.setItem('scroll', scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  //work 요소 클릭 시
  function handleWorkClick(key) {
    setClickedId(key)
    setTimeout(() => {
      router.push(`/works/${key}`, undefined, { shallow: true })
    }, 300)
  }

  //필터링 탭 클릭 시
  function handleTabClick(key) {
    tabRefs.current.forEach((ref, idx) => {
      if (ref) {
        ref.style.color = '#767676'
        ref.style.background =
          idx === key
            ? 'linear-gradient(90deg, #35CFFA 0%, #278FFB 20%, #3C79FB 40%, #DD4FFC 60%, #9734FB 80%, #7340FB 100%)'
            : 'none'
        ref.style.backgroundClip = idx === key ? 'text' : 'none'
        ref.style.webkitBackgroundClip = idx === key ? 'text' : 'none'
        ref.style.webkitTextFillColor = idx === key ? 'transparent' : 'inherit'
      }
    })
    indicatorRefs.current.forEach((indiRef, indiIdx) => {
      if (indiRef) {
        indiRef.style.opacity = indiIdx === key ? '1' : '0'
      }
    })
    setTabSelected(key)

    window.sessionStorage.setItem('tab', key)

    if (key === 0) {
      //all을 선택하면 가져온 데이터 모두로 set
      setFilteredWorks(defaultWorks)
    } else {
      //category와 string이 맞으면 필터링
      setFilteredWorks(
        defaultWorks.filter(el => el.category.includes(tabList[key]))
      )
    }
  }

  return (
    <main className={styles.main}>
      <header>
        <div className={styles.headerTitle}>OUR WORKS</div>
        <div className={styles.headerSummary}>
          {`ATC 2024, <코끼리를 냉장고에 넣는 방법>, 그리고 아테커들의 방식`}
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
            이 <span>방식</span>
            은 각기 다를 것입니다. 어떤 이는 냉장고를 확장하고, 다른 이는 코끼리를 축소합니다. 
            <br />
            또 어떤 이는 그 사이의 빈 공간을 새롭게 정의합니다. 어쩌면 세상에 없던것을 가져오는 사람도 있을지 모릅니다.
            <br />
            이 전시는 그 아트&테크놀로지에 속한 <span>아테커</span>
             각자의 <span>방법</span>을 보여주는 공간입니다.
          </div>
        </div>
      </header>
      <nav>
        <ul ref={tabListRef}>
          {tabList.map((el, key) => (
            <li
              key={key}
              ref={el => (tabRefs.current[key] = el)}
              onClick={() => handleTabClick(key)}>
              <span>{el}</span>
              <div
                className="indicator"
                ref={el => (indicatorRefs.current[key] = el)}></div>
            </li>
          ))}
        </ul>
      </nav>
      <section>
        {filteredWorks?.map(el => (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            layoutId={el._id}
            onClick={() => handleWorkClick(el._id)}
            className={styles.figure}
            key={el._id}>
            <Image
              // placeholder="blur"
              // blurDataURL={base64}
              className={styles.image}
              // src={el.thumbnailImg}
              src={'/images/works/page0.png'}
              alt={el.title}
              fill
              objectFit="cover"
            />
            <figcaption>
              <div className={styles.figBox}>
                <span className={styles.figTeam}>{el.teamName}</span>
                <span className={styles.figTitle}>{el.title}</span>
                <span className={styles.figDesc}>{el.oneLiner}</span>
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
