const patternStart = 'mul(';
const patternSeparator = ',';
const patternEnd = ')';

export default (input: string): number => {
  let inPattern = false;
  let result = 0;
  let tempStr = '';
  let tempTotal = 1;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    // Starting pattern
    if (
      char === patternStart.at(-1) &&
      input.slice(i - patternStart.length + 1, i + 1) === patternStart
    ) {
      inPattern = true;
      continue;
    }

    // Ending pattern
    if (inPattern && char === patternEnd) {
      inPattern = false;
      tempTotal *= parseInt(tempStr, 10);
      result += tempTotal;

      tempStr = '';
      tempTotal = 1;
      continue;
    }

    // Pattern separator
    if (inPattern && char === patternSeparator) {
      tempTotal *= parseInt(tempStr, 10);
      tempStr = '';
      continue;
    }

    // Number in pattern
    if (inPattern && !isNaN(parseInt(char, 10))) {
      tempStr += char;
      continue;
    }

    // Non-number in pattern
    if (inPattern) {
      inPattern = false;
      tempTotal = 1;
      tempStr = '';
      continue;
    }
  }

  return result;
};
