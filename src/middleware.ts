import createMiddleware from 'next-intl/middleware'
import {i18n} from './config'

export default createMiddleware({
  // A list of all locales that are supported
  locales: i18n.locales,

  // Used when no locale matches
  defaultLocale: i18n.defaultLocale,
  localePrefix: i18n.localePrefix,
})

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(pt|en|fr|nl)/:path*'],
}
