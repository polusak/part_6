import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const get = async (id) => {
  const url = `${baseUrl}/${id}`
  const response = await axios.get(url)
  return response.data
}

const createNew = async (content) => {
  const object = { 
    content, 
    votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async (id) => {
  const url = `${baseUrl}/${id}`
  const responseGet = await axios.get(url)
  const anecdote = responseGet.data
  const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
  const response = await axios.put(url, votedAnecdote)
  return response.data
}

export default { getAll, createNew, vote, get }