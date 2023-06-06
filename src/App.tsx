import React, { useState, ChangeEvent, useContext, useEffect } from "react";
import { TextField, Box, Button, Grid, Typography } from "@mui/material";
import { isNumber } from "./utils/isNumber";
import DialogBox from "./components/DialogBox";
import calculateFrequency from "./utils/calculateFrequency";
import Countdown from "./components/CountdownTimer";
import { AppContext } from "./store/AppContext";

const quitMessage = "Thanks for playing, close the web tab to exit.";

const App: React.FC = () => {
  const { time, numbers, setNumbers, setTime } = useContext(AppContext);
  const [initialTime, setInitialTime] = useState<number>(0);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const [displayFreq, setDisplayFreq] = useState<string[]>([]);
  const [isQuit, setIsQuit] = useState(false);

  const frequencyArray = calculateFrequency(numbers);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setError(!isNumber(value));
  };

  const handleSendNumber = () => {
    if (inputValue.trim() !== "") {
      if (time === null) {
        setTime(Number(inputValue));
        setInitialTime(Number(inputValue));
      } else {
        setNumbers((prevNumbers) => [...prevNumbers, Number(inputValue)]);
      }
      setInputValue("");
    }
  };

  useEffect(() => {
    const currentFreqString = frequencyArray
      .map(({ number, freq }) => `${number}:${freq}`)
      .join(", ");
    const interval = setInterval(() => {
      if (time === 0 && currentFreqString) {
        setDisplayFreq((prevFreq) => [...prevFreq, currentFreqString]);
      }
    }, 600);

    return () => {
      clearInterval(interval);
    };
  }, [frequencyArray, time]);

  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <DialogBox numbers={numbers} />
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Countdown initialTime={initialTime} disable={isQuit} />
            {!isQuit &&
              displayFreq.map((freq, index) => (
                <Typography variant="body1" gutterBottom>
                  {freq}
                </Typography>
              ))}
            {isQuit && (
              <p>
                {frequencyArray
                  .map(({ number, freq }) => `${number}:${freq}`)
                  .join(", ")}
                <br />
                {quitMessage}
              </p>
            )}
          </Box>
        </Grid>
      </Grid>
      <Box display="flex" alignItems="center" marginTop={2}>
        <TextField
          label={
            time === null
              ? "Please input the number of time in seconds between emitting numbers and their frequency"
              : numbers.length === 0
              ? "Please enter the first number"
              : "Please enter the next number"
          }
          variant="outlined"
          fullWidth
          value={inputValue}
          onChange={handleInputChange}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          error={error}
          disabled={isQuit}
          helperText={error ? "Please enter a valid number" : ""}
        />
        <Button
          variant="contained"
          onClick={handleSendNumber}
          disabled={!inputValue.trim() || error || isQuit}
        >
          Send
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setIsQuit(true);
          }}
        >
          Quit
        </Button>
      </Box>
    </Box>
  );
};

export default App;
