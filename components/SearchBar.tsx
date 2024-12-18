import React from 'react'

interface SearchBarProps {
  onSubmit: (searchTerm: string) => void
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = React.useState('')

  const handleSubmit = () => {
    onSubmit(searchTerm)
  }

  return (
    <div className="flex space-x-8 mt-6">
      <input 
        type="text" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search" 
        className="flex-1 px-8 py-4 text-xl bg-gray-200 rounded-2xl placeholder:text-black" 
      />  
      <button 
        onClick={handleSubmit}
        className="bg-gray-200 px-10 text-xl py-4 rounded-2xl"
      >
        Submit
      </button>
    </div>
  )
}

export default SearchBar