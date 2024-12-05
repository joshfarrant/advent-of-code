import { map, pipe, split } from 'rambda';

const isInBounds = (arr: string[][], y: number, x: number): boolean => {
  return y >= 0 && y < arr.length && x >= 0 && x < arr[y].length;
};

type Coordinate = [y: number, x: number];
type Direction = 'NE' | 'SE' | 'SW' | 'NW';

const go: Record<Direction, (coord: Coordinate) => Coordinate> = {
  NE: ([y, x]) => [y - 1, x + 1],
  SE: ([y, x]) => [y + 1, x + 1],
  SW: ([y, x]) => [y + 1, x - 1],
  NW: ([y, x]) => [y - 1, x - 1],
};

const getMiddleChar = (str: string): string => {
  return str[Math.floor(str.length / 2)];
};

const countMatches = (searchString: string, input: string): number => {
  const middleChar = getMiddleChar(searchString);

  const arr: string[][] = pipe(split('\n'), map(split('')))(input);

  let totalMatches = 0;

  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[y].length; x++) {
      const char = arr[y][x];

      if (char !== middleChar) {
        continue;
      }

      const allMatch = [
        [go.NE([y, x]), go.SW([y, x])],
        [go.SE([y, x]), go.NW([y, x])],
      ].every(([[ay, ax], [by, bx]]) => {
        if (!isInBounds(arr, ay, ax) || !isInBounds(arr, by, bx)) {
          return false;
        }

        const str = `${arr[ay][ax]}${middleChar}${arr[by][bx]}`;
        const reversedStr = str.split('').reverse().join('');

        return str === searchString || reversedStr === searchString;
      });

      if (allMatch) {
        totalMatches++;
      }
    }
  }

  return totalMatches;
};

export default (input: string) => countMatches('MAS', input);
