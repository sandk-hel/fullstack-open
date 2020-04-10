import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const getAll = () => good + neutral + bad

  const getPositivePercent = () => {
    const all = getAll()
    if (all > 0) {
      return `${good / getAll() * 100} %` 
    }
    return '0 %'
  }

  const getAverage = () => {
    const all = getAll()
    if (all > 0) {
      return (good * 1 + neutral * 0 + bad * -1) / getAll()
    }
    return 0
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick = { () => setGood(good + 1) } text="good" />
      <Button onClick = { () => setNeutral(neutral + 1) } text="neutral" />
      <Button onClick = { () => setBad(bad + 1) } text="bad" />
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {getAll()}</p>
      <p>average {getAverage()}</p>
      <p>positive {getPositivePercent()}</p>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
