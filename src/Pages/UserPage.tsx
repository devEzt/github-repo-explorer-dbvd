// UserPage.tsx
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserProfile from '../Components/UserProfile'
import RepoList from '../Components/RepoList'

const UserPage: React.FC = () => {
  const { username = '' } = useParams<{ username: string }>()
  const navigate = useNavigate()

  return (
    <div>
      <UserProfile username={username} />
      <RepoList username={username} />
      <button
        onClick={() => {
          navigate(-1)
        }}
      >
        Voltar
      </button>
    </div>
  )
}

export default UserPage
