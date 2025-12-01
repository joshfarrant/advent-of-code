const mod = (number: number, max: number): number =>
  ((number % max) + max) % max;

export default (input: string): number => {
  const lines = input.split('\n');
  let currentValue = 50;
  let zeroesCount = 0;

  for (const line of lines) {
    const direction = line.substring(0, 1);
    const number = parseInt(line.substring(1));

    if (direction === 'R') {
      currentValue += number;
      zeroesCount += Math.floor(currentValue / 100);
      currentValue %= 100;
    } else {
      zeroesCount += Math.floor(number / 100);
      if (currentValue !== 0 && number % 100 >= currentValue) {
        zeroesCount += 1;
      }
      currentValue = mod(currentValue - number, 100);
    }
  }

  return zeroesCount;
};
