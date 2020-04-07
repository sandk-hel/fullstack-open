import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => (
  <h1>{props.course}</h1>
)
const Part = (props) => (
  <p>{props.title} {props.exercises}</p>
)
const Total = (props) => ( 
  <p>Number of exercises {props.exercises}</p>
)
const Content = (props) => (
  props.parts.map(part => 
    <Part title={part.name} exercises={part.exercises} />
  )
)


const App = () =>  {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  const parts = [part1, part2, part3]
  const total = parts.reduce((a, b) => a + b.exercises, 0)

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total exercises={total} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))