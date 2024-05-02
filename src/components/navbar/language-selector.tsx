'use client'

import {mappedLocales} from '@/config'
import {usePathname} from '@/navigation'
import {useLocale} from 'next-intl'
import {useRouter} from 'next/navigation'
import {useTransition} from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import {GlobeIcon} from 'lucide-react'

const LanguageSelector = () => {
  const [isPending, startTransition] = useTransition()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function onSelectChange(value: string) {
    startTransition(() => {
      void router.replace(`/${value}${pathname}`)
    })
  }

  return (
    <Select
      defaultValue='pt'
      value={locale}
      disabled={isPending}
      onValueChange={onSelectChange}
      aria-label='Language Selector'
    >
      <SelectTrigger className='w-[100px] justify-end gap-2 border-none bg-transparent text-primary transition-all ease-in-out focus-within:text-primary hover:text-primary focus:text-primary active:text-primary shadow-none'>
        {(locale && getUnicodeFlagIcon(locale === 'en' ? 'us' : locale)) ?? (
          <GlobeIcon size={16} />
        )}
        <SelectValue className='flex items-center' placeholder='Language'>
          {locale.toUpperCase()}
        </SelectValue>
      </SelectTrigger>
      <SelectContent side='bottom' align='end'>
        <SelectItem value='pt'>
          {getUnicodeFlagIcon('PT')} {mappedLocales['pt'].name}
        </SelectItem>
        <SelectItem value='en'>
          {getUnicodeFlagIcon('US')} {mappedLocales['en'].name}
        </SelectItem>
        <SelectItem value='fr'>
          {getUnicodeFlagIcon('FR')} {mappedLocales['fr'].name}
        </SelectItem>
        <SelectItem value='nl'>
          {getUnicodeFlagIcon('NL')} {mappedLocales['nl'].name}
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

export default LanguageSelector
