import localFont from 'next/font/local'

export const Pretendard = localFont({
  variable: '--font-pretendard',
  preload: false,
  // optional: 첫 방문 시 빠르게 못 불러오면 fallback 사용, 캐시 후 다음 방문부터 적용
  // swap 대비 크리티컬 패스에서 woff2 2.2MB 제외 → LCP 단축
  display: 'optional',
  src: [
    {
      path: './Pretendard-Bold.woff2',
      weight: '600'
    },
    {
      path: './Pretendard-Medium.woff2',
      weight: '500'
    },
    {
      path: './Pretendard-Regular.woff2',
      weight: '400'
    },
    {
      path: './Pretendard-ExtraLight.woff2',
      weight: '200'
    }
  ]
})
