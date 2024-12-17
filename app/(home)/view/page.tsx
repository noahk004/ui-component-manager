import React from 'react'
import { Heart, Download } from 'lucide-react'

const ViewPage = () => {
  return (
    <div className="p-12">
      <div className="flex flex-col pl-4 py-4 border-b-2 border-black">

        <p className="text-sm ml-0.5">Button</p>

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Component</h1>
          <div className="flex items-center justify-between bg-gray-200 px-4 py-3 rounded-full gap-32 text-sm">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4" /> Like
            </div>
            <p>8,289</p>
          </div>
        </div>

        <p className="text-sm ml-0.5">Published November 21, 2024</p>
      </div>

      <div className="flex py-4 pl-4">
        <div className="flex flex-col w-3/4">
          <p className="text-sm">Description. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <h1 className="text-xl font-bold mt-6">Getting Started</h1>
          <p className="text-sm mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do 
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
            sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

          <div className="flex items-center justify-center h-52 w-full bg-gray-200 mt-6 relative">
            <div className="flex items-center justify-center h-12 w-40 bg-white rounded-full font-bold text-lg">My Button</div>
            <div className="absolute bottom-2 right-4 text-sm">Enlarge</div>
          </div>

          <div className="mt-6">
            <code className="mb-2 text-sm">my-component.tsx</code>
            <pre className="bg-gray-200 p-4 text-sm mt-2"> {/* this formatting is so ugly */}
              <code>{`// My Component
// Made by user

import "./styles.module.css"

export default function MyComponent() {
  return (
    <button>My Button</button>
  )
}`}           </code>
            </pre>
          </div>
        </div>

        <div className="flex flex-col w-[22.5%] pt-10 ml-8">

          <div className="flex flex-col pb-6 border-b-2 border-black">
            <p className="text-sm">Installation</p>
            <div className="flex justify-center items-center p-3 bg-gray-200 rounded-xl mt-2 ">
              <code className="text-sm">uicm i my-component</code>
            </div>
          </div>

          <div className="flex flex-col pb-6 pl-6 border-b-2 border-black">
            <div className="flex items-center gap-2 mt-4 items-center"> {/*looks offcentered vertically*/}
              <Download className="h-4 w-4" />
              <p className="text-sm">Downloads</p>
            </div>
            <p className="text-2xl mt-1">39,193</p>
          </div>

          <div className="flex flex-col pb-6 pl-4 border-b-2 border-black"> {/*maybe align pl of the divs*/}
            <p className="mt-2">Tags</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="px-6 py-1 bg-gray-200 rounded-lg text-sm">Button</div>
              <div className="px-6 py-1 bg-gray-200 rounded-lg text-sm">Modern</div>
              <div className="px-6 py-1 bg-gray-200 rounded-lg text-sm">Tag</div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6 pl-4">
            <div className="h-10 w-10 rounded-full bg-blue-200"></div>
            <div className="flex flex-col">
              <p className="text-sm font-medium">@username</p>
              <a href="/profile" className="text-sm underline">View profile</a>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default ViewPage