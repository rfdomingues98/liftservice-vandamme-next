import {Footer} from '@/components/footer'
import {Navbar} from '@/components/navbar'
import {Toaster} from '@/components/ui/sonner'
import {i18n} from '@/config'
import {NextIntlClientProvider} from 'next-intl'
import {getMessages, unstable_setRequestLocale} from 'next-intl/server'

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({locale}))
}

export default async function LocaleLayout({
  children,
  params: {locale},
}: {
  children: React.ReactNode
  params: {locale: string}
}) {
  unstable_setRequestLocale(locale)
  const messages = await getMessages()
  return (
    <html lang={locale} className='scroll-smooth'>
      <body className='relative min-h-screen'>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Footer />
          <Toaster closeButton richColors position='top-right' />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
