import {FacebookIcon} from 'lucide-react'
import {useTranslations} from 'next-intl'
import Link from 'next/link'
import {Separator} from '../ui/separator'
import {ContactsForm} from './form'

export function Contacts() {
  const t = useTranslations('contacts')
  return (
    <section id='contacts'>
      <h2 className='font-medium text-2xl mb-5'>{t('_contactsTitle')}</h2>
      <div className='grid grid-cols-1 lg:grid-cols-11 gap-6 justify-center items-center place-items-center'>
        <ContactsForm className='col-span-full lg:col-span-5 w-full space-y-4' />
        <Separator
          className='hidden lg:block lg:col-span-1'
          orientation='vertical'
        />
        <div className='col-span-full lg:col-span-5 flex flex-col items-center text-center justify-center w-full'>
          <p>Bob Vandamme</p>
          <p>(+351) 915 437 480</p>
          <Link
            className='text-blue-500 hover:text-blue-500/90'
            href='mailto:geral@liftservice-vandamme.pt'
          >
            geral@liftservice-vandamme.pt
          </Link>
          <p>Praia de Mira</p>
          <Link
            href='https://www.facebook.com/LiftserviceVandamme'
            className='flex items-center gap-2 text-blue-500 hover:text-blue-500/90'
            target='_blank'
          >
            <FacebookIcon size={18} /> Facebook
          </Link>
        </div>
      </div>
    </section>
  )
}
