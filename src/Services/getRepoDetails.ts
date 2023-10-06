import axios from 'axios'

export const getRepoDetails = async (username: string, repoName: string) => {
  try {
    const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`)
    return response.data
  } catch (error) {
    console.error('Erro ao buscar detalhes do repositório:', error)
    throw error
  }
}
