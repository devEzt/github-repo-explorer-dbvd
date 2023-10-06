import React, { useEffect, useState } from 'react'
import { getUserRepos } from '../Services/githubAPI'

interface RepoListProps {
  username: string
}

const RepoList: React.FC<RepoListProps> = ({ username }) => {
  const [repos, setRepos] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await getUserRepos(username)
        setRepos(response)
        setLoading(false)
      } catch (error) {
        console.error('Erro ao buscar repositórios:', error)
        setError('Erro ao buscar repositórios')
        setLoading(false)
      }
    }

    fetchData()
  }, [username])

  if (!username) {
    return <div>Please enter a username to search.</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      {repos && repos.length > 0 ? (
        repos.map((repo) => <div key={repo.id}>{repo.name}</div>)
      ) : (
        <div>No repositories found</div>
      )}
    </div>
  )
}

export default RepoList
