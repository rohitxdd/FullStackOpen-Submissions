import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

export default function Course({ courses }) {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header title={course.name} />
          <Content contentArray={course.parts} />
          <Total exercises={course.parts} />
        </div>
      ))}
    </div>
  );
}
