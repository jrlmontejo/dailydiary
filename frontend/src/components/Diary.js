import Timeline from "@mui/lab/Timeline";

import DiaryEntry from "./DiaryEntry";

import "./Diary.css";

function Diary({ entries, onUpdate, onDelete }) {
  return (
    <Timeline className="Diary">
      {entries.map((entry) => (
        <DiaryEntry
          key={entry.id}
          id={entry.id}
          text={entry.text}
          mood={entry.mood}
          created={entry.created}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </Timeline>
  );
}

export default Diary;
