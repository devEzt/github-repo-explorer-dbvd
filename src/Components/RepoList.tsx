import React, { useEffect, useState } from 'react'
import { getUserRepos } from '../Services/githubAPI'
import { Link } from 'react-router-dom'
import { Box, Card, CardContent, CircularProgress, Grid, MenuItem, Paper, Select, Typography } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import styled from '@emotion/styled'

interface RepoListProps {
  username: string
}

const RepoList: React.FC<RepoListProps> = ({ username }) => {
  const [repos, setRepos] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<string>('stars-desc')

  const sortRepos = (repos: any[], order: string) => {
    switch (order) {
      case 'stars-desc':
        return repos.sort((a, b) => b.stargazers_count - a.stargazers_count)
      case 'stars-asc':
        return repos.sort((a, b) => a.stargazers_count - b.stargazers_count)
      case 'recent':
        return repos.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      case 'oldest':
        return repos.sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime())
      default:
        return repos
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await getUserRepos(username)
        setRepos(sortRepos(response, sortOrder))
        setLoading(false)
      } catch (error) {
        console.error('Erro ao buscar repositórios:', error)
        setError('Erro ao buscar repositórios')
        setLoading(false)
      }
    }

    fetchData()
  }, [username, sortOrder])

  const StyledCard = styled(Card)`
    &:hover {
      background-color: #f5f5f5;
    }
  `

  if (!username) {
    return <div>Please enter a username to search.</div>
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <Paper elevation={3}>
      <Box p={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Repositories</Typography>
          <Grid item mb={1}>
            <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <MenuItem value="stars-desc">Stars Descending</MenuItem>
              <MenuItem value="stars-asc">Stars Ascending</MenuItem>
              <MenuItem value="recent">Most Recent</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
            </Select>
          </Grid>
        </Box>

        <Grid container spacing={2}>
          {repos.map((repo) => (
            <Grid item xs={12} sm={6} md={4} key={repo.id}>
              <Link to={`/user/${username}/repo/${repo.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <StyledCard elevation={2}>
                  <CardContent>
                    <Box display="flex" flexDirection="column" alignItems="center">
                      <Typography
                        variant="h6"
                        sx={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: 200,
                        }}
                      >
                        {repo.name}
                      </Typography>
                      <Box display="flex" justifyContent="space-between" width="100%">
                        <Typography variant="body1">{repo.stargazers_count} ★</Typography>
                        <Typography variant="body1">
                          <VisibilityIcon fontSize="small" />
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </StyledCard>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  )
}

export default RepoList
