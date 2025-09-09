import { useEffect, useState } from "react";
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "./types";
import { addEntry, getAllEntries } from "./diaryService";
import Notification from "./components/Notification";
import { parseWeather, parseVisibility } from "./utils";

const emptyEntry: NewDiaryEntry = {
  date: "",
  weather: Weather.Sunny,
  visibility: Visibility.Great,
  comment: "",
};

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newEntry, setNewEntry] = useState<NewDiaryEntry>(emptyEntry);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    getAllEntries().then((data) => {
      {
        setEntries(data);
      }
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEntry((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const createEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const entryToAdd: NewDiaryEntry = {
      date: newEntry.date,
      weather: parseWeather(newEntry.weather),
      visibility: parseVisibility(newEntry.visibility),
      comment: newEntry.comment,
    };

    try {
      const added = await addEntry(entryToAdd);
      setEntries((prevEntries) => [...prevEntries, added]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(`${error.message}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }
    setNewEntry(emptyEntry);
  };

  return (
    <div>
      <h1>Flight diaries</h1>
      <Notification message={errorMessage} />
      <h2>add entry</h2>
      <form onSubmit={createEntry}>
        <label>Date: </label>
        <input
          name="date"
          type="date"
          value={newEntry.date}
          onChange={handleChange}
        ></input>
        <br />
        <label>Visibility: </label>
        {Object.values(Visibility).map((v) => (
          <label key={v}>
            <input
              type="radio"
              name="visibility"
              value={v}
              checked={newEntry.visibility === v}
              onChange={handleChange}
            />
            {v}
          </label>
        ))}
        <br />
        <label>Weather:</label>
        {Object.values(Weather).map((v) => (
          <label key={v}>
            <input
              type="radio"
              name="weather"
              value={v}
              checked={newEntry.weather === v}
              onChange={handleChange}
            />
            {v}
          </label>
        ))}
        <br />
        <label>Comment: </label>
        <input
          name="comment"
          value={newEntry.comment}
          onChange={handleChange}
        ></input>
        <br></br>
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      <div>
        {entries.map((entry) => (
          <div key={entry.id}>
            <div>Date: {entry.date}</div>
            <div>Weather: {entry.weather}</div>
            <div>Visibility: {entry.visibility}</div>
            <div>Comment: {entry.comment}</div>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};
export default App;
