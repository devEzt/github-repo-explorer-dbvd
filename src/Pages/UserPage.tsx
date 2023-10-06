import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Button, Grid, Box } from '@mui/material'
import UserProfile from '../Components/UserProfile'
import RepoList from '../Components/RepoList'

const UserPage: React.FC = () => {
  const { username = '' } = useParams<{ username: string }>()
  const navigate = useNavigate()

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate(-1)
        }}
        style={{ position: 'fixed', top: '16px', right: '16px' }}
      >
        Back
      </Button>
      <Container>
        <Grid mb={1}>
          <UserProfile username={username} />
        </Grid>
        <Grid mb={1}>
          <RepoList username={username} />
        </Grid>
      </Container>
    </Box>
  )
}

export default UserPage
