import { useEffect, useState } from "react";
import GridImages from "./components/GridImages"
import SearchBar from "./components/SearchBar"
import { useInfiniteQuery } from "react-query"
import Sidebar from "./components/Sidebar";
import LoadingGrid from "./components/LoadingGrid";

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
			if(value === "") {
				setDebouncedValue("mountain");
				return;
			}
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const Home = () => {;
	const [sortBy, setSortBy] = useState("relevant");
	const [searchTerm, setSearchTerm] = useState("mountain");
	const debounceSearchTerm = useDebounce(searchTerm, 500);

	const { data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
		isLoading, error,
	} = useInfiniteQuery(['fetchImages', sortBy, debounceSearchTerm], ({ pageParam = 1 }) =>
		fetch(`https://api.unsplash.com/search/photos?query=${debounceSearchTerm}&order_by=${sortBy}&page=${pageParam}`, {
			headers: {
				"Authorization": "Client-ID 2x694WEidKMH8WSY-70TKfFv4geqUEqmEZvjS0yVQbQ",
			},
		}).then(res => 
			res.json()
		).then(data => {
			if(pageParam < data.total_pages) {
				return { ...data, nextPage: pageParam + 1 };
			}
			return data;
		})
	, { getNextPageParam: (lastPage) => lastPage.nextPage });

  if (error) return <>An error has occurred!</>

  return (
		<main className="px-5 py-8">
			<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			<div className="md:flex gap-10 items-start">
				<Sidebar sortBy={sortBy} setSortBy={setSortBy} />
				{isLoading && <LoadingGrid />}
				{!isLoading && data && (data.pages.length > 0) && (data.pages[data.pages.length-1].results.length > 0) && <GridImages pages={data.pages} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} />}
				{!isLoading && (!data || !data.pages.length || !data.pages[data.pages.length-1].results.length) && <div className="mt-10 text-2xl">No results found!</div>}
			</div>
		</main>
  )
}

export default Home
