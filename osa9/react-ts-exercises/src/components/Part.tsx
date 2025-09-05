import type { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.kind) {
    case "basic":
      return (
        <div>
          <i>{part.description}</i>
        </div>
      );

    case "group":
      return <div>project exercises {part.groupProjectCount}</div>;
    case "background":
      return (
        <div>
          <i>{part.description}</i>
          <div>submit to {part.backgroundMaterial}</div>
        </div>
      );
    case "special":
      return (
        <div>
          <i>{part.description}</i>
          <br />
          <div>required skills: {part.requirements.join(", ")}</div>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
