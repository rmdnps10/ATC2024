import localFont from 'next/font/local'

export const Pretendard = localFont({
  variable: '--font-pretendard',
  preload: false,
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
