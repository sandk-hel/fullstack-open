import React from 'react';
import Part from './Part'
import { CoursePart } from '../types'

interface ContentProps {
  courses: Array<CoursePart>;
}

const Content: React.FC<ContentProps> = (({ courses }) => (
  <>
    {courses.map(course =>
      <>
        <Part key={course.name} course={course} />
        <hr />
      </>
    )}
  </>
));

export default Content;
