import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { fetchArticles } from "./api/projects";

export function Articles() {
  const [page, setPage] = useState(1);

  const isFirstPage = page === 1;
  const hasReachEnd = page === 10;
  const isPlaceholderData = page !== 10;

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["articles", page],
    queryFn: () => fetchArticles(page),
    placeholderData: keepPreviousData,
    staleTime: 10000,
  });

  /* useEffect(() => {
    if (!hasReachEnd) {
      queryClient.prefetchQuery({
        // eslint-disable-next-line @tanstack/query/exhaustive-deps
        queryKey: ["articles", page + 1],
        queryFn: () => fetchArticles(page + 1),
      });
    }
  }, [hasReachEnd, page, queryClient]); */

  /* if (isPending) return "Loading...";
  if (isFetching) return "Fetching..."; */

  /* if (error) return "An error has occurred: " + error.message; */

  console.log({ isPlaceholderData });

  return (
    <>
      <button
        disabled={isFirstPage}
        onClick={() => setPage((prevPage) => prevPage - 1)}
      >
        previous page
      </button>
      <button
        disabled={hasReachEnd}
        onClick={() => setPage((prevPage) => prevPage + 1)}
      >
        next page
      </button>
      {isFetching ? <span> Loading...</span> : null}
      {isPending
        ? "Loading..."
        : error
        ? `An error has occurred: ${error.message}`
        : data.map((article: { id: number; title: string }) => {
            return <p key={article.id}>{article.title}</p>;
          })}
    </>
  );
}
