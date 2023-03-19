import React from "react";

export default function Content({ contentArray }) {
  return contentArray.map((content) => (
    <p key={content.id}>
      {content.name} {content.exercises}
    </p>
  ));
}
