import Header from './Header'
import { Pretendard } from '../font/Font'
import '@/style/global.css'
import Script from 'next/script'

export const metadata = {
  title: 'ATC 2024 : 코끼리를 냉장고에 넣는 방법',
  metadataBase: new URL('https://www.atc2024.site/'),
  description:
    '코끼리를 냉장고에 넣는 방법, 2024년 Art&Technology 컨퍼런스 아카이빙 웹'
}

export default function MainRootLayout({ children }) {
  return (
    <html
      lang="kr"
      className={`${Pretendard}`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
