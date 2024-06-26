import { CoursePart } from "../App";

interface ContentPropsType {
  data: CoursePart[];
}

export default function Content({ data }: ContentPropsType): JSX.Element {
  return (
    <>
      {data.map((e) => (
        <p key={e.name}>
          {e.name} {e.exerciseCount}
        </p>
      ))}
    </>
  );
}
