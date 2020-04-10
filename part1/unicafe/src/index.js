import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Statistics = ({ good, bad, neutral }) => {
  const all = good + neutral + bad

  const positivePercent = () => `${good / all * 100} %`
  const average = () => {
     return (good * 1 + neutral * 0 + bad * -1) / all
  }

  return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average()}</p>
      <p>positive {positivePercent()}</p>
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick = { () => setGood(good + 1) } text="good" />
      <Button onClick = { () => setNeutral(neutral + 1) } text="neutral" />
      <Button onClick = { () => setBad(bad + 1) } text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
