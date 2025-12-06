const add = (a: number, b: number) => a + b;
const multiply = (a: number, b: number) => a * b;

const operationsMap = {
  '+': add,
  '*': multiply,
};

type SupportedOperation = keyof typeof operationsMap;
const isValidOperation = (char: string): char is SupportedOperation =>
  Object.keys(operationsMap).includes(char);

const getOperation = (char: SupportedOperation) => operationsMap[char];

export default (input: string): number => {
  const lines = input.split('\n');

  const rowCount = lines.length;
  const columnCount = Math.max(...lines.map(line => line.length));

  let total = 0;

  let numbers: string[] = [];

  let localColumn = 0;

  for (let c = columnCount - 1; c >= 0; c--) {
    for (let r = 0; r < rowCount; r++) {
      const row = lines[r];
      if (c < row.length) {
        const char = row[c];

        if (char === ' ') continue;

        if (isValidOperation(char)) {
          const operation = getOperation(char);

          total += numbers.reduce(
            (a, c) => operation(a, Number(c)),
            operation === multiply ? 1 : 0,
          );

          numbers = [];
          localColumn = 0;
        } else {
          const existingChars = numbers[localColumn];

          numbers[localColumn] = existingChars
            ? numbers[localColumn] + char
            : char;
        }
      }
    }

    localColumn++;
  }

  return total;
};
