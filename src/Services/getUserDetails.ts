import axios from 'axios'

export const getUserDetails = async (username: string) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`)
    return response.data
  } catch (error) {
    console.error('Erro ao buscar detalhes do usuário:', error)
    throw error
  }
}
