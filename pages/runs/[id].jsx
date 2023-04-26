import Head from "next/head"
import { List } from "../../components/list/list"
import { ListItem } from "../../components/list/list-item"
import { Private } from "../../components/private"
import { useRun, useTranscripts } from "../../services/runs"
import { RunDetail } from "../../components/run/run-detail"
import { TranscriptListItem } from "../../components/transcript/transcript-list-item"
import { Feed } from "../../components/feed/feed"

const Run = ({ id }) => {
    const { data: run } = useRun(id)
    const { data: transcripts, isLoading } = useTranscripts(id)

    return (
        <Private>
            <Head>
                <title>Viewer | Run Detail</title>
            </Head>
            <h1 className="text-2xl">{run?.name}</h1>
            <div className="flex gap-4">
                <div className="flex flex-col gap-4 w-1/2 bg-white p-4 rounded-md">
                    <RunDetail run={run} />
                </div>
                <div className="flex flex-col gap-4 w-1/2 bg-white p-4 rounded-md">
                    <div>
                        <h2 className="text-xl">
                            Pipeline
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Pipeline configuration used for this run.
                        </p>
                    </div>

                    <Feed config={run?.config} />
                </div>
            </div>
            <List
                title="Transcripts"
                description="List of transcripts created for each input audio file during this run."
            >
                {!isLoading && transcripts.map(result => <TranscriptListItem key={result.id} {...result} />)}
                {!isLoading && transcripts.length === 0 &&
                    <ListItem>
                        <div className="text-gray-500 text-xs">No results within this experiment found.</div>
                    </ListItem>
                }
                {isLoading &&
                    <ListItem>
                        <div className="text-gray-500 text-xs">Loading...</div>
                    </ListItem>
                }
            </List>
        </Private>
    )
}

export async function getServerSideProps({ query }) {
    return {
        props: {
            id: query.id
        },
    }
}

export default Run