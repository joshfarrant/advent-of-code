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

const getInvalidIds = (start: string, end: string) => {
  const invalidIds: number[] = [];

  const startNum = Number(start);
  const endNum = Number(end);

  for (let id = startNum; id <= endNum; id++) {
    if (isInvalidId(String(id))) invalidIds.push(id);
  }

  return invalidIds;
};

const sum = (a: number, b: number) => a + b;

export default (input: string): number => {
  const ranges = parseInput(input);

  return ranges.flatMap(range => getInvalidIds(...range)).reduce(sum);
};
