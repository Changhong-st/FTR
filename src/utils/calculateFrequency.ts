interface FrequencyRecord {
  number: number;
  freq: number;
}

const calculateFrequency = (input: number[]): FrequencyRecord[] => {
  const frequencyMap = new Map<number, number>();

  // Calculate the frequency of each number
  for (const num of input) {
    const currentFreq = frequencyMap.get(num) || 0;
    frequencyMap.set(num, currentFreq + 1);
  }

  // Convert the frequency map to an array of objects
  const frequencyArray: FrequencyRecord[] = [];
  frequencyMap.forEach((freq, number) => {
    frequencyArray.push({ number, freq });
  });

  // Sort the frequency array in descending order of frequency
  frequencyArray.sort((a, b) => b.freq - a.freq);

  return frequencyArray;
};

export default calculateFrequency;
