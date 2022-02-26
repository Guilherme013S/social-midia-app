import React from 'react'
import Head from '../Helper/Head'
import useFetch from '../../Hooks/useFetch'
import { STATS_GET } from '../../api'
import Loading from '../Helper/Loading'
import Error from '../Helper/Error'
// import UserStatsGraph from './UserStatsGraph'
const UserStatsGraph = React.lazy(() => import('./UserStatsGraph'))

const UserStats = () => {
  const { data, error, loading, request } = useFetch()

  React.useEffect(() => {
    const getData = async () => {
      const { url, options } = STATS_GET()
      await request(url, options)
    }
    getData()
  }, [request])

  if (loading) return <Loading />
  if (error) return <Error error={error} />
  if (data)
    return (
      <React.Suspense fallback={<div></div>}>
        <Head title='Estatísticas' />
        <UserStatsGraph data={data} />
      </React.Suspense>
    )
  else return null
}

export default UserStats