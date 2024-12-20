import Header from './Header'
import '@/style/global.css'

export const metadata = {
  title: 'ATC 2024 : 코끼리를 냉장고에 넣는 방법',
  metadataBase: new URL('https://www.atc2024.site/'),
  description:
    '코끼리를 냉장고에 넣는 방법, 2024년 Art&Technology 컨퍼런스 아카이빙 웹'
}

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
