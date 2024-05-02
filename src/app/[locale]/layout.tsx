import {Footer} from '@/components/footer'
import {Navbar} from '@/components/navbar'
import {Toaster} from '@/components/ui/sonner'
import {NextIntlClientProvider} from 'next-intl'
import {getMessages} from 'next-intl/server'

export default async function LocaleLayout({
  children,
  params: {locale},
}: {
  children: React.ReactNode
  params: {locale: string}
}) {
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
