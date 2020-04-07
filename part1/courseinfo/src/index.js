import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) =>  <h1>{props.course}</h1>
const Total = (props) => <p>Number of exercises {props.exercises}</p>

const App = () =>  {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const Content = () => <>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
    </>

  return (
    <div>
      <Header course={course}/>
      <Content />
      <Total exercises={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))