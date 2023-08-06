import { useEffect } from "react";
import { FetchNextPageOptions, InfiniteQueryObserverResult } from "react-query"

const GridImages = ({ pages, fetchNextPage, hasNextPage, isFetchingNextPage }: { pages: any, fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<any, unknown>>, hasNextPage: boolean | undefined, isFetchingNextPage: boolean }) => {
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if(scrollHeight - scrollTop === clientHeight) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

	if(pages) {
		return (
			<div className="w-full">
				<div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-4 mt-10">
					{pages.map((page: any) => {
						return page.results.map((item: any) => {
							return (
								<div className="flex flex-col rounded-lg shadow-2xl bg-white" key={item.id}>
									<div className="width: 100%; height: 100%;"><img className="h-[220px] w-full bg-cover rounded-t-lg" src={item.urls.thumb} loading="lazy" /></div>
									<p className="p-2">{item.description?.substring(0, 30) ?? item.alt_description?.substring(0, 30)}</p>
								</div>
							)
						})
					})}
				</div>
				<div className="flex justify-center pt-5">
					{hasNextPage && (
						<button className="py-2 px-3 bg-[#4b86ee] hover:bg-[#3c79e6] text-white" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
							{isFetchingNextPage ? 'Loading...' : 'Load More'}
						</button>
					)}
				</div>
			</div>
		)
	}
	return <></>
}

export default GridImages
