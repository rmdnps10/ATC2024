import { useEffect, useRef } from 'react'
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
    { type: 'text', text: '답', font: 'Pretendard' },
    { type: 'text', text: '하고자 합니다.', font: 'Pretendard' }
  ]

  let index = 0
  let textIndex = 0
  const typingSpeed = 50
  const sectionRef = useRef(null)
  const cursorRef = useRef(null)

  useEffect(() => {
    const targetElement = document.querySelector(
      `.${styles.description} article`
    )
    if (!targetElement) return

    const startTypingEffect = () => {
      const interval = setInterval(() => {
        if (index < typingContent.length) {
          const content = typingContent[index]

          if (content.type === 'text') {
            if (textIndex < content.text.length) {
              const span = document.createElement('span')
              span.className =
                content.font === 'Sandoll'
                  ? styles.SandollFont
                  : content.font === 'Pretendard'
                  ? styles.PretendardFont
                  : styles.CafeFont
              span.textContent = content.text.charAt(textIndex)
              targetElement.appendChild(span)
              textIndex++
            } else {
              textIndex = 0
              index++
            }
            // 커서를 마지막 텍스트 오른쪽으로
            updateCursorPosition()
          } else if (content.type === 'image') {
            const img = document.createElement('img')
            img.src = content.src
            img.alt = content.alt
            img.className = styles.image

            img.onload = () => {
              // 이미지 로드 후 커서 위치 업데이트하기
              updateCursorPosition()
            }

            targetElement.appendChild(img)
            index++
          }
        } else {
          clearInterval(interval)
        }
      }, typingSpeed)
    }

    const updateCursorPosition = () => {
      const lastElement = targetElement.lastChild
      if (lastElement && cursorRef.current) {
        const rect = lastElement.getBoundingClientRect()
        const parentRect = targetElement.getBoundingClientRect()

        cursorRef.current.style.top = `${rect.top - parentRect.top}px`
        cursorRef.current.style.left = `${rect.right - parentRect.left}px`
      }
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          startTypingEffect()
          observer.disconnect()
        }
      },
      { threshold: 0.8 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={styles.description}>
      <article>
        <span
          ref={cursorRef}
          className={styles.cursor}></span>{' '}
      </article>
    </section>
  )
}
