import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { Dispatch, SetStateAction } from "react";

const SearchBar = ({ searchTerm, setSearchTerm }: { searchTerm: string, setSearchTerm: Dispatch<SetStateAction<string>> }) => {
  return (
    <div className="flex bg-[#4b86ee] text-white rounded-lg">
			<div className="rounded-l-lg px-4 py-1 flex justify-content items-center bg-[#3c79e6]"><MagnifyingGlassIcon className="w-6 h-6" /></div>
			<input className="bg-transparent outline-none h-12 indent-3 w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" autoFocus />
		</div>
  )
}

export default SearchBar
