import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

let Course = ({ course }) => (
    <>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total course={course} />
    </>
)

export default Course