import {
  always,
  intersection,
  map,
  match,
  nth,
  pipe,
  reduce,
  split,
  sum,
  times,
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

const incrementSubsequentCards = (
  cards: number[],
  score: number,
  i: number,
) => {
  const numberOfCards = cards[i];

  for (let j = 0; j < score; j++) {
    cards[i + j + 1] += numberOfCards;
  }

  return cards;
};

const processScores = (scores: number[]): number[] => {
  const initialCards = times(always(1), scores.length);

  return reduce(incrementSubsequentCards, initialCards)(scores);
};

export default pipe(
  split('\n'),
  map(line => {
    const myNumbers = parseMyNumbers(line);
    const winningNumbers = parseWinningNumbers(line);

    return intersection(myNumbers, winningNumbers).length;
  }),
  processScores,
  sum,
);
