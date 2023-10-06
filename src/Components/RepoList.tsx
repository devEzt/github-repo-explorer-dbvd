import React, { useEffect, useState } from 'react'
import { getUserRepos } from '../Services/githubAPI'

interface RepoListProps {
  username: string
}

const RepoList: React.FC<RepoListProps> = ({ username }) => {
  const [repos, setRepos] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<string>('stars-desc')

  const sortRepos = (repos: any[], order: string) => {
    switch (order) {
      case 'stars-desc':
        return repos.sort((a, b) => b.stargazers_count - a.stargazers_count)
      case 'stars-asc':
        return repos.sort((a, b) => a.stargazers_count - b.stargazers_count)
      case 'recent':
        return repos.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      case 'oldest':
        return repos.sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime())
      default:
        return repos
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await getUserRepos(username)
        setRepos(sortRepos(response, sortOrder))
        setLoading(false)
      } catch (error) {
        console.error('Erro ao buscar repositórios:', error)
        setError('Erro ao buscar repositórios')
        setLoading(false)
      }
    }

    fetchData()
  }, [username, sortOrder])

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
      <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
        <option value="stars-desc">Stars Descending</option>
        <option value="stars-asc">Stars Ascending</option>
        <option value="default">Default</option>
        <option value="recent">Most Recent</option>
        <option value="oldest">Oldest</option>
      </select>

      {repos && repos.length > 0 ? (
        repos.map((repo) => <div key={repo.id}>{repo.name}</div>)
      ) : (
        <div>No repositories found</div>
      )}
    </div>
  )
}

export default RepoList
