import { useState, useEffect } from "react";

import DiaryEntryForm from "./components/DiaryEntryForm";
import Diary from "./components/Diary";

import "./App.css";

const API_URL = "http://localhost:8001";
const API_HEADERS = {
  "Content-Type": "application/json",
};

function App() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${API_URL}/diary`);
      const data = await response.json();
      setEntries(data);
    })();
  }, []);

  async function createEntry(mood, text) {
    const response = await fetch(`${API_URL}/diary`, {
      method: "POST",
      headers: API_HEADERS,
      body: JSON.stringify({ mood, text }),
    });

    const data = await response.json();
    setEntries([data, ...entries]);
  }

  async function updateEntry(id, mood, text) {
    const response = await fetch(`${API_URL}/diary/${id}`, {
      method: "PUT",
      headers: API_HEADERS,
      body: JSON.stringify({ mood, text }),
    });

    const data = await response.json();

    const newEntries = entries.slice();
    const index = newEntries.findIndex((e) => e.id === data.id);

    if (index === -1) {
      return;
    }

    newEntries[index] = data;

    setEntries(newEntries);
  }

  async function deleteEntry(id) {
    const response = await fetch(`${API_URL}/diary/${id}`, {
      method: "DELETE",
      headers: API_HEADERS,
    });

    if (!response.status === 200) {
      return;
    }

    const newEntries = entries.filter((e) => e.id !== id);

    setEntries(newEntries);
  }

  return (
    <div className="App">
      <DiaryEntryForm onSubmit={createEntry} />
      <Diary entries={entries} onUpdate={updateEntry} onDelete={deleteEntry} />
    </div>
  );
}

export default App;
