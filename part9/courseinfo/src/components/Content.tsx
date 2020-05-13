import React from 'react';

interface CourseEntry {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courses: Array<CourseEntry>;
}

const Content: React.FC<ContentProps> = (({ courses }) => (
  <>
    {courses.map(course =>
      <p key={course.name}>
        {course.name} {course.exerciseCount}
      </p>
    )}
  </>
));

export default Content;
