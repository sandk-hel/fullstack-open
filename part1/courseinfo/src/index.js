import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => (
  <h1>{props.course}</h1>
)
const Part = (props) => (
  <p>{props.title} {props.exercises}</p>
)
const Total = (props) => {
  const allExercises = props.parts.reduce((a, b) => a + b.exercises, 0)
  return <p>Number of exercises {allExercises}</p>
}
const Content = (props) => (
  props.parts.map(part => 
    <Part title={part.name} exercises={part.exercises} />
  )
)


const App = () =>  {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      }, 
      {
        name: 'Using props to pass data',
        exercises: 7
      }, 
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))