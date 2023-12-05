import { map, pipe, replace, split, sum, tap } from 'rambda';

const firstAndLastChar = (x: string): string => `${x.at(0)}${x.at(-1)}`;
const removeLetters = replace(/[a-z]/gi, '');
const splitLines = split('\n');

/**
 * Used for handling cases where multiple spelled out numbers share a start/end
 * character. For example: oneight, twone, sevenineight.
 */
const replaceNumberWords = pipe(
  replace(/(one)/gi, 'o1e'),
  replace(/(two)/gi, 't2o'),
  replace(/(three)/gi, 't3e'),
  replace(/(four)/gi, 'f4r'),
  replace(/(five)/gi, 'f5e'),
  replace(/(six)/gi, 's6x'),
  replace(/(seven)/gi, 's7n'),
  replace(/(eight)/gi, 'e8t'),
  replace(/(nine)/gi, 'n9e'),
);

export default pipe(
  replaceNumberWords,
  removeLetters,
  splitLines,
  map(firstAndLastChar),
  map(Number),
  sum,
);
