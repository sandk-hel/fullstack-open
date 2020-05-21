import React, { useState } from 'react'
import { useCounter }  from './Counter.js'

const CounterApp = () => {
  const counter = useCounter()

  return (
    <div>
      <div>{counter.value}</div>
      <button onClick={counter.increase}>
        plus
    </button>

      <button onClick={counter.decrease}>
        minus
    </button>

      <button onClick={counter.zero}>
        zero
    </button>
    </div>
  )
}

const SidewayCounters = () => {
  const left = useCounter()
  const right = useCounter()
  return (
    <div>
      {left.value}
      <button onClick={left.increase}>
        left
      </button>
      <button onClick={right.increase}>
        right
      </button>
      {right.value}
    </div>
  )
}


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type, 
    value,
    onChange
  }
}

const FormApp = () => {

  const name = useField('text')
  const born = useField('date')
  const height = useField('number')

  return (
    <div>
      <form>
        name:
        <input {...name} />
        <br />
        birthdate:
        <input {...born} />
        <br />
        height:
        <input {...height} />
      </form>
      <div>
        {name.value} {born.value} {height.value}
      </div>
    </div>
  )
}


const App = () => <div>
  <CounterApp />
  <hr />
  <SidewayCounters />
  <hr />
  <FormApp />
</div>

export default App
