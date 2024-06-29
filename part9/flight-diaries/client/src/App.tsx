import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import DiariesListPage from "./components/DiariesListPage";
import { getAll } from "./services/diaries";
import NewDiaryEntry from "./components/NewDiaryEntry";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string>("");

  function addDiaries(obj: DiaryEntry) {
    setDiaries((prev) => [...prev, obj]);
  }

  function SetErrorMessage(error: string) {
    setError(error);
    setTimeout(() => {
      setError("");
    }, 5000);
  }

  useEffect(() => {
    async function getDiaries() {
      const res = await getAll();
      setDiaries(res);
    }
    void getDiaries();
  }, []);

  return (
    <>
      <h1>Flight Diaries</h1>
      <ErrorMessage message={error} />
      <NewDiaryEntry addDiaries={addDiaries} setErrorMsg={SetErrorMessage} />
      <DiariesListPage DiariesList={diaries} />
    </>
  );
}

export default App;
