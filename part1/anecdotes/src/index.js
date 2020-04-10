import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Anecdote = ( { title, text, vote } ) => (
  <>
    <h1>{title}</h1>
    <p>
      {text} 
    </p>
    <p>
      has {vote} votes
    </p>
  </>
)

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const anecdotesIndexWithHighestVote = points.indexOf(Math.max(...points))

  const selectRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * Math.floor(anecdotes.length))
    setSelected(randomIndex)
  }

  const voteSelectedAnecdote = () => {
    const votes = [...points]
    votes[selected] += 1
    setPoints(votes)
  }

  return (
    <div>
      <div>
        <Anecdote title='Anecdote of the day' 
                  text={anecdotes[selected]} 
                  vote={points[selected]} />
        <Button text="vote" onClick={voteSelectedAnecdote} />
        <Button text="next anecdote" onClick={selectRandomAnecdote} />
      </div>

      <div>
        <Anecdote title='Anecdote with most votes' 
                  text={anecdotes[anecdotesIndexWithHighestVote]} 
                  vote={points[anecdotesIndexWithHighestVote]} />

      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

