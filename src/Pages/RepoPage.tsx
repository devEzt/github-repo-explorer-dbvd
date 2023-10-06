// UserPage.tsx
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import RepoDetails from '../Components/RepoDetails'

const RepoPage: React.FC = () => {
  const { username = '', repoName = '' } = useParams<{ username: string; repoName: string }>()
  const navigate = useNavigate()

  return (
    <div>
      <RepoDetails username={username} repoName={repoName} />
      <button
        onClick={() => {
          navigate(-1)
        }}
      >
        Back
      </button>
    </div>
  )
}

export default RepoPage
