import Link from 'next/link'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-200 p-6 flex flex-col">
        <h1 className="text-3xl font-bold">Logo</h1>
        <nav className="flex flex-col space-y-2 mt-10 ml-1">
          <Link href="/home" className="text-xl font-semibold">Browse</Link>
          <Link href="/profile" className="text-xl">View Profile</Link>
          <Link href="/liked" className="text-xl">Liked components</Link>
          <Link href="/create" className="text-xl">Create Component</Link>
        </nav>
        <div className="flex flex-row mt-auto">
          <div className="w-20 h-20 bg-blue-200 rounded-full" />
          <div className="flex flex-col ml-2 py-4 text-sm">
            <p className="underline">@USERNAME</p>
            <Link href="/login" className="mt-auto underline font-semibold">Log Out</Link>
          </div>
        </div>
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}