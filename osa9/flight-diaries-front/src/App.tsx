import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import { getAllEntries } from "./diaryService";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then((data) => {
      {
        setEntries(data);
      }
    });
  }, []);

  return (
    <div>
      <h1>Flight diaries</h1>
      <h2>Diary entries</h2>
      <div>
        {entries.map((entry) => (
          <div key={entry.id}>
            <div>Date: {entry.date}</div>
            <div>Weather: {entry.weather}</div>
            <div>Visibility: {entry.visibility}</div>
            <div>Comment: {entry.comment}</div>
            <br></br>
          </div>
        ))}
      </div>
    </div>
  );
};
export default App;
