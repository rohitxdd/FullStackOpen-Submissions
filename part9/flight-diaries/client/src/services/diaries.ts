import axios from "axios";
import { DiaryEntry } from "../types";
import { apiBaseUrl } from "../config";

const getAll = async (): Promise<DiaryEntry[]> => {
  const { data } = await axios.get<DiaryEntry[]>(`${apiBaseUrl}/diaries`);
  return data;
};

export { getAll };
