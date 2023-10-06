// UserPage.tsx
import React from 'react'
import { useParams } from 'react-router-dom'
import UserProfile from '../Components/UserProfile'
import RepoList from '../Components/RepoList'

const UserPage: React.FC = () => {
  console.log('UserPage mounted')

  const { username = '' } = useParams<{ username: string }>()
  console.log('Username from params:', username)

  return (
    <div>
      <UserProfile username={username} />
      <RepoList username={username} />
      <button onClick={() => {}}>Voltar</button>
    </div>
  )
}

export default UserPage
