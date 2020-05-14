import React from 'react';
import { CoursePart, CoursePartOne, CoursePartTwo, CoursePartThree, CoursePartFour } from '../types'

interface PartInterface {
  course: CoursePart;
}

const Part: React.FC<PartInterface> = ({ course }) => {
  const coursePartOne = ((course: CoursePartOne) => (
    <>
      <h3>{course.name}</h3>
      <p>
        {course.description}
      </p>
      <p key={course.name}>
        {course.exerciseCount} exercises
        </p>
    </>
  ))

  const coursePartTwo = ((course: CoursePartTwo) => (
    <>
      <h3>{course.name}</h3>
      <p key={course.name}>
        {course.exerciseCount} exercises
        </p>
      <p>
        Total group projects: {course.groupProjectCount}
      </p>
    </>
  ))

  const coursePartThree = ((course: CoursePartThree) => (
    <>
      <h3>{course.name}</h3>
      <p>
        {course.description}
      </p>
      <p>
        {course.exerciseCount} exercises
        </p>
        Submit your exercises <a href={course.exerciseSubmissionLink}>here</a>
    </>
  ))

  const coursePartFour = ((course: CoursePartFour) => (
    <>
      <h3>{course.name}</h3>
      <p>
        {course.description}
      </p>
      <p>
        {course.exerciseCount} exercises
      </p>
      Credits: {course.credit}
    </>
  ))

  switch (course.name) {
    case "Fundamentals":
      return coursePartOne(course)
    case "Using props to pass data":
      return coursePartTwo(course)
    case "Deeper type usage":
      return coursePartThree(course)
    case "DevOps with Docker":
      return coursePartFour(course)
    default:
      return null;
  }
};

export default Part;
