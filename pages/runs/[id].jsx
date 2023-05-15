import Head from "next/head"
import { Private } from "../../components/private"
import { downloadPlot, useRun, useRunPlots, useRunStats } from "../../services/runs"
import { RunDetail } from "../../components/run/run-detail"
import { Feed } from "../../components/feed/feed"
import { RunList } from "../../components/run/run-list"
import Image from "next/image"
import { ArrowDownTrayIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid"

const Run = ({ id }) => {
    const { data: run } = useRun(id)
    const { data: stats } = useRunStats(id)
    const { data: plots } = useRunPlots(id)

    const getTitle = filename => {
        const splits = filename.split('_')
        const last = splits[splits.length-1].replace('.png', '')
        const name = last.split('-').map(n => capitalizeFirstLetter(n))
        return name.join(' ')
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

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
            <div className="w-full overflow-y-auto flex gap-4">
                {plots?.map(plot => (
                    <div key={plot.id} className="shrink-0 w-1/3 truncate bg-white rounded-md">
                        <div className="divide-y divide-gray-200">
                            <div className="p-4">
                                <p className="text-lg mb-2">Plot {getTitle(plot.name)}</p>
                                <Image src={plot.url} alt={plot.name} width={1000} height={1000} fill={false} priority={false} />
                            </div>
                            <div className="-mt-px flex divide-x divide-gray-200">
                                <div className="flex w-0 flex-1">
                                    <a
                                        onClick={() => downloadPlot(plot)}
                                        className="relative -mr-px cursor-pointer inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                    >
                                        <ArrowDownTrayIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        Download
                                    </a>
                                </div>
                                <div className="-ml-px flex w-0 flex-1">
                                    <a
                                        href={plot.url} target="_blank" rel="noopener noreferrer"
                                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                    >
                                        <ArrowTopRightOnSquareIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        Open
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
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