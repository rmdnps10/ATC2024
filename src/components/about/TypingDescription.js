'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './TypingDescription.module.css'
//
//
//
export default function TypingDescription() {
  const typingContent = [
    { type: 'text', text: "'코끼리를 냉장고에 넣는 방법'", font: 'Sandoll' },
    { type: 'text', text: '은', font: 'Pretendard' },
    {
      type: 'image',
      src: '/images/about/starBalloon.svg',
      alt: '별 이미지'
    },
    { type: 'text', text: '불가능해보이는 도전', font: 'Cafe' },
    { type: 'text', text: '에 대한 ', font: 'Pretendard' },
    { type: 'text', text: '아트&테크놀로지의 ', font: 'Pretendard' },
    { type: 'text', text: '물음', font: 'Sandoll' },
    {
      type: 'image',
      src: '/images/about/starCrystal2.svg',
      alt: '별 이미지'
    },
    { type: 'text', text: '입니다. 우리는 ', font: 'Pretendard' },
    { type: 'text', text: '예술과 기술 ', font: 'Cafe' },
    {
      type: 'image',
      src: '/images/about/starWood 1.svg',
      alt: '별 이미지'
    },
    { type: 'text', text: '이라는, ', font: 'Pretendard' },
    { type: 'text', text: '거대한 두 축 ', font: 'Cafe' },
    {
      type: 'image',
      src: '/images/about/starPaper.svg',
      alt: '별 이미지'
    },
    { type: 'text', text: '을 통해 이 물음에 ', font: 'Pretendard' },
    { type: 'text', text: '답', font: 'Sandoll' },
    { type: 'text', text: '하고자 합니다.', font: 'Pretendard' }
  ]

  const [renderedContent, setRenderedContent] = useState([])
  const [typingIndex, setTypingIndex] = useState({ current: 0, charIndex: 0 })
  const [isTypingStarted, setIsTypingStarted] = useState(false)
  const [isClient, setIsClient] = useState(false) // 클라이언트 확인용 상태 추가
  const typingInterval = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    setIsClient(true) // 클라이언트에서만 실행되도록 설정
  }, [])

  useEffect(() => {
    if (!isTypingStarted || !isClient) return

    const startTypingEffect = () => {
      typingInterval.current = setInterval(() => {
        const { current, charIndex } = typingIndex

        if (current >= typingContent.length) {
          clearInterval(typingInterval.current)
          return
        }

        const currentContent = typingContent[current]

        if (currentContent.type === 'text') {
          if (charIndex < currentContent.text.length) {
            setRenderedContent(prev => {
              const updated = [...prev]
              if (updated[current]?.type === 'text') {
                updated[current].text = currentContent.text.slice(
                  0,
                  charIndex + 1
                )
              } else {
                updated.push({
                  type: 'text',
                  text: currentContent.text.slice(0, charIndex + 1),
                  font: currentContent.font
                })
              }
              return updated
            })
            setTypingIndex({ current, charIndex: charIndex + 1 })
          } else {
            setTypingIndex({ current: current + 1, charIndex: 0 })
          }
        } else if (currentContent.type === 'image') {
          setRenderedContent(prev => [
            ...prev,
            { type: 'image', src: currentContent.src, alt: currentContent.alt }
          ])
          setTypingIndex({ current: current + 1, charIndex: 0 })
        }
      }, 100)
    }

    startTypingEffect()

    return () => {
      clearInterval(typingInterval.current)
    }
  }, [typingIndex, isTypingStarted, isClient])

  useEffect(() => {
    if (!isClient) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTypingStarted(true)
        }
      },
      { threshold: 0.8 } // 요소가 80% 이상 보이면 트리거
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isClient])

  if (!isClient) return null // 클라이언트에서만 렌더링

  return (
    <section
      ref={sectionRef}
      className={styles.description}>
      <article>
        {renderedContent.map((content, index) =>
          content.type === 'text' ? (
            <span
              key={`text-${index}`}
              className={
                content.font === 'Sandoll'
                  ? styles.SandollFont
                  : content.font === 'Pretendard'
                  ? styles.PretendardFont
                  : styles.CafeFont
              }>
              {content.text}
            </span>
          ) : (
            <Image
              key={`image-${index}`}
              src={content.src}
              alt={content.alt}
              width={78}
              height={56}
              priority
              className={styles.image}
            />
          )
        )}
      </article>
    </section>
  )
}
