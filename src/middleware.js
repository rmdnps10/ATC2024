import { NextResponse } from 'next/server'

export function middleware(req) {
  if (req.url !== '/') {
    return NextResponse.redirect(new URL('/', req.url))
  }
}

export const config = {
  matcher: [
    '/about',
    '/contact',
    '/program',
    '/credit',
    '/works',
    '/archive',
    '/map'
  ]
}
