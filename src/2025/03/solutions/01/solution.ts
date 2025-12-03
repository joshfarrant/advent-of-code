export default (input: string): number => {
  const lines = input.split('\n');
  let total = 0;

  for (const line of lines) {
    let highestValue = 0;

    for (let i = 0; i < line.length - 1; i++) {
      const startChar = line[i];

      for (let j = i + 1; j < line.length; j++) {
        const endChar = line[j];
        const value = Number(`${startChar}${endChar}`);

        if (value > highestValue) {
          highestValue = value;
        }
      }
    }

    total += highestValue;
  }

  return total;
};
