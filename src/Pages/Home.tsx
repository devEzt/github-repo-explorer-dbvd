import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'
import UserSearch from '../Components/UserSearch'

const Home: React.FC = () => {
  const navigate = useNavigate()

  const handleSearch = (username: string) => {
    navigate(`/user/${username}`)
  }

  return (
    <Container>
      <UserSearch onSearch={handleSearch} />
    </Container>
  )
}

export default Home
