import React, { useEffect, useState } from 'react'
import { Avatar, Typography, Paper, Box, Grid, CircularProgress } from '@mui/material'
import { getUserDetails } from '../Services/getUserDetails'
import EmailIcon from '@mui/icons-material/Email'
import PeopleIcon from '@mui/icons-material/People'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

interface UserProfileProps {
  username: string
}

interface UserDetails {
  login: string
  followers: number
  following: number
  avatar_url: string
  bio: string
  email: string
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
          <Grid item xs={12}>
            <Typography variant="h3">{userDetails.login}</Typography>
            <Typography variant="h5">{userDetails.bio || 'Sem Descrição'}</Typography>
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent={{
                xs: 'flex-start',
                md: 'space-between',
              }}
              mt={1}
            >
              <Box display="flex" alignItems="center" mt={1} minWidth={{ xs: '100%', md: '30%' }}>
                <EmailIcon fontSize="small" />
                <Typography variant="body1" ml={1}>
                  {userDetails.email || 'Sem Email'}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={1} minWidth={{ xs: '100%', md: '30%' }}>
                <PeopleIcon fontSize="small" />
                <Typography variant="body1" ml={1}>
                  {userDetails.followers} Followers
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={1} minWidth={{ xs: '100%', md: '30%' }}>
                <PersonAddIcon fontSize="small" />
                <Typography variant="body1" ml={1}>
                  {userDetails.following} Following
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default UserProfile
