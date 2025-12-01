export default (input: string): number => {
  const lines = input.split('\n');
  let currentValue = 50;
  let zeroesCount = 0;

  for (const line of lines) {
    const direction = line.substring(0, 1) === 'R' ? 1 : -1;
    const number = parseInt(line.substring(1));

    const nextValue = currentValue + direction * number;
    currentValue = ((nextValue % 100) + 100) % 100;

    if (currentValue === 0) {
      zeroesCount += 1;
    }
  }

  return zeroesCount;
};
