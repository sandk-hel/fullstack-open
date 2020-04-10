import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = (props) => {
  const anecdotesCount = props.anecdotes.length

  const selectRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * Math.floor(anecdotesCount))
    setSelected(randomIndex)
  }

  const voteSelectedAnecdote = () => {
    const votes = [...points]
    votes[selected] += 1
    setPoints(votes)
  }

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotesCount).fill(0))

  return (
    <div>
      <p>
        {props.anecdotes[selected]} 
      </p>
      <p>
        has {points[selected]} votes
      </p>
      <Button text="vote" onClick={voteSelectedAnecdote} />
      <Button text="next anecdote" onClick={selectRandomAnecdote} />
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

