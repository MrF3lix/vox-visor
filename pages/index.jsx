import { List } from "../components/list/list"
import Head from "next/head"
import { useExperiments } from "../services/experiments"
import { ExperimentListItem } from "../components/experiment/experiment-list-item"

const Overview = () => {
  const { data: experiments } = useExperiments()

  return (
    <>
      <Head>
        <title>Viewer | Dashboard</title>
      </Head>
      <h1 className="text-2xl">Overview</h1>
      <List
        title="Experiments"
        description="Shows the executed experiments sorted by creation date"
        action={{
          onClick: console.log,
          label: 'Create'
        }}
      >
        {experiments?.list.map(result => <ExperimentListItem key={result.id} {...result} />)}
      </List>
    </>
  )
}

export default Overview