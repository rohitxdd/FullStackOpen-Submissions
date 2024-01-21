import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(incrementVote(id))
  }

  const incrementVote = (id) => ({
    type: "INCREMENT",
    payload: id
  })

  const addNote = (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value
    if(anecdote.length > 3){
      dispatch({ type: "ADD", payload: { anecdote } })
    }else{
      //notify
      return;
    }
    event.target.anecdote.value = ""
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
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