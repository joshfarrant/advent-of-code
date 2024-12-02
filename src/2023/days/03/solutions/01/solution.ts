import { clamp, filter, map, nth, pipe, split, sum } from 'rambda';

type LocatedNumber = [Row: number, Column: number, Number: number];

const isNumber = (x: string): boolean => !isNaN(Number(x));

const locateNumbers = (lines: string[]): LocatedNumber[] => {
  let numbers: LocatedNumber[] = [];

  for (let row = 0; row < lines.length; row++) {
    const line = lines[row];

    for (let column = 0; column < line.length; column++) {
      let currentChar = line[column];
      let prevChar = column === 0 ? '.' : line[column - 1];
      let charIdx = column;
      let numberString = '';

      if (isNumber(prevChar)) {
        continue;
      }

      while (isNumber(currentChar) && charIdx < line.length) {
        numberString += currentChar;
        charIdx++;
        currentChar = line[charIdx];
      }

      if (numberString.length > 0) {
        const number = Number(numberString);

        numbers.push([row, column, number]);
      }
    }
  }

  return numbers;
};

const validateNumber = (lines: string[]) => {
  const rowsCount = lines.length;
  const columnsCount = lines[0].length;
  const clampRow = clamp(0, rowsCount - 1);
  const clampColumn = clamp(0, columnsCount - 1);

  return ([row, column, number]: LocatedNumber): boolean => {
    const numberLength = number.toString().length;
    const startRow = clampRow(row - 1);
    const endRow = clampRow(row + 1);
    const startColumn = clampColumn(column - 1);
    const endColumn = clampColumn(column + numberLength + 1);

    let currentRow = startRow;
    let allCharacters = '';

    while (currentRow <= endRow) {
      allCharacters += lines[currentRow].slice(startColumn, endColumn);
      currentRow++;
    }

    return /[^0-9\.]/g.test(allCharacters);
  };
};

const solution = (input: string): number => {
  const lines = split('\n')(input);
  const validator = validateNumber(lines);

  return pipe(
    split('\n'),
    locateNumbers,
    filter(validator),
    map(x => x[2]),
    sum,
  )(input);
};

export default solution;
