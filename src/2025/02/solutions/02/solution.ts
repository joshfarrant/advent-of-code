const parseInput = (str: string) =>
  str.split(',').map(x => x.split('-')) as [string, string][];

let regexMap = new Map<number, RegExp>();

const isRepeatedString = (str: string, size: number) => {
  let regex = regexMap.get(size);
  if (!regex) {
    regex = new RegExp('.{1,' + size + '}', 'g');
    regexMap.set(size, regex);
  }

  const chunks = str.match(regex) as string[];
  return chunks.every(x => x === chunks[0]);
};

const isInvalidId = (id: string) => {
  for (let factor = 1; factor <= id.length / 2; factor++) {
    if (id.length % factor === 0 && isRepeatedString(id, factor)) return true;
  }
};

const sumInvalidIds = (start: string, end: string) => {
  let total = 0;

  let id = Number(start);
  while (id <= Number(end)) {
    if (isInvalidId(String(id))) {
      total += id;
    }
    id++;
  }

  return total;
};

export default (input: string) =>
  parseInput(input).reduce((sum, range) => sum + sumInvalidIds(...range), 0);
