import React, { useEffect, useState } from 'react'
import { getUserDetails } from '../Services/getUserDetails'

interface UserProfileProps {
  username: string
}

interface UserDetails {
  login: string
  followers: number
  following: number
  avatar_url: string
  bio: string
}

const UserProfile: React.FC<UserProfileProps> = ({ username }) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserDetails(username)
        setUserDetails(response)
      } catch (error) {
        console.error('Erro ao buscar detalhes do usuário:', error)
      }
    }

    fetchData()
  }, [username])

  if (!userDetails) return <div>Loading...</div>

  return (
    <div>
      <img src={userDetails.avatar_url} alt={`${userDetails.login} avatar`} />
      <h1>{userDetails.login}</h1>
    </div>
  )
}

export default UserProfile
