import type { CoursePart, ContentProps } from "../types";
import Part from "./Part";

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((course: CoursePart) => (
        <div key={course.name}>
          <strong>
            {course.name} {course.exerciseCount}
          </strong>
          <Part part={course} />
          <p></p>
        </div>
      ))}
    </div>
  );
};

export default Content;
