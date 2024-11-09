'use client'
import { useParams } from 'next/navigation'
import styles from './page.module.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getWorkDetail } from '@/client-api/getWorkDetail'
import Image from 'next/image'
import WorkDetailModal from '@/components/works/WorkDetailModal'
import Loading from '../../loading'
import GuestBook from '@/components/works/GuestBook'
import { putWorkDetail } from '@/client-api/putWorkDetail'
import { log } from 'three/webgpu'
//
//
//
export default function WorkDetailPage() {
  const pathname = useParams()
  const router = useRouter()
  const [isClicked, setIsClicked] = useState(false)
  const [detailData, setDetailData] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [nickname, setNickname] = useState('')
  const [content, setContent] = useState('')
  //data fetching
  useEffect(() => {
    if (pathname.id) {
      const fetchData = async () => {
        const data = await getWorkDetail(pathname.id)
        if (data) {
          const parsed = { ...data, category: data.category.split(',') }
          if (parsed._id === '672cea5b0c11e50dbd25fa13') {
            parsed.title = parsed.title.split('(')[0]
          }
          setDetailData(parsed)
        }
      }
      fetchData()
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }, 100)
  }, [])

  function handleExit() {
    setIsClicked(true)
    setTimeout(() => {
      router.back()
    }, 330)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const handleNameChange = e => {
    setNickname(e.target.value)
  }

  const handleContentChange = e => {
    setContent(e.target.value)
  }

  function handleSubmit() {
    //db에 올리기
    try {
      if (pathname.id) {
        const postData = async () => {
          const updatedData = await putWorkDetail({
            id: pathname.id,
            name: nickname,
            comment: content
          })

          if (updatedData) {
            setDetailData(prevData => ({
              ...prevData,
              commentList: updatedData.commentList // 업데이트된 commentList
            }))
          }
        }
        postData()
      }
    } catch (e) {
      console.error(e)
    } finally {
      setContent('')
      setNickname('')
    }
  }

  return (
    <AnimatePresence>
      {!isClicked && (
        <motion.div
          key={pathname.id}
          initial={animate.initial}
          animate={animate.animate}
          exit={animate.exit}
          transition={animate.transition}>
          {detailData ? (
            <main
              className={styles.main}
              // onClick={handleExit}
            >
              <div className={styles.headerImageDiv}>
                <Image
                  className={styles.headerImage}
                  src={'/images/works/page0.png'}
                  alt="header image"
                  layout="fill"
                  // placeholder="blur"
                  objectFit="cover"
                />
                <Image
                  onClick={() => handleExit()}
                  className={styles.back}
                  width={30}
                  height={30}
                  src="/images/works/back.svg"
                  alt="back"
                />
              </div>
              <header>
                <h1>
                  <span>{detailData.title}</span>
                  <span>
                    <div>
                      <Image
                        src={'/images/works/branding7.svg'}
                        alt="elephant Icon"
                        width={40}
                        height={40}
                        priority={false}
                      />
                    </div>
                  </span>
                </h1>
                <h3>{detailData.oneLiner}</h3>
                <div className={styles.headerDesc}>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: detailData.description.replace(/\n/g, '<br/>')
                    }}
                  />
                  <nav>
                    <ul>
                      <li>작품 위치 | {detailData.space}</li>
                      {detailData.openAddress?.split(',').map((el, key) => (
                        <a
                          key={key}
                          href={el}
                          target="_blank">
                          작품 외부주소 ↗
                        </a>
                      ))}
                    </ul>
                  </nav>
                </div>
              </header>
              <div className={styles.introduceBox}>
                {'/images/works/page5.png,/images/works/page6.png,/images/works/page9.png,/images/works/page10.png'
                  .split(',')
                  .map((el, key) => (
                    <figure
                      key={key}
                      className={styles.introduceImage}>
                      <Image
                        // className={styles.headerImage}
                        key={key}
                        src={el}
                        alt="detail image"
                        fill
                        objectFit="contain"
                        // placeholder="blur"
                      />
                    </figure>
                  ))}
              </div>
              <section>
                <h1 className={styles.maxMobile}>아티스트</h1>
                <figure>
                  <Image
                    className={styles.teamImage}
                    src={'/images/works/elephant2.png'}
                    alt="artist image"
                    layout="fill"
                    objectFit="cover"
                    // placeholder="blur"
                  />
                </figure>
                <div className={styles.teamDesc}>
                  <h1>아티스트</h1>
                  <div className={styles.artistDetail}>
                    <div className={styles.teamBox}>
                      <h2>{detailData.teamName}</h2>
                      <div className={styles.nameList}>
                        {detailData.artistName?.split(',').map((name, key) => (
                          <span key={key}>{name}</span>
                        ))}
                      </div>
                    </div>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: detailData.artistIntroduction.replace(
                          /\n/g,
                          '<br/>'
                        )
                      }}
                    />
                  </div>
                  <button onClick={() => setModalOpen(prev => !prev)}>
                    <span>아티스트 인터뷰 보기</span>
                  </button>
                </div>
              </section>
              <form>
                <input
                  type="name"
                  required
                  id="name"
                  value={nickname}
                  placeholder="닉네임"
                  maxLength={6}
                  onChange={e => handleNameChange(e)}
                />
                <textarea
                  required
                  value={content}
                  id="content"
                  onChange={e => handleContentChange(e)}
                />
                <div>
                  <span onClick={() => handleSubmit()}>
                    <div>방명록 작성하기</div>
                  </span>
                </div>
              </form>
              <GuestBook comment={detailData.commentList} />
              {modalOpen && (
                <div className={styles.modalPortal}>
                  <WorkDetailModal
                    teamName={detailData.teamName}
                    setModalOpen={handleCloseModal}
                    interviewText={detailData.interviewText}
                  />
                </div>
              )}
            </main>
          ) : (
            <div>
              <Loading />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const animate = {
  initial: {
    transform: `translateY(50px)`,
    opacity: 0,
    transition: `transform 0.33s ease`
  },
  animate: {
    transform: `translateY(0px)`,
    opacity: 1,
    transition: `transform 0.33s ease`
  },
  exit: {
    transform: `translateY(50px)`,
    transition: `transform 0.33s ease`
  },
  transition: { ease: 'ease', duration: 0.33 }
}
