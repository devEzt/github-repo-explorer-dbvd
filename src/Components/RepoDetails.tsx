import React, { useEffect, useState } from 'react'

import { getRepoDetails } from '../Services/getRepoDetails'

interface RepoDetailsProps {
  repoName: string
  username: string
}

const RepoDetails: React.FC<RepoDetailsProps> = ({ repoName, username }) => {
  const [repoDetails, setRepoDetails] = useState<any | null>(null)

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        const response = await getRepoDetails(username, repoName)
        setRepoDetails(response)
      } catch (error) {
        console.error('Error fetching repo details:', error)
      }
    }

    fetchRepoDetails()
  }, [repoName, username])

  if (!repoDetails) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{repoDetails.name}</h1>
      <p>{repoDetails.description || 'No Description'}</p>
      <p>⭐ {repoDetails.stargazers_count}</p>
      <p>🔨 {repoDetails.language || 'No Language'}</p>
      <a href={repoDetails.html_url} target="_blank" rel="noreferrer">
        Go to Repository
      </a>
    </div>
  )
}

export default RepoDetails
