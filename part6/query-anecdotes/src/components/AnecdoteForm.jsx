import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNew } from "../services/requests"
import { useNotificationDispatch } from "../context/notificationContext"


const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch()
  const newAnecdoteMutation = useMutation({
    mutationFn: createNew, onSuccess: (e) => {
      queryClient.invalidateQueries({ queryKey: ['anecdote'] })
      dispatchNotification(`You added ${e.content}`)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
