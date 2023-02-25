import { useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import MoodSelector from "./MoodSelector";

import "./DiaryEntryForm.css";

function DiaryEntryForm({ onSubmit }) {
  const [mood, setMood] = useState("");
  const [notes, setNotes] = useState("");

  function handleSelect(option) {
    setMood(option);
  }

  function handleSubmit() {
    onSubmit(mood, notes);
    setMood("");
    setNotes("");
  }

  return (
    <Paper className="DiaryEntryForm" elevation={2} sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        How are you feeling today?
      </Typography>
      <MoodSelector selected={mood} onSelect={handleSelect} />
      <TextField
        id="notes-input"
        autoFocus
        label="Enter your notes..."
        multiline
        maxRows={4}
        variant="standard"
        sx={{ mt: 2 }}
        value={notes}
        onChange={(event) => {
          setNotes(event.target.value);
        }}
      />
      <Stack
        sx={{ pt: 3 }}
        spacing={2}
        direction="row"
        justifyContent="flex-end"
      >
        <Button
          variant="outlined"
          style={{ border: "2px solid" }}
          disabled={!mood || !notes ? true : false}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Stack>
    </Paper>
  );
}

export default DiaryEntryForm;
