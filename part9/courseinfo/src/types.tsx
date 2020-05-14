export interface CoursePartBase {
  name: string; 
  exerciseCount: number;
}

export interface DescriptiveCoursePart extends CoursePartBase {
  description: string;
}

export interface CoursePartOne extends DescriptiveCoursePart {
  name: "Fundamentals";
}

export interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

export interface CoursePartThree extends DescriptiveCoursePart {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

export interface CoursePartFour extends DescriptiveCoursePart {
  name: "DevOps with Docker";
  credit: number;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour