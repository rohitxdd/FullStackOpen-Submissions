import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateVote } from './services/requests'

const App = () => {
  const queryClient = useQueryClient()
  const newVoteMutation = useMutation({
    mutationFn: updateVote, onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdote'] })
    }
  })
  const handleVote = (anecdote) => {
    newVoteMutation.mutate({ id: anecdote.id, votes: Number(anecdote.votes) + 1 })
  }

  const { data: anecdotes, isError, isLoading } = useQuery({
    queryKey: ['anecdote'],
    queryFn: getAnecdotes,
  })

  if (isLoading) {
    return <>Loading...</>
  }

  if (isError) {
    return <h1>anecdote service is available due to problem in server</h1>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes?.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
