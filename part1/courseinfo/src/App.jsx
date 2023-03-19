import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";

export default function App() {
  const course = {
    name: "Half Stack application development",
    parts: [
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
    ],
  };
  return (
    <div>
      <Header title={course.name} />
      <Content contentArray={course.parts} />
      <Total exercises={course.parts} />
    </div>
  );
}
