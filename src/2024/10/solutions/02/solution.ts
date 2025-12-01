import { map, filter, pipe, curry, sum } from 'rambda';

const stringTo2DArray = (str: string): number[][] =>
  str.split('\n').map(x => x.split('').map(Number));

type Coordinate = [y: number, x: number];
type Direction = [dy: number, dx: number];

const directions: Direction[] = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const findStarts = (grid: number[][]): Coordinate[] => {
  const starts: Coordinate[] = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 0) starts.push([y, x]);
    }
  }

  return starts;
};

const isInBounds = curry(
  (grid: number[][], [y, x]: Coordinate): boolean =>
    y >= 0 && y < grid.length && x >= 0 && x < grid[y].length,
);

const getValidMoves = curry(
  (grid: number[][], [y, x]: Coordinate): Coordinate[] => {
    const value = grid[y][x];
    const isWithinGrid = isInBounds(grid);

    return pipe<[Direction[]], Coordinate[], Coordinate[], Coordinate[]>(
      map(([dy, dx]) => [y + dy, x + dx]),
      filter(isWithinGrid),
      filter(([y, x]) => grid[y][x] === value + 1),
    )(directions);
  },
);

const countCompletePaths = curry(
  (grid: number[][], [y, x]: Coordinate): number => {
    const value = grid[y][x];

    if (value === 9) {
      return 1;
    }

    return pipe(
      getValidMoves(grid),
      map(countCompletePaths(grid)),
      sum,
    )([y, x]);
  },
);

export default (input: string): number => {
  const grid = stringTo2DArray(input);

  return pipe(findStarts, map(countCompletePaths(grid)), sum)(grid);
};
