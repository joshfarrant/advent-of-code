export default (input: string): number => {
  const lines = input.split('\n');
  const { x, y } = lines.reduce(
    (acc, line) => {
      const [a, b] = line.split('   ');

      acc.x.push(Number(a));
      acc.y.push(Number(b));

      return acc;
    },
    { x: [], y: [] } as { x: number[]; y: number[] },
  );

  const sortedX = x.sort((a, b) => a - b);

  const yFrequency = y.reduce(
    (acc, y) => {
      acc[y] = (acc[y] || 0) + 1;

      return acc;
    },
    {} as Record<number, number>,
  );

  return sortedX.reduce((acc, x) => acc + x * (yFrequency[x] ?? 0), 0);
};
