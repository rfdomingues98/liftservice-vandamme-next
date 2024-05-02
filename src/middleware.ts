import {Ratelimit} from '@upstash/ratelimit'
import {kv} from '@vercel/kv'
import createMiddleware from 'next-intl/middleware'
import {NextRequest, NextResponse} from 'next/server'
import {i18n} from './config'

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: i18n.locales,

  // Used when no locale matches
  defaultLocale: i18n.defaultLocale,
  localePrefix: i18n.localePrefix,
})

const ratelimit = new Ratelimit({
  redis: kv,

  // 5 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(5, '3600 s'),
})

export default async function middleware(req: NextRequest) {
  const ip = req.ip ?? '127.0.0.1'
  if (req.method === 'POST') {
    const {success, pending, limit, reset, remaining} = await ratelimit.limit(
      ip
    )
    if (!success) {
      return NextResponse.json({error: 'Too many requests'}, {status: 429})
    }
  }
  const response = intlMiddleware(req)
  return response
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(pt|en|fr|nl)/:path*'],
}
