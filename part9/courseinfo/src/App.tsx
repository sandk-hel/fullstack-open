import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';
import { CoursePart } from './types'

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    }, 
    {
      name: "DevOps with Docker",
      description: "Learn the basics of modern software deployment in this introductory course to Docker and docker-compose. Also peek into the various parts that web services consist of such as reverse proxies, databases etc.",
      credit: 3,
      exerciseCount: 100
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts.map(a => ({exerciseCount: a.exerciseCount }))} />
    </div>
  )
}

export default App;
