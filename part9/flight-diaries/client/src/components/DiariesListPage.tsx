import React from "react";
import { DiaryEntry } from "../types";

interface DiariesListProps {
  DiariesList: DiaryEntry[];
}

export default function DiariesListPage({ DiariesList }: DiariesListProps) {
  return (
    <div>
      <h3>Diary Entries</h3>
      {DiariesList.map((e) => {
        return (
          <React.Fragment key={e.id}>
            <h4>{e.date}</h4>
            <p>visibility: {e.visibility}</p>
            <p>weather: {e.weather}</p>
            <p>Comment: {e.comment}</p>
          </React.Fragment>
        );
      })}
    </div>
  );
}
