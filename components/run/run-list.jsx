import { useInfiniteQuery } from "@tanstack/react-query"
import { useInView } from "react-intersection-observer"
import { fetchTranscripts } from "../../services/runs"
import { Fragment, useEffect } from "react"
import { List } from "../list/list"
import { TranscriptListItem } from "../transcript/transcript-list-item"
import { ListItem } from "../list/list-item"

export const RunList = ({id}) => {
    const { ref, inView } = useInView()


    const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage, } = useInfiniteQuery(
        ['transcripts', id],
        async ({ pageParam = 0 }) => await fetchTranscripts(id, pageParam),
        {
            getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
            getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
        },
    )

    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView])


    return (
        <>

            <List
                title="Transcripts"
                description="List of transcripts created for each input audio file during this run."
            >
                {data && data.pages && data.pages.map(page => (
                    <Fragment key={page.nextId}>
                        {page?.data?.map(result => <TranscriptListItem key={result.id} {...result} />)}
                    </Fragment>
                ))}
                {isFetching &&
                    <ListItem>
                        <div className="text-gray-500 text-xs">Loading...</div>
                    </ListItem>
                }
                {!isFetching && data.pages && data.pages.length == 0 &&
                    <ListItem>
                        <div className="text-gray-500 text-xs">No results within this experiment found.</div>
                    </ListItem>
                }
            </List>
            <button
                ref={ref}
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
            >
            </button>
        </>
    )
}