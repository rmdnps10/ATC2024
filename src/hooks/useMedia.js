import { useState, useEffect } from 'react'

const useMedia = query => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia(query).matches
    }
    return false // 기본값 (SSR 환경 대비)
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return 
    }

    const mediaQueryList = window.matchMedia(query)
    const listener = event => setMatches(event.matches)

    // 초기 상태 설정 및 이벤트 리스너 추가
    setMatches(mediaQueryList.matches)
    mediaQueryList.addEventListener('change', listener)

    // 정리 함수
    return () => {
      mediaQueryList.removeEventListener('change', listener)
    }
  }, [query])

  return matches
}

export default useMedia
