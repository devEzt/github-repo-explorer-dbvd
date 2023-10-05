import React, { useState } from 'react'
import UserSearch from '../Components/UserSearch'
import RepoList from '../Components/RepoList'

const Home: React.FC = () => {
  const [username, setUsername] = useState<string>('')

  return (
    <div>
      <UserSearch onSearch={setUsername} />
      <RepoList username={username} />
    </div>
  )
}

export default Home
