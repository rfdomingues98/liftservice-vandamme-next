import {AbstractIntlMessages, useMessages, useTranslations} from 'next-intl'
import Image from 'next/image'
import {Card, CardContent, CardHeader, CardTitle} from './ui/card'
import {Dialog, DialogContent, DialogTrigger} from './ui/dialog'

const EXTRA_HOUR_PRICE = '40€'

export function Pricing() {
  const t = useTranslations('pricing')
  const messages = useMessages()
  const pricing = messages.pricing as AbstractIntlMessages
  const cards = Object.keys(pricing._cards)
  const sub = Object.keys(
    ((pricing as AbstractIntlMessages)._sub as AbstractIntlMessages).listItems
  )
  return (
    <section id='pricing' className='scroll-mt-20'>
      <h2 className='font-medium text-2xl mb-5'>{t('_title')}</h2>
      <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
        {cards.map((key, index) => (
          <Card key={`card_${index}`} className='rounded-sm shadow-lg flex-1'>
            <CardHeader>
              <CardTitle className='text-center'>
                {t(`_cards.${key}.title`)}
              </CardTitle>
            </CardHeader>
            <CardContent className='text-center'>
              <p>
                {t(`_cards.${key}.firstHour`)} {t(`onDemand`)}
              </p>
              <p>
                {t(`_cards.${key}.extraHour`)} {EXTRA_HOUR_PRICE}
                {t(`perHour`)}
              </p>
              <p>
                {t(`_cards.${key}.fullDay`)} {t(`onDemand`)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <br />
      <p>
        <b>{t('_sub.title')}</b>
      </p>
      <br />
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 items-center gap-6'>
        <div className='md:col-span-1 lg:col-span-2 mx-auto md:mx-0'>
          <Dialog>
            <DialogTrigger>
              <Image
                src='/map.jpeg'
                alt='map'
                width={972 / 2}
                height={874 / 2}
              />
            </DialogTrigger>
            <DialogContent className='max-w-[95vw] w-max p-0 overflow-hidden border-none'>
              <Image
                src='/map.jpeg'
                alt='map'
                width={972}
                height={874}
                className='mx-auto'
              />
            </DialogContent>
          </Dialog>
        </div>
        <ul className='md:col-span-1 lg:col-span-3 list-disc content-baseline list-inside pl-6 flex-auto'>
          {sub.map((key, index) => (
            <li key={`sub_${index}`}>{t(`_sub.listItems.${key}`)}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
