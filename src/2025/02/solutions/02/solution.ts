const parseInput = (str: string) =>
  str.split(',').map(x => x.split('-')) as [string, string][];

const chunk = (str: string, size: number) =>
  str.match(new RegExp('.{1,' + size + '}', 'g')) as string[];

const allEqual = (arr: unknown[]) => arr.every(x => x === arr[0]);

const sum = (a: number, b: number) => a + b;

const factorMap = new Map<number, number[]>();
const getFactors = (num: number): number[] => {
  if (factorMap.has(num)) return factorMap.get(num)!;

  const factors = [];

  for (let i = 1; i <= num / 2; i++) {
    if (num % i === 0) {
      factors.push(i);
    }
  }

  factorMap.set(num, factors);

  return factors;
};

const isInvalidId = (id: string) => {
  const factors = getFactors(id.length);

  return factors.some(factor => {
    const chunks = chunk(id, factor);
    return allEqual(chunks);
  });
};

const sumInvalidIds = (start: string, end: string) => {
  let total = 0;

  const startNum = Number(start);
  const endNum = Number(end);

  for (let id = startNum; id <= endNum; id++) {
    if (isInvalidId(String(id))) {
      total += id;
    }
  }

  return total;
};

export default (input: string) =>
  parseInput(input).reduce((sum, range) => sum + sumInvalidIds(...range), 0);
