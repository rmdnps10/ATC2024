import { NextResponse } from 'next/server'

export function middleware(req) {
  const cookies = req.cookies
  const isOnboarded = cookies.get('isOnboarded')

  // 사용자가 처음 방문하는 경우
  if (!isOnboarded) {
    // 쿠키 설정
    const response = NextResponse.redirect(new URL('/onboard', req.url))
    response.cookies.set('isOnboarded', 'true', {
      path: '/',
      httpOnly: true, // 클라이언트 쪽에서 접근 불가능
      maxAge: 60 * 60 * 24 * 30 // 30일
    })
    return response
  }

  // 사용자가 이미 온보딩을 완료한 경우
  return NextResponse.next()
}

export const config = {
  matcher: '/' // 이 미들웨어가 작동할 경로
}
