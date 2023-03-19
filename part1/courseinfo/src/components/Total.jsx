import React from "react";

export default function Total({ exercises }) {
  const total = exercises.reduce((a, c) => a + c.exercises, 0);
  return <p>Number of exercises {total}</p>;
}
