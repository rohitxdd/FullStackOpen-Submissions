import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import DiariesListPage from "./components/DiariesListPage";
import { getAll } from "./services/diaries";
import NewDiaryEntry from "./components/NewDiaryEntry";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  function addDiaries(obj: DiaryEntry) {
    setDiaries((prev) => [...prev, obj]);
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
      <NewDiaryEntry addDiaries={addDiaries} />
      <DiariesListPage DiariesList={diaries} />
    </>
  );
}

export default App;
