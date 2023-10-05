import axios from 'axios'

export const getUserRepos = async (username: string) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`)
    return response.data
  } catch (error) {
    console.error('Erro ao buscar repositórios:', error)
    throw error
  }
}
