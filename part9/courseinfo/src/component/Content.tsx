import { CoursePart } from "../App";

interface ContentPropsType {
  data: CoursePart[];
}

export default function Content({ data }: ContentPropsType): JSX.Element {
  return (
    <>
      {data.map((e) => {
        switch (e.kind) {
          case "basic":
            return (
              <>
                <h2>
                  {e.name} {e.exerciseCount}
                </h2>
                <p>{e.description}</p>
              </>
            );
          case "group":
            return (
              <>
                <h2>
                  {e.name} {e.exerciseCount}
                </h2>
                <p>project exercises {e.groupProjectCount}</p>
              </>
            );
          case "background":
            return (
              <>
                <h2>
                  {e.name} {e.exerciseCount}
                </h2>
                <p>{e.description}</p>
                <p>submit to {e.backgroundMaterial}</p>
              </>
            );
          case "special":
            return (
              <>
                <h2>
                  {e.name} {e.exerciseCount}
                </h2>
                <p>{e.description}</p>
                <p>required skills: {...e.requirements}</p>
              </>
            );
          default:
            return <></>;
        }
      })}
    </>
  );
}
