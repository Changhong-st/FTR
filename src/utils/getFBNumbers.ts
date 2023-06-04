export const getFibonacciNumbers = (length: number): number[] => {
  const fibonacciNumbers: number[] = [0, 1]; // Initialize with the first two Fibonacci numbers

  while (fibonacciNumbers.length < length) {
    const lastNumber = fibonacciNumbers[fibonacciNumbers.length - 1];
    const secondLastNumber = fibonacciNumbers[fibonacciNumbers.length - 2];
    const nextNumber = lastNumber + secondLastNumber;
    fibonacciNumbers.push(nextNumber);
  }

  return fibonacciNumbers;
};
