import React from 'react'

let Total = ({ course }) => {
    let totalExercises = course.parts.reduce( (a, b) => 
        b.exercises + a, 0)
    return <h3>total of {totalExercises} exercises</h3>
}

export default Total