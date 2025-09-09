import axios from "axios";
import { NewDiaryEntry, DiaryEntry } from "./types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllEntries = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data);
};

export const addEntry = async (entry: NewDiaryEntry) => {
  try {
    const response = await axios.post<DiaryEntry>(baseUrl, entry);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    }
    throw error;
  }
};
