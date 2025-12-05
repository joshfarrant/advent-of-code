type Range = [number, number];

export default (input: string): number => {
  const lists = input.split('\n\n').map(x => x.split('\n'));

  const freshRanges = lists[0]
    .map(range => range.split('-').map(Number))
    .sort((a, b) => a[0] - b[0]) as Range[];

  const combinedRanges: Range[] = [];

  for (const range of freshRanges) {
    if (combinedRanges.length === 0) {
      combinedRanges.push(range);
      continue;
    }

    const prevCombinedRange = combinedRanges.at(-1)!;

    const startIsInRange = range[0] <= prevCombinedRange[1];
    if (startIsInRange) {
      const endIsInRange = range[1] <= prevCombinedRange[1];
      if (endIsInRange) continue;
      prevCombinedRange[1] = range[1];
    } else {
      combinedRanges.push(range);
    }
  }

  return combinedRanges.reduce(
    (total, range) => total + (range[1] - range[0]) + 1,
    0,
  );
};
