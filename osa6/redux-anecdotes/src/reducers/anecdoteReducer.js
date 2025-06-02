import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdoteInStore(state, action) {

      const updatedAnecdote = action.payload
      console.log(updatedAnecdote)

      return state.map(a => 
        a.id !== updatedAnecdote.id ? a : updatedAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const state = getState()

    const anecdoteToVote = state.anecdotes.find(a => a.id === id)

    const updatedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }

    const returned = await anecdoteService.update(id, updatedAnecdote)

    dispatch(updateAnecdoteInStore(returned))
  }
}


export const { updateAnecdoteInStore, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer