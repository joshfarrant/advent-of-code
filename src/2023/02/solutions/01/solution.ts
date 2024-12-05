import {
  indexOf,
  last,
  map,
  match,
  pipe,
  reduce,
  replace,
  split,
  update,
} from 'rambda';

const splitLines = split('\n');

// [R, G, B]
const criteria = [12, 13, 14];
const colors = ['red', 'green', 'blue'];

const gameMetaRegex = /^game\s(\d+):\s/i;
const parseGameId = pipe(match(gameMetaRegex), last, Number);
const parseRound = pipe(
  split(', '),
  reduce(
    (acc, group: string) => {
      const [count, color] = group.split(' ');
      const index = indexOf(color, colors);

      return update(index, Number(count), acc);
    },
    [0, 0, 0],
  ),
);

const parseRounds = pipe(
  replace(gameMetaRegex, ''),
  split('; '),
  map(parseRound),
);

const parseGame = (game: string) => ({
  id: parseGameId(game),
  rounds: parseRounds(game),
});

const isValidRound = (round: number[]): boolean =>
  criteria.every((criterion, i) => criterion >= round[i]);

export default pipe(
  splitLines,
  map(parseGame),
  reduce((acc, { id, rounds }) => {
    const isValidGame = rounds.every(isValidRound);

    return isValidGame ? acc + id : acc;
  }, 0),
);
