import React, { useState } from "react";
import "./NewDiary.styles.css";
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "../types";
import { addNewDiaryEntry } from "../services/diaries";

interface NewDiariesFormProps {
  addDiaries: (obj: DiaryEntry) => void;
  setErrorMsg: (msg: string) => void;
}

export default function NewDiaryEntryForm({
  addDiaries,
  setErrorMsg,
}: NewDiariesFormProps) {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  function resetForm() {
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  }

  async function handleFormSubmit() {
    try {
      const obj = {
        date,
        visibility,
        weather,
        comment,
      } as NewDiaryEntry;
      const res = await addNewDiaryEntry(obj);
      resetForm();
      console.log(res);
      addDiaries(res);
    } catch (e) {
      let error = "Something went wrong";
      if (e instanceof Error) {
        error = e.message;
      }
      setErrorMsg(error);
    }
  }
  return (
    <div>
      <h2>Add new Entry</h2>
      <div className="form">
        <h3>Date:</h3>
        <div>
          <input
            onChange={(e) => setDate(e.target.value)}
            value={date}
            type="date"
          />
        </div>
        <h3>Visibility:</h3>
        <div>
          {Object.keys(Visibility).map((elem) => {
            const value = Visibility[elem as keyof typeof Visibility];
            return (
              <React.Fragment key={elem}>
                <span>{elem}: </span>
                <input
                  type="radio"
                  name="visibility"
                  value={value}
                  checked={visibility === value}
                  onChange={(e) => setVisibility(e.target.value)}
                />{" "}
              </React.Fragment>
            );
          })}
        </div>
        <h3>Weather:</h3>
        <div>
          {Object.keys(Weather).map((elem) => {
            const value = Weather[elem as keyof typeof Weather];
            return (
              <React.Fragment key={elem}>
                <span>{elem}: </span>
                <input
                  type="radio"
                  name="weather"
                  value={value}
                  checked={weather === value}
                  onChange={(e) => setWeather(e.target.value)}
                />{" "}
              </React.Fragment>
            );
          })}
        </div>
        <h3>Comment:</h3>
        <div>
          <input
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            type="text"
          />
        </div>
        <button onClick={handleFormSubmit}>Add</button>
      </div>
    </div>
  );
}
