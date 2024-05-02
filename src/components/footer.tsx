'use client'

import {useEffect, useState} from 'react'

export function Footer() {
  const [year, setYear] = useState(new Date().getFullYear())

  useEffect(() => {
    // Update the year when the component mounts
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer className='h-20 py-4 bg-gray-50 flex items-center justify-center'>
      Copyright © {year}
    </footer>
  )
}
