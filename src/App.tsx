import React, { useState, ChangeEvent } from "react";
import { TextField, Box, Button, Grid } from "@mui/material";
import { isNumber } from "./utils/isNumber";
import DialogBox from "./components/DialogBox";
import calculateFrequency from "./utils/calculateFrequency";
import Countdown from "./components/CountdownTimer";

const App: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  const frequencyArray = calculateFrequency(numbers);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setError(!isNumber(value));
  };

  const handleSendNumber = () => {
    if (inputValue.trim() !== "") {
      setNumbers((prevNumbers) => [...prevNumbers, Number(inputValue)]);
      setInputValue("");
    }
  };

  console.log(frequencyArray, "freq");
  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <DialogBox numbers={numbers} />
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Countdown initialTime={10} />
          </Box>
        </Grid>
      </Grid>
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
          onClick={handleSendNumber}
          disabled={!inputValue.trim() || error}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default App;
