import { List } from "../../components/list/list"
import Head from "next/head"
import { useResults } from "../../services/results"
import { ResultListItem } from "../../components/result/result-list-item"

const Overview = () => {
  const { data: results } = useResults()

  return (
    <>
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
    </>
  )
}

export default Overview