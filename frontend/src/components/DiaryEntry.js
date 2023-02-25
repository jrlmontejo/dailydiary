import { useState, useRef } from "react";

import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

import MoodIcon from "./MoodIcon";
import MoodSelector from "./MoodSelector";

import "./DiaryEntry.css";

function DiaryEntry({ id, text, mood, created, onUpdate, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const popoverOpen = Boolean(anchorEl);
  const popoverId = popoverOpen ? "popover" : undefined;

  function handleMoodClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMoodClose() {
    setAnchorEl(null);
  }

  function handleMoodSelect(option) {
    if (mood !== option) {
      onUpdate(id, option, text);
    }

    setTimeout(handleMoodClose, 200);
  }

  const inputRef = useRef(null);

  function handleTextUpdate() {
    const newText = inputRef.current.innerHTML;

    if (text === newText) {
      return;
    }

    onUpdate(id, mood, newText);
  }

  const [showCloseIcon, setShowCloseIcon] = useState(false);

  function handleMouseOver() {
    setShowCloseIcon(true);
  }

  function handleMouseLeave() {
    setShowCloseIcon(false);
  }

  function handleDelete() {
    onDelete(id);
  }

  return (
    <TimelineItem onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      <TimelineOppositeContent
        sx={{ m: "auto 0", mt: "20px" }}
        align="right"
        variant="body2"
      >
        {new Date(created).toLocaleString()}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot variant="outlined" style={{ border: "none" }}>
          <div className="DiaryEntry_moodButton" onClick={handleMoodClick}>
            <MoodIcon name={mood} />
          </div>
          <Popover
            id={popoverId}
            open={popoverOpen}
            anchorEl={anchorEl}
            onClose={handleMoodClose}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <div className="DiaryEntry_moodSelector">
              <MoodSelector selected={mood} onSelect={handleMoodSelect} />
            </div>
          </Popover>
        </TimelineDot>
        <TimelineConnector style={{ backgroundColor: "black" }} />
      </TimelineSeparator>
      <TimelineContent
        sx={{
          px: 2,
          py: 3,
          mb: "50px",
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <div
          ref={inputRef}
          contentEditable
          onBlur={handleTextUpdate}
          dangerouslySetInnerHTML={{ __html: text }}
          style={{ flex: 1 }}
        />
        <IconButton
          aria-label="delete"
          size="small"
          style={{ visibility: showCloseIcon ? "visible" : "hidden" }}
          onClick={handleDelete}
        >
          <CloseIcon color="primary" fontSize="inherit" />
        </IconButton>
      </TimelineContent>
    </TimelineItem>
  );
}

export default DiaryEntry;
