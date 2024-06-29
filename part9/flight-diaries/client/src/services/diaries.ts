import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";
import { apiBaseUrl } from "../config";

const getAll = async (): Promise<DiaryEntry[]> => {
  const { data } = await axios.get<DiaryEntry[]>(`${apiBaseUrl}/diaries`);
  return data;
};

const addNewDiaryEntry = async (object: NewDiaryEntry) => {
  try {
    const { data } = await axios.post<DiaryEntry>(
      `${apiBaseUrl}/diaries`,
      object
    );
    return data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data);
    } else {
      throw new Error("Something went wrong");
    }
  }
};

export { getAll, addNewDiaryEntry };
