import {useTranslations} from 'next-intl'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'

type Props = {
  photos: string[]
}

export function Photos({photos}: Props) {
  const t = useTranslations()
  return (
    <section id='photos'>
      <h2 className='font-medium text-2xl mb-5'>{t('photos')}</h2>
      <Carousel className='w-full max-w-[750px] mx-auto'>
        <CarouselContent>
          {photos.map((photo, index) => (
            <CarouselItem
              key={`photo_${index}`}
              className='flex justify-center items-center'
            >
              <Image
                src={`/carousel/${photo}`}
                alt={photo}
                width={1450 / 2}
                height={1512 / 2}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}
