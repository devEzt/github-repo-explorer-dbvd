import React, { useEffect, useState } from 'react'
import { getRepoDetails } from '../Services/getRepoDetails'
import { Container, Paper, Typography, Grid, Box, CircularProgress, Card, CardContent, Button } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import LanguageIcon from '@mui/icons-material/Language'

interface RepoDetailsProps {
  repoName: string
  username: string
}

const RepoDetails: React.FC<RepoDetailsProps> = ({ repoName, username }) => {
  const [repoDetails, setRepoDetails] = useState<any | null>(null)

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        const response = await getRepoDetails(username, repoName)
        setRepoDetails(response)
      } catch (error) {
        console.error('Error fetching repo details:', error)
      }
    }

    fetchRepoDetails()
  }, [repoName, username])

  if (!repoDetails) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container>
      <Paper elevation={3}>
        <Box p={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h3" gutterBottom>
                {repoDetails.name}
              </Typography>
              <Typography variant="body1">{repoDetails.description || 'Sem Descrição'}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Card elevation={1}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box display="flex" alignItems="center">
                        <StarIcon color="primary" />
                        <Typography variant="h6" ml={1}>
                          {repoDetails.stargazers_count}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display="flex" alignItems="center">
                        <LanguageIcon color="action" />
                        <Typography variant="h6" ml={1}>
                          {repoDetails.language || 'No Language'}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" href={repoDetails.html_url} target="_blank">
                Ir para o Repositório
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  )
}

export default RepoDetails
