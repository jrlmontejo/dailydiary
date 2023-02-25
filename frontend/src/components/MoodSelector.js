import moodMap from "../mood";

import MoodIcon from "./MoodIcon";

import "./MoodSelector.css";

function MoodSelector({ selected, onSelect }) {
  const moods = Object.keys(moodMap);

  function handleSelect(option) {
    onSelect(option);
  }

  return (
    <div className="MoodSelector">
      {moods.map((m) => (
        <div
          key={m}
          className={`MoodSelector_option ${
            selected && selected !== m ? "unselected" : "selected"
          }`}
          onClick={() => handleSelect(m)}
        >
          <MoodIcon name={m} />
        </div>
      ))}
    </div>
  );
}

export default MoodSelector;
