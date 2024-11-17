'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './TypingDescription.module.css'
//
//
//
export default function TypingDescription() {
  const typingContent = [
    { type: 'text', text: "'코끼리를 냉장고에 넣는 방법'", font: 'Sandoll' },
    { type: 'text', text: '은', font: 'Pretendard' },
    { type: 'image', src: '/images/about/StarBalloon.svg', alt: '별 이미지' },
    { type: 'text', text: '불가능해보이는 도전', font: 'Cafe' },
    { type: 'text', text: '에 대한 ', font: 'Pretendard' },
    { type: 'text', text: '아트&테크놀로지의 ', font: 'Pretendard' },
    { type: 'text', text: '물음', font: 'Sandoll' },
    { type: 'image', src: '/images/about/StarCrystal2.svg', alt: '별 이미지' },
    { type: 'text', text: '입니다. 우리는 ', font: 'Pretendard' },
    { type: 'text', text: '예술과 기술 ', font: 'Cafe' },
    { type: 'image', src: '/images/about/StarWood 1.svg', alt: '별 이미지' },
    { type: 'text', text: '이라는, ', font: 'Pretendard' },
    { type: 'text', text: '거대한 두 축 ', font: 'Cafe' },
    { type: 'image', src: '/images/about/StarPaper.svg', alt: '별 이미지' },
    { type: 'text', text: '을 통해 이 물음에 ', font: 'Pretendard' },
    { type: 'text', text: '답', font: 'Sandoll' },
    { type: 'text', text: '하고자 합니다.', font: 'Pretendard' }
  ]

  const [renderedContent, setRenderedContent] = useState([])
  const [typingIndex, setTypingIndex] = useState({ current: 0, charIndex: 0 })
  const [isTypingStarted, setIsTypingStarted] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!isTypingStarted) return

    const typeContent = () => {
      const { current, charIndex } = typingIndex
      if (current >= typingContent.length)
        return clearInterval(typingInterval.current)

      const currentItem = typingContent[current]

      setRenderedContent(prev => {
        const updatedContent = [...prev]
        if (currentItem.type === 'text') {
          const textToRender = currentItem.text.slice(0, charIndex + 1)
          if (updatedContent[current]?.type === 'text') {
            updatedContent[current].text = textToRender
          } else {
            updatedContent.push({
              type: 'text',
              text: textToRender,
              font: currentItem.font
            })
          }
        } else if (currentItem.type === 'image') {
          updatedContent.push({
            type: 'image',
            src: currentItem.src,
            alt: currentItem.alt
          })
        }
        return updatedContent
      })

      if (
        currentItem.type === 'text' &&
        charIndex < currentItem.text.length - 1
      ) {
        setTypingIndex({ current, charIndex: charIndex + 1 })
      } else {
        setTypingIndex({ current: current + 1, charIndex: 0 })
      }
    }

    const typingInterval = setInterval(typeContent, 100)
    return () => clearInterval(typingInterval)
  }, [isTypingStarted, typingIndex])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsTypingStarted(true),
      { threshold: 0.8 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => sectionRef.current && observer.unobserve(sectionRef.current)
  }, [])

  return (
    <section
      ref={sectionRef}
      className={styles.description}>
      <article>
        {renderedContent.map((content, index) =>
          content.type === 'text' ? (
            <span
              key={`text-${index}`}
              className={styles[`${content.font}Font`] || styles.defaultFont}>
              {content.text}
            </span>
          ) : (
            <img
              key={`image-${index}`}
              src={content.src}
              alt={content.alt}
              loading="eager"
            />
          )
        )}
      </article>
    </section>
  )
}
