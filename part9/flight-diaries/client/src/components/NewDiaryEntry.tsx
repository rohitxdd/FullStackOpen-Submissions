import { useState } from "react";
import "./NewDiary.styles.css";
import { DiaryEntry, NewDiaryEntry } from "../types";
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
            type="text"
          />
        </div>
        <h3>Visibility:</h3>
        <div>
          <input
            onChange={(e) => setVisibility(e.target.value)}
            value={visibility}
            type="text"
          />
        </div>
        <h3>Weather:</h3>
        <div>
          <input
            onChange={(e) => setWeather(e.target.value)}
            value={weather}
            type="text"
          />
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
