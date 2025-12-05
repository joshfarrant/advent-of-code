type Range = [number, number];

const isFresh =
  (ranges: Range[]) =>
  (id: number): boolean =>
    ranges.some(([rangeFrom, rangeTo]) => id >= rangeFrom && id <= rangeTo);

export default (input: string): number => {
  const lists = input.split('\n\n').map(x => x.split('\n'));

  const freshRanges = lists[0].map(range =>
    range.split('-').map(Number),
  ) as Range[];
  const availableIds = lists[1].map(Number);

  const isFreshRange = isFresh(freshRanges);

  return availableIds.filter(isFreshRange).length;
};
