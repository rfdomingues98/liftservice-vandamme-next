import {AbstractIntlMessages, useMessages, useTranslations} from 'next-intl'
import {Button} from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

type Messages = {
  [id: string]: string | string[] | Messages
}

export function About() {
  const t = useTranslations('about')
  const messages = useMessages()
  const about = messages.about
  const main = Object.keys((about as AbstractIntlMessages)._main)
  const sub = Object.keys(
    ((about as AbstractIntlMessages)._sub as AbstractIntlMessages).listItems
  )
  const conditions = Object.keys(
    ((about as AbstractIntlMessages)._conditions as AbstractIntlMessages)
      .listItems
  )
  return (
    <section id='about' className='scroll-mt-20'>
      <h2 className='font-medium text-2xl mb-5'>{t('_title')}</h2>
      <div className='grid gap-6 grid-cols-1 lg:grid-cols-2 items-center'>
        <div className='flex-1'>
          {main.map((key, index) => (
            <p key={`main_${index}`}>{t(`_main.${key}`)}</p>
          ))}
          <br />
          <p>
            <b>{t('_sub.title')}</b>
          </p>
          <ul className='list-disc content-baseline list-inside pl-6'>
            {sub.map((key, index) => (
              <li key={`sub_${index}`}>{t(`_sub.listItems.${key}`)}</li>
            ))}
          </ul>
          <Dialog>
            <DialogTrigger asChild>
              <Button className='bg-blue-500 hover:bg-blue-500/90 my-4'>
                {t('_conditions.button')}
              </Button>
            </DialogTrigger>
            <DialogContent className='max-w-2xl'>
              <DialogHeader>
                <DialogTitle>{t('_conditions.button')}</DialogTitle>
              </DialogHeader>
              {conditions.map((key, index) => (
                <li key={`condition_${index}`}>
                  {t(`_conditions.listItems.${key}`)}
                </li>
              ))}
            </DialogContent>
          </Dialog>
        </div>
        <div className='flex-1 lg:flex-1'>
          <video className='w-full max-h-[500px]' controls muted>
            <source src='/video.mp4' type='video/mp4' />
          </video>
        </div>
      </div>
    </section>
  )
}
