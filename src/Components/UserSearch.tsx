import React, { useState } from 'react'

interface UserSearchProps {
  onSearch: (username: string) => void
}

const UserSearch: React.FC<UserSearchProps> = ({ onSearch }) => {
  const [username, setUsername] = useState<string>('')

  const handleSearch = () => {
    onSearch(username)
  }

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Search GitHub username"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default UserSearch
