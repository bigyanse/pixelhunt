import { Dispatch, SetStateAction } from "react"

const Sidebar = ({ sortBy, setSortBy }: { sortBy: string, setSortBy: Dispatch<SetStateAction<string>> }) => {
	const handleClick = (type: string) => {
		setSortBy(type);
	};
  return (
		<div className="w-full md:w-[350px] mt-10 bg-white rounded-lg drop-shadow-[1px_1px_3px_rgba(0,0,0,0.3)] shadow-md px-6 py-4">
			<h3 className="text-2xl">Sort By</h3>
			<div className="pt-2 pl-3">
				<div className="flex items-center gap-5 text-slate-500">
					<div className={`${sortBy === "latest" ? "bg-black " : ""}w-2 h-2 rounded-full`}></div>
					<button onClick={() => handleClick("latest")} className={`${sortBy === "latest" ? "text-black " : ""}`}>Latest</button>
				</div>	
				<div className="flex items-center gap-5 text-slate-500">
					<div className={`${sortBy === "relevant" ? "bg-black " : ""}w-2 h-2 rounded-full`}></div>
					<button onClick={() => handleClick("relevant")} className={`${sortBy === "relevant" ? "text-black " : ""}`}>Relevant</button>
				</div>
			</div>
		</div>
  )
}

export default Sidebar
