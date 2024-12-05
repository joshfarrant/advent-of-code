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
  const sortedY = y.sort((a, b) => a - b);

  return sortedX.reduce(
    (acc, _, i) => acc + Math.abs(sortedX[i] - sortedY[i]),
    0,
  );
};
