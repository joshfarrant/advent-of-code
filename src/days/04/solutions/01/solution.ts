import {
  filter,
  intersection,
  map,
  match,
  nth,
  pipe,
  split,
  sum,
  trim,
} from 'rambda';

const getFirstMatch = (regex: RegExp) =>
  pipe<[string], string[], string>(match(regex), nth(1));

const oneOrMoreSpacesRegex = /\s+/g;
const parseNumbersFromString = pipe(
  split(oneOrMoreSpacesRegex),
  map(pipe(trim, Number)),
);

const winningNumbersRegex = /:\s*(.*?)\s*\|/;
const parseWinningNumbers = pipe(
  getFirstMatch(winningNumbersRegex),
  parseNumbersFromString,
);

const myNumbersRegex = /\|\s*(.*?)\s*$/;
const parseMyNumbers = pipe(
  getFirstMatch(myNumbersRegex),
  parseNumbersFromString,
);

const calculateScore = (x: number) => Math.pow(2, x - 1);

export default pipe(
  split('\n'),
  map(line => {
    const myNumbers = parseMyNumbers(line);
    const winningNumbers = parseWinningNumbers(line);

    return intersection(myNumbers, winningNumbers).length;
  }),
  filter(x => x > 0),
  map(calculateScore),
  sum,
);
