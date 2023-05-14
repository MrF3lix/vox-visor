import Head from "next/head"
import { Private } from "../../components/private"
import { useRun, useRunPlots, useRunStats } from "../../services/runs"
import { RunDetail } from "../../components/run/run-detail"
import { Feed } from "../../components/feed/feed"
import { RunList } from "../../components/run/run-list"
import Image from "next/image"

const Run = ({ id }) => {
    const { data: run } = useRun(id)
    const { data: stats } = useRunStats(id)
    const { data: plots } = useRunPlots(id)

    return (
        <Private>
            <Head>
                <title>Viewer | Run Detail</title>
            </Head>
            <h1 className="text-2xl">{run?.name}</h1>
            <div className="flex gap-4">
                <div className="flex flex-col gap-4 w-1/2 bg-white p-4 rounded-md">
                    <RunDetail run={run} stats={stats} />
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
            {plots &&
                <div className="flex flex-col gap-4 w-full bg-white p-4 rounded-md">
                    <div>
                        <h2 className="text-xl">
                            Plots
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Results plotted for this run.
                        </p>
                    </div>
                    <div className="overflow-x-scroll">
                        <div className="flex gap-4">
                            {plots?.map(plot => (
                                <div key={plot.id} className="shrink-0 w-96 truncate">
                                    <Image src={plot.url} alt={plot.name} width={400} height={400} fill={false} priority={false} />
                                    <a className="mt-1 text-sm text-gray-500 text-center underline w-full" href={plot.url} target="_blank" rel="noopener noreferrer">{plot.name}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
            <RunList id={id} />
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