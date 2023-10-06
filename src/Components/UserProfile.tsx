import React, { useEffect, useState } from 'react'
import { Avatar, Typography, Paper, Box, Grid, CircularProgress } from '@mui/material'
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

  if (!userDetails) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Paper elevation={3}>
      <Box p={2}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
          }}
        >
          <Grid item>
            <Avatar src={userDetails.avatar_url} alt={`${userDetails.login} avatar`} sx={{ width: 160, height: 160 }} />
          </Grid>
          <Grid item>
            <Typography variant="h3">{userDetails.login}</Typography>
            <Typography variant="h4">{userDetails.bio || 'Sem Descrição'}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default UserProfile
