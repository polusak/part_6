import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
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
    dispatch(vote(id))
    const votedAnecdote = allAnecdotes.find(n => n.id === id)
    dispatch(setNotification(
      `A vote was cast for the anecdote named "${votedAnecdote.content}".`
    ))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000)
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