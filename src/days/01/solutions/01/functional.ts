import { map, pipe, replace, split, sum } from 'rambda';

const getFirstAndLastChar = (x: string): string => `${x.at(0)}${x.at(-1)}`;
const removeLetters = replace(/[a-z]/gi, '');
const splitLines = split('\n');

export default pipe(
  removeLetters,
  splitLines,
  map(getFirstAndLastChar),
  map(Number),
  sum,
);
