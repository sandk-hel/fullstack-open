import React from 'react';

interface TotalProps {
  courses: Array<{exerciseCount: number}>;
}

const Total: React.FC<TotalProps> = (({ courses }) => (
  <p>
  Number of exercises{" "}
    {courses.reduce((carry, parts) => carry + parts.exerciseCount, 0)}
  </p>
));

export default Total;
