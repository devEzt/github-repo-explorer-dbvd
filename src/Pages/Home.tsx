// Home.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserSearch from '../Components/UserSearch'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>('')

  const handleSearch = (username: string) => {
    setUsername(username)
    navigate(`/user/${username}`)
  }

  return (
    <div>
      <UserSearch onSearch={handleSearch} />
    </div>
  )
}

export default Home
