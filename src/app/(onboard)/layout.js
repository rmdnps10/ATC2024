import '@/style/global.css'

export const metadata = {
  title: 'ATC 2024 온보딩 페이지',
  metadataBase: new URL('https://www.atc2024.site/'),
  description:
    '코끼리를 냉장고에 넣는 방법, 2024년 Art&Technolgoy 컨퍼런스 웹의 온보딩 페이지',
  keywords: ['ATC 2024', '온보딩', 'Art&Technology', '컨퍼런스'],
  author: 'ATC Team',
  viewport: 'width=device-width, initial-scale=1.0',
  charset: 'UTF-8',
  robots: 'index, follow'
}

export default function OnBoardRootLayout({ children }) {
  return <>{children}</>
}
