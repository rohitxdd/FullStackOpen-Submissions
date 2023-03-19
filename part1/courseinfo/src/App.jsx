import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";

export default function App() {
  const courseTitle = "Half Stack application development";
  const courses = [
    {
      id: 1,
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      id: 2,
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      id: 3,
      name: "State of a component",
      exercises: 14,
    },
  ];
  return (
    <div>
      <Header title={courseTitle} />
      <Content contentArray={courses} />
      <Total exercises={courses} />
    </div>
  );
}
