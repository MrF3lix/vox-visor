import { useExperiment } from "../../services/experiments"
import Head from "next/head"
import { List } from "../../components/list/list"
import { ResultListItem } from "../../components/result/result-list-item"
import dayjs from "dayjs"

const ExperimentDetails = ({ id }) => {
    const { data: experiment } = useExperiment(id)

    return (
        <>
            <Head>
                <title>Viewer | Experiment Details</title>
            </Head>
            <h1 className="text-2xl">{experiment?.name}</h1>
            <List
                title="Runs"
                description="List of the pipeline executions belonging to this experiment"
                action={{
                    onClick: console.log,
                    label: 'Add Run'
                }}
            >
                {experiment?.results?.sort((a, b) => dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1).map(result => <ResultListItem key={result.id} {...result} />)}
            </List>
        </>
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