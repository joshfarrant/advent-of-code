import { map, pipe, split } from 'rambda';

const isInBounds = (arr: string[][], y: number, x: number): boolean => {
  return y >= 0 && y < arr.length && x >= 0 && x < arr[y].length;
};

type Coordinate = [y: number, x: number];
type Direction = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

const go: Record<Direction, (coord: Coordinate) => Coordinate> = {
  N: ([y, x]) => [y - 1, x],
  NE: ([y, x]) => [y - 1, x + 1],
  E: ([y, x]) => [y, x + 1],
  SE: ([y, x]) => [y + 1, x + 1],
  S: ([y, x]) => [y + 1, x],
  SW: ([y, x]) => [y + 1, x - 1],
  W: ([y, x]) => [y, x - 1],
  NW: ([y, x]) => [y - 1, x - 1],
};

const countMatches = (searchString: string, input: string): number => {
  const arr: string[][] = pipe(split('\n'), map(split('')))(input);

  let totalMatches = 0;

  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[y].length; x++) {
      const char = arr[y][x];

      if (char !== searchString[0]) {
        continue;
      }

      let [initialY, initialX] = [y, x];
      const matches = Object.values(go).filter(move => {
        let [y, x] = move([initialY, initialX]);
        let i = 1;

        while (isInBounds(arr, y, x) && arr[y][x] === searchString[i]) {
          i++;
          if (i === searchString.length) {
            return true;
          }
          [y, x] = move([y, x]);
        }
      });

      totalMatches += matches.length;
    }
  }

  return totalMatches;
};

export default (input: string) => countMatches('XMAS', input);
