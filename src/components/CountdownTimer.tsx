import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../store/AppContext";
import { Button, Grid } from "@mui/material";

interface CountdownProps {
  initialTime: number;
  disable: boolean;
}

const Countdown: React.FC<CountdownProps> = ({ initialTime, disable }) => {
  const { time, setTime } = useContext(AppContext);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isActive) {
      if (time !== null && time > 0 && !disable) {
        intervalId = setInterval(() => {
          setTime((prevTime) => (prevTime !== null ? prevTime - 1 : null));
        }, 1000);
      } else if (time === 0) {
        intervalId = setInterval(() => {
          setTime(initialTime);
        }, 1000); // Repeat countdown
      }
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isActive, time, setTime, initialTime, disable]);

  return (
    <Grid
      container
      direction="row"
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Grid item xs={12}>
        <p>{time}</p>
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          onClick={() => {
            setIsActive(false);
          }}
          disabled={!isActive || !time || disable}
        >
          Halt
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          onClick={() => {
            setIsActive(true);
          }}
          disabled={isActive || !time || disable}
        >
          Resume
        </Button>
      </Grid>
    </Grid>
  );
};

export default Countdown;
