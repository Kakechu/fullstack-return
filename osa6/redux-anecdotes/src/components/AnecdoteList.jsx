import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from "../reducers/anecdoteReducer"
import Filter from './Filter'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>     
    )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if ( filter ) {
        const filtered = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
        return filtered
    } else {
        return anecdotes
    }
  })

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter />
            {sortedAnecdotes.map(anecdote =>
                <Anecdote
                  key={anecdote.id}
                  anecdote={anecdote}
                  handleClick={() => {
                    dispatch(voteAnecdote(anecdote.id))
                    dispatch(setNotification(`you voted '${anecdote.content}'`))
                    setTimeout(() => {
                        dispatch(clearNotification())
                    }, 5000)
                  }
                    
                  }
                />

            )}
        </div>
    )
}


export default AnecdoteList