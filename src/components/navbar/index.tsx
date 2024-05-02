import {Link} from '@/navigation'
import {HamburgerMenuIcon} from '@radix-ui/react-icons'
import {
  CameraIcon,
  HomeIcon,
  InfoIcon,
  PhoneIcon,
  WalletIcon,
} from 'lucide-react'
import {useTranslations} from 'next-intl'
import Image from 'next/image'
import {Button} from '../ui/button'
import {Sheet, SheetContent, SheetTrigger} from '../ui/sheet'
import LanguageSelector from './language-selector'

const ICON_SIZE = 16

export function Navbar() {
  return (
    <nav className='max-h-20 sticky top-0 py-4 shadow bg-white z-10'>
      <div className='container mx-auto flex justify-between '>
        <Link href='/'>
          <Image
            src='/logo.png'
            alt='logo'
            width={160}
            height={60}
            style={{height: 'auto'}}
            priority
          />
        </Link>
        <Menu />
      </div>
    </nav>
  )
}

function Menu() {
  const t = useTranslations('navbar')
  const items = [
    {id: '', label: t('_navHome'), icon: <HomeIcon size={ICON_SIZE} />},
    {id: '#about', label: t('_navAbout'), icon: <InfoIcon size={ICON_SIZE} />},
    {
      id: '#pricing',
      label: t('_navPricing'),
      icon: <WalletIcon size={ICON_SIZE} />,
    },
    {
      id: '#photos',
      label: t('_navPhotos'),
      icon: <CameraIcon size={ICON_SIZE} />,
    },
    {
      id: '#contacts',
      label: t('_navContacts'),
      icon: <PhoneIcon size={ICON_SIZE} />,
    },
  ]

  return (
    <>
      <DesktopMenu items={items} />
      <MobileMenu items={items} />
    </>
  )
}

type MenuProps = {
  items: {
    id: string
    label: string
    icon: JSX.Element
  }[]
}
function DesktopMenu({items}: MenuProps) {
  return (
    <div className='hidden lg:flex items-center gap-6'>
      <ul className='list-none flex gap-6'>
        {items.map((item) => (
          <li key={item.label} className='hover:text-blue-500'>
            <a href={`${item.id}`} className='flex items-center gap-2'>
              {item.icon}
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <LanguageSelector />
    </div>
  )
}

function MobileMenu({items}: MenuProps) {
  return (
    <div className='flex items-center lg:hidden'>
      <Sheet>
        <SheetTrigger>
          <HamburgerMenuIcon />
        </SheetTrigger>
        <SheetContent className='w-screen sm:w-[500px] max-w-screen sm:max-w-screen flex flex-col py-10 items-center'>
          {items.map((item) => (
            <Button variant='link' key={item.label} asChild className='w-max'>
              <a href={`${item.id}`} className='flex items-center gap-2'>
                {item.icon}
                {item.label}
              </a>
            </Button>
          ))}
          <LanguageSelector />
        </SheetContent>
      </Sheet>
    </div>
  )
}
