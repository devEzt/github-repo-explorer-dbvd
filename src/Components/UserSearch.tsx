import React from 'react'
import { TextField, Button, Box } from '@mui/material'

interface UserSearchProps {
  onSearch: (username: string) => void
}

const UserSearch: React.FC<UserSearchProps> = ({ onSearch }) => {
  const [username, setUsername] = React.useState<string>('')

  const handleSearch = () => {
    onSearch(username)
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <img src="/GitExplorerDBVD.png" alt="GitExplorer Logo" />
      <Box mt={2} width="50%">
        <TextField
          fullWidth
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Search GitHub username"
        />
      </Box>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>
    </Box>
  )
}

export default UserSearch
