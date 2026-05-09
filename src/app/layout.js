import { Pretendard } from './font/Font'
import '@/style/global.css'
import Script from 'next/script'
import Metrices from './metrices'
//
//
//
export default function RootLayout({ children }) {
  return (
    <html
      lang="kr"
      className={`${Pretendard.className}`}>
      <head>
        {/* Sandoll FontStream 크리티컬 패스 단축: DNS + TCP + TLS 미리 연결 */}
        <link rel="preconnect" href="https://media.sandollcloud.com" />
        <link
          rel="preconnect"
          href="https://qns2c88qif.execute-api.ap-northeast-2.amazonaws.com"
        />
      </head>
      {/* 산돌 서울 폰트 */}
      <Script
        type="module"
        src="https://qns2c88qif.execute-api.ap-northeast-2.amazonaws.com/v1/api/js/drop_fontstream_js/?sid=gAAAAABnEfOOGnfu2yeZbBhu-sOVzV8N3b3FtQVQ_KyZLi9JVqc7Li43-jA13mQwm1hFaVfDg9mzc9qYZtyfZM1WwmwmZcoBnJy24y2MyBFRZ3FZSrQ_6IDFYyztXCtOdt4sWPMkRnWBilAj5QuTjylSQ6L-UFcBdONQRMT-Wjnj0thxqwWeTqoLWIV9ArlQsCwqXRhHewUFs2fswGvV02VnDi2RAqMnzRL1xK7YS_9jkBd1Xn212cFbbO42khICT1RBDMyMefkj"
        charset="utf-8"></Script>
      <body>
        {children}
        <Metrices />
      </body>
    </html>
  )
}
