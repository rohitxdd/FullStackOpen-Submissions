import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { notify, removeNotification } from "../reducers/notificationReducer";

export default function AnecdoteForm() {
    const dispatch = useDispatch()
    const addNote = (event) => {
        event.preventDefault();
        const anecdote = event.target.anecdote.value
        if (anecdote.length > 3) {
            dispatch(addAnecdote(anecdote))
            dispatch(notify(`you created ${anecdote}`))
            setTimeout(() => {
                dispatch(removeNotification())
            }, 5000)
        } else {
            return;
        }
        event.target.anecdote.value = ""
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addNote}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}
