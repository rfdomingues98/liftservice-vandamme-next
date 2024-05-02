import {About} from '@/components/about'
import {Contacts} from '@/components/contacts'
import {Hero} from '@/components/hero'
import {Photos} from '@/components/photos'
import {Pricing} from '@/components/pricing'
import {list} from '@vercel/blob'
import naturalCompare from 'natural-compare-lite'

export default async function Index() {
  const res = await list()
  const urls = res.blobs
    .sort((a, b) => naturalCompare(a.pathname, b.pathname))
    .filter((blob) => blob.size > 0)
    .map((blob) => blob.url)

  return (
    <>
      <Hero />
      <div className='container mx-auto relative h-full py-20 flex flex-col gap-y-28'>
        <About />
        <Pricing />
        <Photos photos={urls} />
        <Contacts />
      </div>
    </>
  )
}
