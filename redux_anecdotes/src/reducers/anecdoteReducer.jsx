import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = []

const initialState = anecdotesAtStart
//const generateId = () => (100000 * Math.random()).toFixed(0)

const compareAnecdotes = (a, b) => {
  if (a.votes > b.votes) {
    return -1;
  } else if (a.votes < b.votes) {
    return 1;
  }
  return 0;
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(n => n.id === id)
      const votedAnecdote = { 
        ...anecdoteToVote, 
        votes: anecdoteToVote.votes + 1
      }
      const newState =  state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote
      )
      return [...newState].sort(compareAnecdotes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})


export const { 
  createAnecdote, 
  vote, 
  appendAnecdote,
  setAnecdotes 
} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer