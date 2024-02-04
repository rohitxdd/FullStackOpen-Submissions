import { createSlice } from "@reduxjs/toolkit"
import services from "../services/anecdotes"

const anecdotesSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    incrementVote: (state, action) => {
      return [...state].map(e => {
        if (e.id === action.payload) {
          return { ...e, votes: e.votes + 1 }
        }
        return e
      })
    },
    addAnecdote: (state, action) => {
      return [...state, action.payload]
    },
    appendAnecdote: (state, action) => {
      return [...action.payload]
    }
  }
})

export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await services.getAll()
    dispatch(appendAnecdote(anecdotes))
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await services.createNew(anecdote)
    dispatch(addAnecdote(newAnecdote))
  }
}


export const { incrementVote, addAnecdote, appendAnecdote } = anecdotesSlice.actions

export default anecdotesSlice.reducer