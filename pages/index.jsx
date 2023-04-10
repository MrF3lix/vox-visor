import { List } from "../components/list/list"
import Head from "next/head"
import { createExperiment, useExperiments } from "../services/experiments"
import { ExperimentListItem } from "../components/experiment/experiment-list-item"
import { useQueryClient } from "@tanstack/react-query"
import { Private } from "../components/private"

const Experiments = () => {
  const queryClient = useQueryClient()
  const { data: experiments } = useExperiments()

  const add = async () => {
    await createExperiment()
    queryClient.invalidateQueries({ queryKey: 'experiments' })
  }

  return (
    <Private>
      <Head>
        <title>Viewer | Dashboard</title>
      </Head>
      <h1 className="text-2xl">Experiments</h1>
      <List
        title="Experiments"
        description="Shows the executed experiments sorted by creation date"
        action={{
          onClick: add,
          label: 'Create'
        }}
      >
        {experiments?.list.map(result => <ExperimentListItem key={result.id} {...result} />)}
      </List>
    </Private>
  )
}

export default Experiments