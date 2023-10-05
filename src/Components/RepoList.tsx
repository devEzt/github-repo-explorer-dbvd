import React, { useEffect, useState } from 'react'
import { getUserRepos } from '../Services/githubAPI'

interface RepoListProps {
  username: string
}

const RepoList: React.FC<RepoListProps> = ({ username }) => {
  const [repos, setRepos] = useState<any[]>([])

  useEffect(() => {
    getUserRepos(username)
      .then((response) => {
        setRepos(response.data)
      })
      .catch((error) => {
        console.error('Erro ao buscar repositórios:', error)
      })
  }, [username])

  return (
    <div>
      {repos.map((repo) => (
        <div key={repo.id}>{repo.name}</div>
      ))}
    </div>
  )
}

export default RepoList
