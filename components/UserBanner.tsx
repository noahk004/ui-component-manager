import React from 'react'

interface UserBannerProps {
  username: string
  totalLikes: number
  totalDownloads: number
}

const UserBanner = ({ username, totalLikes, totalDownloads }: UserBannerProps) => {
  return (
    <div className="flex h-1/3 w-full bg-gray-200 items-center p-8">
      <div className="w-52 h-52 bg-blue-200 rounded-full" />
      <div className="flex flex-col ml-2 py-4 ml-8 h-full">
        <h1 className="text-4xl">{username}</h1>
        <div className="ml-1">
          <p className="mt-6 text-lg">Total likes: {totalLikes.toLocaleString()}</p>
          <p className="mt-2 text-lg">Total downloads: {totalDownloads.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

export default UserBanner