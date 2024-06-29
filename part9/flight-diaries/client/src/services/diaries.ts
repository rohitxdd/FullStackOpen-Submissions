import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";
import { apiBaseUrl } from "../config";

const getAll = async (): Promise<DiaryEntry[]> => {
  const { data } = await axios.get<DiaryEntry[]>(`${apiBaseUrl}/diaries`);
  return data;
};

const addNewDiaryEntry = async (object: NewDiaryEntry) => {
  const { data } = await axios.post<DiaryEntry>(
    `${apiBaseUrl}/diaries`,
    object
  );
  return data;
};

export { getAll, addNewDiaryEntry };
