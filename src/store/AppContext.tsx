import React, { createContext, useState } from "react";

interface AppContextProps {
  time: number | null;
  frequencyArray: { number: number; freq: number }[];
  numbers: number[];
  setTime: React.Dispatch<React.SetStateAction<number | null>>;
  setFrequencyArray: React.Dispatch<
    React.SetStateAction<{ number: number; freq: number }[]>
  >;
  setNumbers: React.Dispatch<React.SetStateAction<number[]>>;
}

const AppContext = createContext<AppContextProps>({
  time: null,
  frequencyArray: [],
  numbers: [],
  setTime: () => {},
  setFrequencyArray: () => {},
  setNumbers: () => {},
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [time, setTime] = useState<number | null>(null);
  const [frequencyArray, setFrequencyArray] = useState<
    {
      number: number;
      freq: number;
    }[]
  >([]);
  const [numbers, setNumbers] = useState<number[]>([]);

  const contextValue: AppContextProps = {
    time,
    frequencyArray,
    numbers,
    setTime,
    setFrequencyArray,
    setNumbers,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export { AppContext, AppProvider };
