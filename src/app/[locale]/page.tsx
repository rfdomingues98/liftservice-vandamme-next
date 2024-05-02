import {About} from '@/components/about'
import {Contacts} from '@/components/contacts'
import {Hero} from '@/components/hero'
import {Photos} from '@/components/photos'
import {Pricing} from '@/components/pricing'
import fs from 'fs'
import naturalCompare from 'natural-compare-lite'

export default function Index() {
  const carouselPhotos = fs
    .readdirSync('./public/carousel')
    .sort((a, b) => naturalCompare(a, b))

  return (
    <>
      <Hero />
      <div className='container mx-auto relative h-full py-20 flex flex-col gap-y-28'>
        <About />
        <Pricing />
        <Photos photos={carouselPhotos} />
        <Contacts />
      </div>
    </>
  )
}
