import React from 'react'
import Link from 'next/link'
import { Plus, Heart, Download } from 'lucide-react'

const Liked = () => {
  return (
    <div className="flex flex-col h-screen p-8">
    <div className="flex justify-between mt-6 ml-1">
        <h1 className="text-3xl font-bold">Liked components</h1>
        <Link href="/create" className="flex items-center gap-1 bg-gray-200 px-4 py-2"> {/* why is this button here??? */}
          <Plus className="h-4 w-4" /> new component 
        </Link>
      </div>
      {/* maybe add filtering here? */}

      <div className="grid grid-cols-3 gap-4 mt-8">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="bg-gray-200 pt-5 px-5 pb-4">
            <h3 className="text-xl font-bold">My Awesome Button</h3>
            <p className="text-sm">Button</p>
            <p className="text-sm mt-2">
              This is the button description. I'm describing what the button is. or not.
            </p>
            <div className="flex items-center justify-between text-sm mt-2">
              <p>@somerandomuser</p>
              <div className="flex space-x-4">
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3" /> 293
                </span>
                <span className="flex items-center gap-1">
                  <Download className="h-3 w-3" /> 293
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/*TODO: add pagination*/}
      
    </div>
  )
}

export default Liked