import {
  always,
  equals,
  ifElse,
  map,
  match,
  max,
  pipe,
  product,
  reduce,
  split,
  sum,
} from 'rambda';

const colors = ['red', 'green', 'blue'];

const parseCubes = (cubes: string) => {
  const [count, color] = cubes.split(' ');

  /* prettier-ignore */
  return map(
    ifElse(
      equals(color),
      always(Number(count)),
      always(0),
    ),
  )(colors);
};
const cubesRegex = /\d+\s[a-z]+/gi;
const parseGame = pipe(match(cubesRegex), map(parseCubes));

const getMaxima = reduce(
  (maxSoFar, current: number[]) => [
    max(maxSoFar[0], current[0]),
    max(maxSoFar[1], current[1]),
    max(maxSoFar[2], current[2]),
  ],
  [0, 0, 0],
);
const calculateProductOfMaxima = pipe(getMaxima, product);

export default pipe(
  split('\n'),
  map(parseGame),
  map(calculateProductOfMaxima),
  sum,
);
