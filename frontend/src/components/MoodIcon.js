import moodMap from "../mood";

import "./MoodIcon.css";

function MoodIcon({ name, style }) {
  const moodName = name.toLowerCase();

  return (
    <img
      className="MoodIcon"
      src={moodMap[moodName]}
      alt={moodName}
      style={{ ...style }}
    />
  );
}

export default MoodIcon;
