import {cn} from '@/lib/utils'
import Image from 'next/image'

export function Hero() {
  return (
    <section
      className={cn(
        'relative h-[calc(100vh-80px)]',
        'after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-b from-white/0 via-95% via-white/0 to-white after:content-[""]'
      )}
    >
      <Image
        src='/hero.jpg'
        fill
        alt='Hero image'
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
    </section>
  )
}
