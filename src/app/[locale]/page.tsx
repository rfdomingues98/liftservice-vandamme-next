import {About} from '@/components/about'
import {Contacts} from '@/components/contacts'
import {Hero} from '@/components/hero'
import {Photos} from '@/components/photos'
import {Pricing} from '@/components/pricing'
import {getAssets} from '@/lib/assets'
import {unstable_setRequestLocale} from 'next-intl/server'

// Serve a static page and refresh the media list at most once per hour
export const revalidate = 3600

export default async function Index({
  params: {locale},
}: {
  params: {locale: string}
}) {
  unstable_setRequestLocale(locale)
  const {photos, video} = await getAssets()

  return (
    <>
      <Hero />
      <div className='container mx-auto relative h-full py-20 flex flex-col gap-y-28'>
        <About video={video} />
        <Pricing />
        <Photos photos={photos} />
        <Contacts />
      </div>
    </>
  )
}
