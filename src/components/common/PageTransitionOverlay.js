'use client'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from './PageTransitionOverlay.module.css'

const MIN_FIRST_LOAD_MS = 1500
const MIN_TRANSITION_MS = 800

// 첫 로드 시 모든 페이지에서 사용하는 정적 이미지를 일괄 프리로드
const PRELOAD_IMAGES = [
  '/images/about/StarBalloon.svg',
  '/images/about/StarCrystal2.svg',
  '/images/about/StarPaper.svg',
  '/images/about/StarWood 1.svg',
  '/images/about/component1.svg',
  '/images/about/component2.svg',
  '/images/about/component5.svg',
  '/images/works/branding1.svg',
  '/images/works/branding2.svg',
  '/images/works/branding3.svg',
  '/images/works/branding4.svg',
  '/images/works/branding5.svg',
  '/images/works/branding6.svg',
  '/images/works/branding7.svg',
  '/images/works/exit.svg',
  '/images/works/back.svg',
  '/images/program/subComponent1.svg',
  '/images/program/subComponent2.svg',
  '/images/map/editedloyola.svg',
  '/images/map/edited5floor.svg',
  '/images/map/edited4floor.svg',
  '/icon/logo/atc2024-elephant.webp',
  '/icon/logo/elephant-atc2024.webp',
  '/images/loading/loading.gif'
]

function preloadImages(srcs) {
  return Promise.all(
    srcs.map(
      src =>
        new Promise(resolve => {
          const img = new Image()
          img.onload = img.onerror = resolve
          img.src = src
        })
    )
  )
}

// phase: 'on' = 완전히 보임 | 'fading' = 서서히 사라짐 | 'off' = DOM에서 제거
export default function PageTransitionOverlay() {
  const pathname = usePathname()
  const [phase, setPhase] = useState('on')
  const phaseRef = useRef('on') // scheduleHide 클로저에서 최신 phase 참조용
  const pathnameRef = useRef(pathname)
  const showStartRef = useRef(Date.now())
  const timerRef = useRef(null)

  function setPhaseSync(next) {
    phaseRef.current = next
    setPhase(next)
  }

  function show() {
    clearTimeout(timerRef.current)
    showStartRef.current = Date.now()
    setPhaseSync('on')
  }

  function scheduleHide(minMs) {
    // 이미 꺼진 상태면 스킵 (credit 등 오버레이 미사용 페이지 이동 시 방어)
    if (phaseRef.current === 'off') return
    clearTimeout(timerRef.current)
    const elapsed = Date.now() - showStartRef.current
    const delay = Math.max(0, minMs - elapsed)
    timerRef.current = setTimeout(() => {
      setPhaseSync('fading')
      timerRef.current = setTimeout(() => setPhaseSync('off'), 350)
    }, delay)
  }

  // 첫 마운트: 이미지 + 폰트 프리로드 후 오버레이 해제
  useEffect(() => {
    const minTimer = new Promise(resolve =>
      setTimeout(resolve, MIN_FIRST_LOAD_MS)
    )
    Promise.all([minTimer, preloadImages(PRELOAD_IMAGES), document.fonts.ready])
      .then(() => scheduleHide(0))

    return () => clearTimeout(timerRef.current)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // 링크 클릭 시 즉시 오버레이 표시
  useEffect(() => {
    const handleClick = e => {
      const anchor = e.target.closest('a[href]')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (
        !href ||
        href.startsWith('http') ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.includes('#') // /page#section 형태 앵커도 제외
      )
        return
      if (href === pathname) return
      // credit 페이지는 자체 framer-motion 전환을 사용하므로 오버레이 제외
      if (pathname.startsWith('/credit') || href.startsWith('/credit')) return
      show()
    }

    // 브라우저 뒤로/앞으로 가기 (hash 변경은 pathname이 그대로이므로 무시)
    const handlePopState = () => {
      if (window.location.pathname === pathnameRef.current) return
      show()
    }

    document.addEventListener('click', handleClick)
    window.addEventListener('popstate', handlePopState)
    return () => {
      document.removeEventListener('click', handleClick)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [pathname])

  // pathname 변경 감지(네비게이션 완료) → 최소 시간 보장 후 숨김
  useEffect(() => {
    if (pathnameRef.current === pathname) return
    pathnameRef.current = pathname
    scheduleHide(MIN_TRANSITION_MS)
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  if (phase === 'off') return null

  return (
    <div className={`${styles.overlay} ${phase === 'fading' ? styles.fading : ''}`}>
      <img
        src="/images/loading/loading.gif"
        alt="로딩 중..."
        className={styles.gif}
      />
    </div>
  )
}
