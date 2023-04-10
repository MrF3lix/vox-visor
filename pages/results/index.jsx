import { List } from "../../components/list/list"
import Head from "next/head"
import { useResults } from "../../services/results"
import { ResultListItem } from "../../components/result/result-list-item"
import { Private } from "../../components/private"

const Results = () => {
  const { data: results } = useResults()

  return (
    <Private>
      <Head>
        <title>Viewer | All Results</title>
      </Head>
      <h1 className="text-2xl">All Results</h1>
      <List
        title="Results"
        description="The results of the experiments sorted by creation date."
      >
        {results?.list.map(result => <ResultListItem key={result.id} {...result} />)}
      </List>
    </Private>
  )
}

export default Results