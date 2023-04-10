import { useExperiment } from "../../services/experiments"
import Head from "next/head"
import { List } from "../../components/list/list"
import { ResultListItem } from "../../components/result/result-list-item"
import dayjs from "dayjs"
import { ListItem } from "../../components/list/list-item"
import { ExperimentDetail } from "../../components/experiment/experiment-detail"
import { Private } from "../../components/private"

const ExperimentDetails = ({ id }) => {
    const { data: experiment, isLoading } = useExperiment(id)

    return (
        <Private>
            <Head>
                <title>Viewer | Experiment Details</title>
            </Head>
            <h1 className="text-2xl">{experiment?.name}</h1>
            <div className="flex flex-col gap-4 w-full bg-white p-4 rounded-md">
                <ExperimentDetail experiment={experiment} />
            </div>
            <List
                title="Runs"
                description="List of the pipeline executions belonging to this experiment"
                action={{
                    onClick: console.log,
                    label: 'Add Run'
                }}
            >
                {!isLoading && experiment?.results?.sort((a, b) => dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1).map(result => <ResultListItem key={result.id} {...result} />)}
                {!isLoading && experiment?.results?.length === 0 &&
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

export default ExperimentDetails