import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import DiariesListPage from "./components/DiariesListPage";
import { getAll } from "./services/diaries";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

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
      <DiariesListPage DiariesList={diaries} />
    </>
  );
}

export default App;
