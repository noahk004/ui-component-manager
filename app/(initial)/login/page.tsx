import React from 'react'
import Link from 'next/link'

const Login = () => {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div className="flex justify-center items-center w-1/2 h-full bg-gray-300">
        some cool image or design
      </div> {/*different left margins to align text cuz default padding is wack*/}
      <div className="flex justify-center items-center w-1/2 h-full">
        <div className="flex flex-col w-[70%] bg-gray-300 px-12 py-16">
          <h1 className="text-3xl font-bold mt-10">Log In</h1>
          <p className="text-sm mt-8 ml-1">Email</p>
          <input type="email" className="w-full h-14 p-2 mt-2 ml-1" />
          <p className="text-sm mt-8 ml-1">Password</p>
          <input type="password" className="w-full h-14 p-2 mt-2 ml-1" />  {/*TODO: add hrefs*/}
          <Link href="/signup" className="text-sm mt-4 ml-2 underline">Dont have an account? Create one here!</Link>
          <Link href="/login/resetpassword" className="text-sm mt-2 ml-2 underline">Forgot password?</Link>
          <div className="flex flex-row mt-4 w-2/3 h-10 space-x-4 ml-auto">
            <button className="w-1/2 h-full bg-white text-sm hover:bg-gray-200">Cancel</button>
            <Link href="/home" className="w-1/2">
            <button className="w-full h-full bg-white text-sm hover:bg-gray-200">Submit</button>
            </Link>
          </div>
        </div>
      
      </div>
    </div>
  )
}

export default Login