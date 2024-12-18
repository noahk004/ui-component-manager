'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const links = [
  { href: '/dashboard', label: 'Browse' },
  { href: '/profile', label: 'View Profile' },
  { href: '/liked', label: 'Liked components' },
  { href: '/create', label: 'Create Component' },
]

export default function Sidebar() {
  const pathname = usePathname()
  return (
    <div className="w-1/4 bg-gray-200 p-6 flex flex-col">
      <h1 className="text-3xl font-bold">Logo</h1>
      <nav className="flex flex-col space-y-2 mt-10 ml-1">
        {links.map(({ href, label }) => (
          <Link key={href} href={href} className={clsx("text-xl", {
            'font-semibold': href === pathname,
          })}>
            {label}
          </Link>
        ))}
      </nav>
      <div className="flex flex-row mt-auto">
        <div className="w-20 h-20 bg-blue-200 rounded-full" />
        <div className="flex flex-col ml-2 py-4 text-sm">
          <p className="underline">@USERNAME</p>
          <Link href="/login" className="mt-auto underline font-semibold">Log Out</Link>
        </div>
      </div>
    </div>
  )
}