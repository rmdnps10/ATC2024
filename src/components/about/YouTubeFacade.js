'use client'
import { useState } from 'react'
import styles from './YouTubeFacade.module.css'

// YouTube iframe을 즉시 로드하면 YouTube Player JS (~500KB)가 메인스레드를 블로킹함
// Facade 패턴: 썸네일 + 클릭 시 iframe으로 교체 → TBT/LCP 대폭 절감
export default function YouTubeFacade({ videoId, title }) {
  const [activated, setActivated] = useState(false)

  if (activated) {
    return (
      <iframe
        className={styles.iframe}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    )
  }

  return (
    <button
      className={styles.facade}
      onClick={() => setActivated(true)}
      aria-label={`${title} 재생`}>
      {/* 뷰포트 내 LCP 후보 → lazy 제거, fetchpriority 명시 */}
      <img
        className={styles.thumbnail}
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        fetchPriority="high"
      />
      <span className={styles.playButton} aria-hidden="true">
        <svg
          viewBox="0 0 68 48"
          width="68"
          height="48">
          <path
            d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
            fill="#f00"
          />
          <path
            d="M 45,24 27,14 27,34"
            fill="#fff"
          />
        </svg>
      </span>
    </button>
  )
}
