const removeCharsFromStart = (input: string, count: number): string =>
  input.substring(count);

const removeCharsFromEnd = (input: string, count: number): string =>
  input.substring(0, input.length - count);

const decrementFirstDigit = (input: string): string => {
  let firstDigit = input.at(0);
  let rest = removeCharsFromStart(input, 1);

  return (Number(firstDigit) - 1).toString() + rest;
};

const decrementLastDigit = (input: string): string => {
  let lastDigit = input.at(-1);
  let rest = removeCharsFromEnd(input, 1);

  return rest + (Number(lastDigit) - 1).toString();
};

export default (input: string): number => {
  let checksum = 0;

  let idx = 0;
  let isFile = true;

  let fileId = 0;
  let maxFileId = Math.floor(input.length / 2);

  while (input.length > 0) {
    const firstDigit = Number(input.at(0));
    const lastDigit = Number(input.at(-1));

    if (firstDigit === 0) {
      input = removeCharsFromStart(input, 1);

      if (isFile) {
        fileId++;
      }

      isFile = !isFile;
      continue;
    }

    if (lastDigit === 0) {
      // Minus 2 as we can remove the last digit and the space
      input = removeCharsFromEnd(input, 2);
      maxFileId--;
      continue;
    }

    if (isFile) {
      // We're looking at a file which is non-zero
      checksum += fileId * idx;

      input = decrementFirstDigit(input);
      idx++;
      continue;
    }

    // We're looking at space value which is non-zero
    // We also have a last digit which is a file and non-zero
    input = decrementLastDigit(input);

    checksum += maxFileId * idx;

    input = decrementFirstDigit(input);

    idx++;
  }

  return checksum;
};
