import { useSelector, useDispatch } from 'react-redux'
import { castVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const allAnecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  let anecdotes = allAnecdotes

  if (filter !== undefined) {
    anecdotes = allAnecdotes.filter(anecdote => 
      anecdote.content.includes(filter)
    )
  }
  const dispatch = useDispatch()

  const voteAnecdote = (id) => {
    dispatch(castVote(id))
    const votedAnecdote = allAnecdotes.find(n => n.id === id)
    dispatch(setNotification(`You voted '${votedAnecdote.content}'`, 5))
  }

  return(
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList