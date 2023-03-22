import React from "react";
import Part from "./Part";

export default function Content({ contentArray }) {
  return contentArray.map((content) => (
    <Part key={content.id} name={content.name} exercise={content.exercises} />
  ));
}
