import { all, aperture, pipe, split, map, filter, length } from 'rambda';

const isSafe = (a: number, b: number, direction: number): boolean => {
  const diff = (b - a) * direction;
  return diff >= 1 && diff <= 3;
};

const processLine = (line: number[]): boolean => {
  const direction = Math.sign(line[1] - line[0]);
  return all(
    (pair: [number, number]) => isSafe(pair[0], pair[1], direction),
    aperture(2, line),
  );
};

export default (input: string): number => {
  return pipe(
    split('\n'),
    map(pipe(split(' '), map(Number))),
    filter(processLine),
    length,
  )(input);
};
