import React, { useState, ChangeEvent } from "react";
import { TextField, Box, Typography, Button } from "@mui/material";
import { isNumber } from "./utils/isNumber";
import DialogBox from "./components/DialogBox";

const App: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setError(!isNumber(value));
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      setMessages((prevMessages) => [...prevMessages, inputValue]);
      setInputValue("");
    }
  };

  console.log(messages);
  return (
    <Box>
      <DialogBox messages={messages} />
      <Box display="flex" alignItems="center" marginTop={2}>
        <TextField
          label="Type your message"
          variant="outlined"
          fullWidth
          value={inputValue}
          onChange={handleInputChange}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          error={error}
          helperText={error ? "Please enter a valid number" : ""}
        />
        <Button
          variant="contained"
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || error}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default App;
