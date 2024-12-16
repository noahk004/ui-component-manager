import React from 'react'
import { Plus, Heart, Download } from 'lucide-react'
import Link from 'next/link'

const Profile = () => {
  return (
    <div className="flex flex-col h-screen p-8"> {/* maybe make padding consistent across pages */}
      <div className="flex h-1/3 w-full bg-gray-200 items-center p-8">
        <div className="w-52 h-52 bg-blue-200 rounded-full" />
        <div className="flex flex-col ml-2 py-4 ml-8 h-full">
          <h1 className="text-4xl">@USERNAME</h1> {/* underline in figma, didnt make sense though */}
          <div className="ml-1"> {/* optional, i think it looks a little better */}
            <p className="mt-6 text-lg">Total likes: 23,193</p>
            <p className="mt-2 text-lg">Total downloads: 492,102</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-10 ml-1">
        <h1 className="text-3xl font-bold">Your components</h1>
        <Link href="/create" className="flex items-center gap-1 bg-gray-200 px-4 py-2">
          <Plus className="h-4 w-4" /> new component
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8"> {/* only 2 rows fit on my screen... */}
        {[...Array(6)].map((_, i) => (
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

export default Profile