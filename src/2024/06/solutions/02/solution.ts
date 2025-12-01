const stringTo2DArray = (str: string) => str.split('\n').map(x => x.split(''));

type Coordinate = [y: number, x: number];
const directions = ['N', 'E', 'S', 'W'] as const;
type Direction = (typeof directions)[number];

const go: Record<Direction, (coord: Coordinate) => Coordinate> = {
  N: ([y, x]) => [y - 1, x],
  E: ([y, x]) => [y, x + 1],
  S: ([y, x]) => [y + 1, x],
  W: ([y, x]) => [y, x - 1],
};

const turnRight = (current: Direction): Direction =>
  directions[(directions.indexOf(current) + 1) % directions.length];

const CHAR = {
  START: '^',
  WALL: '#',
  EMPTY: '.',
};

const findStart = (arr: string[][]): Coordinate => {
  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[y].length; x++) {
      if (arr[y][x] === CHAR.START) return [y, x];
    }
  }
  throw new Error(`no start character "${CHAR.START}" found`);
};

const isInBounds = (arr: string[][], [y, x]: Coordinate) =>
  y >= 0 && y < arr.length && x >= 0 && x < arr[y].length;

const copyArr = (arr: string[][]) => [...arr].map(x => [...x]);

const getVisited = (arr: string[][]) => {
  const start = findStart(arr);

  const visited = new Set<string>();

  let current = start;
  let direction: Direction = 'N';

  while (true) {
    const [nextY, nextX] = go[direction](current);

    if (!isInBounds(arr, [nextY, nextX])) {
      return visited;
    }

    const nextChar = arr[nextY][nextX];

    if (nextChar === CHAR.WALL) {
      direction = turnRight(direction);
      continue;
    }

    if (nextChar === CHAR.EMPTY || nextChar === CHAR.START) {
      current = [nextY, nextX];
      visited.add(current.join(','));
      continue;
    }
  }
};

const detectLoop = (arr: string[][]) => {
  const start = findStart(arr);

  const visited = new Set<string>();

  let current = start;
  let direction: Direction = 'N';

  while (true) {
    const [nextY, nextX] = go[direction](current);

    if (visited.has([nextY, nextX, direction].join(','))) {
      return true;
    }

    if (!isInBounds(arr, [nextY, nextX])) {
      return false;
    }

    const nextChar = arr[nextY][nextX];

    if (nextChar === CHAR.WALL) {
      direction = turnRight(direction);
      continue;
    }

    if (nextChar === CHAR.EMPTY || nextChar === CHAR.START) {
      current = [nextY, nextX];
      visited.add([...current, direction].join(','));
      continue;
    }
  }
};

export default (input: string): number => {
  const arr = stringTo2DArray(input);

  const visited = getVisited(arr);

  return Array.from(visited.entries()).filter(([v]) => {
    const [y, x] = v.split(',').map(Number);

    const arrCopy = copyArr(arr);

    if (arrCopy[y][x] === CHAR.EMPTY) {
      arrCopy[y][x] = CHAR.WALL;
    }

    return detectLoop(arrCopy);
  }).length;
};
