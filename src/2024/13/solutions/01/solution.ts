import {
  split,
  map,
  pipe,
  filter,
  sum,
  reduce,
  gt,
  tap,
  length,
  flip,
} from 'rambda';

type Coordinate = [number, number];
type Machine = {
  a: Coordinate;
  b: Coordinate;
  target: Coordinate;
};

const extractCoords = (line: string): Coordinate => {
  const coordString = line.split(': ')[1];
  const [x, y] = coordString.split(', ').map(coord => {
    const num = coord.match(/[+-]?\d+/)?.[0] ?? '0';
    return parseInt(num, 10);
  });
  return [x, y];
};

const hasSolution = ({ a: [ax, ay], b: [bx, by], target: [tx, ty] }: Machine) =>
  tx % gcd(ax, bx) === 0 && ty % gcd(ay, by) === 0;

// Greatest common divisor
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

const extendedGcd = (
  a: number,
  b: number,
): {
  gcd: number;
  x: number;
  y: number;
} => {
  if (b === 0) {
    return { gcd: a, x: 1, y: 0 };
  }

  // Recursively solve for smaller numbers
  const { gcd, x: x1, y: y1 } = extendedGcd(b, a % b);

  // Work backwards to find x and y
  const x = y1;
  const y = x1 - Math.floor(a / b) * y1;

  return { gcd, x, y };
};

const findValidSolutions = (
  coefA: number,
  coefB: number,
  target: number,
): Coordinate[] => {
  const { gcd, x, y } = extendedGcd(coefA, coefB);

  const scale = target / gcd;
  const a0 = x * scale;
  const b0 = y * scale;

  const stepA = coefB / gcd;
  const stepB = coefA / gcd;

  const solutions: Coordinate[] = [];

  for (let k = -2000; k <= 2000; k++) {
    const a = a0 + stepA * k;
    const b = b0 - stepB * k;

    if (a >= 0 && a <= 100 && b >= 0 && b <= 100) {
      if (coefA * a + coefB * b === target) {
        solutions.push([a, b]);
      }
    }
  }

  return solutions;
};

const findOverlappingSolutions = (machine: Machine): Coordinate[] => {
  const {
    a: [ax, ay],
    b: [bx, by],
    target: [tx, ty],
  } = machine;

  const xSolutions = findValidSolutions(ax, bx, tx);
  const ySolutions = findValidSolutions(ay, by, ty);

  return xSolutions.filter(([x1, y1]) =>
    ySolutions.some(([x2, y2]) => x1 === x2 && y1 === y2),
  );
};

const aCost = 3;
const bCost = 1;
const calculateCost = ([a, b]: [number, number]): number =>
  aCost * a + bCost * b;

const parseMachine = pipe(split('\n'), lines => ({
  a: extractCoords(lines[0]),
  b: extractCoords(lines[1]),
  target: extractCoords(lines[2]),
}));

const flippedGt = flip(gt);

const getLowestCost = (min: Coordinate, solution: Coordinate) =>
  calculateCost(solution) < calculateCost(min) ? solution : min;

export default pipe(
  split('\n\n'),
  map(parseMachine),
  filter(hasSolution),
  map(findOverlappingSolutions),
  filter(pipe(length, flippedGt(0))),
  map(solutions => reduce(getLowestCost, solutions[0])(solutions)),
  filter(Boolean),
  map(calculateCost),
  sum,
);
