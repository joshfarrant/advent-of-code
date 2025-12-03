// Returns the index of the first occurrance of the highest number in a string
const getFirstHighestNumberIndex = (line: string): number => {
  let highestValue = 0;
  let highestValueIdx = 0;

  for (let i = 0; i < line.length; i++) {
    const value = Number(line[i]);

    // We can't do better than a 9, so return early
    if (value === 9) return i;

    if (value > highestValue) {
      highestValue = value;
      highestValueIdx = i;
    }
  }

  return highestValueIdx;
};

const getJoltage =
  (length: number) =>
  (line: string): number => {
    let joltage = '';
    let remainingLine = line;

    for (let i = length - 1; i >= 0; i--) {
      /**
       * The last `i` characters in the string are off-limits as we need to make
       * sure there are enough remaining characters to complete the string.
       */
      const partialLine =
        i === 0 ? remainingLine : remainingLine.slice(0, -1 * i);
      const idx = getFirstHighestNumberIndex(partialLine);

      joltage += partialLine[idx];
      remainingLine = remainingLine.slice(idx + 1);
    }

    return Number(joltage);
  };

const getJoltage12 = getJoltage(12);

export default (input: string): number =>
  input.split('\n').reduce((total, line) => total + getJoltage12(line), 0);
