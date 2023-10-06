import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import RepoDetails from '../Components/RepoDetails'
import { Button, Box } from '@mui/material'

const RepoPage: React.FC = () => {
  const { username = '', repoName = '' } = useParams<{ username: string; repoName: string }>()
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
      <RepoDetails username={username} repoName={repoName} />
    </Box>
  )
}

export default RepoPage
