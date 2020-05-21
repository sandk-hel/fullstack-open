import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const Display = ({ counter }) => <div>Counter value is: {counter}</div>


const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const ReApp = (props) => {
  const [ counter, setCounter ] = useState(0)
  /*
  setTimeout(
    () => setCounter(counter + 1),
    1000
  )
  */
 const increaseByOne = () => setCounter(counter + 1)
 const setToZero = () => setCounter(0)
 const decreaseByOne = () => setCounter(counter - 1)

  console.log('rendering ...', counter)
  return (
    <div>
      <Display counter={counter}/>
      <Button handleClick={increaseByOne} 
              text='plus'
      />
      <Button handleClick={setToZero}
              text='zero'
      />
      <Button handleClick={decreaseByOne}
              text='minus'
      />
    </div>
  )
}


ReactDOM.render(
<ReApp />,
document.getElementById('re-renderable')
)


