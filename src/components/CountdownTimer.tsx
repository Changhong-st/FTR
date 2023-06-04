import React, { useEffect, useState } from "react";

interface CountdownProps {
  initialTime: number; // Initial time in seconds
}

const Countdown: React.FC<CountdownProps> = ({ initialTime }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    // Timer interval
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          // Reset time if it reaches zero
          return initialTime;
        } else {
          // Decrease time by 1 second
          return prevTime - 1;
        }
      });
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timer);
  }, [initialTime]);

  return <div>{time}</div>;
};

export default Countdown;
