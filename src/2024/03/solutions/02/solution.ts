const patternStart = 'mul(';
const patternSeparator = ',';
const patternEnd = ')';
const enablePattern = 'do()';
const disablePattern = `don't()`;

const isEndOfPattern = (
  pattern: string,
  char: string,
  input: string,
  i: number,
): boolean =>
  char === pattern.at(-1) &&
  input.slice(i - pattern.length + 1, i + 1) === pattern;

export default (input: string): number => {
  let inPattern = false;
  let result = 0;
  let tempStr = '';
  let tempTotal = 1;
  let isEnabled = true;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (isEndOfPattern(enablePattern, char, input, i)) {
      isEnabled = true;
      continue;
    }

    if (!isEnabled) continue;

    if (isEndOfPattern(disablePattern, char, input, i)) {
      isEnabled = false;
      continue;
    }

    // Starting pattern
    if (isEndOfPattern(patternStart, char, input, i)) {
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
