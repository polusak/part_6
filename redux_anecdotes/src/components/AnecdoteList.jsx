import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const allAnecdotes = useSelector(state => state.anecdotes)
  const filterObject = useSelector(state => state.filter)

  let anecdotes = allAnecdotes
  if (filterObject.filter !== undefined) {
    anecdotes = allAnecdotes.filter(anecdote => 
      anecdote.content.includes(filterObject.filter)
    )
  }
  const dispatch = useDispatch()

  const voteAnecdote = (id) => {
    dispatch(vote(id))
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