import React from 'react'
import { X, Filter, Heart, Download } from 'lucide-react'
import Link from 'next/link'

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen p-12">
      <h1 className="text-3xl font-bold mt-4">Find a component</h1>
      <div className="flex space-x-8 mt-6">
        <input 
          type="text" 
          placeholder="Search" 
          className="flex-1 px-8 py-4 text-xl bg-gray-200 rounded-2xl placeholder:text-black" 
        />  
        <button className="bg-gray-200 px-10 text-xl py-4 rounded-2xl">Submit</button>
      </div>

      <div className="flex items-center justify-between mt-3 pr-2"> {/* right padding to match figma, removeable */}
        <div className="flex space-x-2">
          <span className="px-2 py-0.5 bg-gray-200 rounded-lg flex items-center">
            <div className="ml-2 flex justify-center items-center text-sm">
              Button <X className="ml-2 h-4 w-4" />
            </div>
          </span>
          <span className="px-2 py-0.5 bg-gray-200 rounded-lg flex items-center">
            <div className="ml-2 flex justify-center items-center text-sm">
              Sleek <X className="ml-2 h-4 w-4" />
            </div>
          </span>
        </div>
        <div className="px-4 py-0.5 bg-gray-200 rounded-xl flex items-center text-sm">
          Filters <Filter className="ml-2 h-4 w-4" />
        </div>
      </div>

      <p className="my-4 ml-1">Displaying n out of n components</p>

      <div className="grid grid-cols-3 gap-4">
        {[...Array(9)].map((_, i) => (
          <Link href="/view" key={i} className="bg-gray-200 pt-5 px-5 pb-4">
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
          </Link>
        ))}
      </div>
      
      {/*TODO: add meaningful pagination*/}
      {/*TODO: figure out why pr-3 is needed for centering*/}
      <div className="flex justify-center space-x-4 my-auto pr-3 w-full mt-6"> 
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </div>

    </div>
  )
}

export default Dashboard