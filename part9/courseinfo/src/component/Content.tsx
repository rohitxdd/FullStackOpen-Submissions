type CoursePartDetail = {
  name: string;
  exerciseCount: number;
};

interface ContentPropsType {
  data: CoursePartDetail[];
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
