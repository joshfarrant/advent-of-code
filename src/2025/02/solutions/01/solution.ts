const parseInput = (str: string) =>
  str.split(',').map(x => x.split('-')) as [string, string][];

const splitInHalf = (str: string) => {
  const mid = str.length / 2;
  return [str.slice(0, mid), str.slice(mid)];
};

const isInvalidId = (id: string) => {
  if (id.length % 2 !== 0) return false;
  const [first, second] = splitInHalf(id);
  return first === second;
};

const sumInvalidIds = (start: string, end: string) => {
  let total = 0;

  for (let id = Number(start); id <= Number(end); id++) {
    if (isInvalidId(String(id))) total += id;
  }

  return total;
};

export default (input: string): number => {
  const ranges = parseInput(input);

  return ranges.reduce((sum, range) => sum + sumInvalidIds(...range), 0);
};
