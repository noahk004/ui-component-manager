'use client'

import { X } from 'lucide-react'

interface FilterTagProps {
  label: string
  onRemove?: () => void
}

export default function FilterTag({ label, onRemove }: FilterTagProps) {
  return (
    <span className="px-2 py-0.5 bg-gray-200 rounded-lg flex items-center">
      <div className="ml-2 flex justify-center items-center text-sm">
        {label}
        {onRemove && (
          <button onClick={onRemove} className="ml-2">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </span>
  )
}
