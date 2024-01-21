import { useSelector, useDispatch } from 'react-redux'
import { incrementVote, addAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(incrementVote(id))
  }

  const addNote = (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value
    if (anecdote.length > 3) {
      dispatch(addAnecdote(anecdote))
    } else {
      //notify
      return;
    }
    event.target.anecdote.value = ""
  }
  const sortedAnecdote = [...anecdotes].sort((a, b) => b.votes - a.votes)
  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdote.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App