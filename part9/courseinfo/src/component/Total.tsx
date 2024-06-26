interface TotalPropsType {
  totalExercises: number;
}

export default function Total({ totalExercises }: TotalPropsType) {
  return <p>Number of exercises {totalExercises}</p>;
}
