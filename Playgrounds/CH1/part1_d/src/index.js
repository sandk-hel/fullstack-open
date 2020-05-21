import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Display = props => <div>{props.value}</div>

const Button = (props) => (
  <button onClick = {props.handleClick}>
    {props.text}
  </button>
)

const PlaygroundApp = (props) => {
  const [value, setValue] = useState(10)
  const handleClick  = () => {
    console.log('Clicked the button')
    setValue(0)
  }

  const setToValue = (newValue) => () => setValue(newValue)
  const hello = (who) => () => console.log('Hello ', who)

  return (
    <div>
      <Display value={value} />
      <button onClick={hello('world')}>button</button>
      <button onClick={hello('react')}>reset to zero</button>
      <button onClick={hello('function')}>reset to zero</button>

      <Button handleClick={setToValue(1000)} text="thousand" />
      <Button handleClick={setToValue(0)} text="reset" />
      <Button handleClick={setToValue(value + 1)} text="increment" />

    </div>
  )
}

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}



const App = (props) => {

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  
  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }
  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }
  
  return (
    <div>
      <div>
        {left}
        <Button onClick={handleLeftClick} text='left' />
        <Button onClick={handleRightClick} text='right' />
        {right}
        <History allClicks={allClicks} />
      </div>
      <hr />
      <PlaygroundApp />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);