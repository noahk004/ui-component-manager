'use client'

import Link from 'next/link'
import { Heart, Download } from 'lucide-react'

interface ComponentCardProps {
  title: string
  type: string
  description: string
  username: string
  likes: number
  downloads: number
  href: string
}

export default function ComponentCard({
  title,
  type,
  description,
  username,
  likes,
  downloads,
  href = '/view'
}: ComponentCardProps) {
  return (
    <Link href={href} className="bg-gray-200 pt-5 px-5 pb-4">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm">{type}</p>
      <p className="text-sm mt-2">{description}</p>
      <div className="flex items-center justify-between text-sm mt-2">
        <p>{username}</p>
        <div className="flex space-x-4">
          <span className="flex items-center gap-1">
            <Heart className="h-3 w-3" /> {likes}
          </span>
          <span className="flex items-center gap-1">
            <Download className="h-3 w-3" /> {downloads}
          </span>
        </div>
      </div>
    </Link>
  )
}