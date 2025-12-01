export default (input: string, blinks: number): number => {
  let numbers = input.split(' ').map(Number);

  for (let n = 1; n <= blinks; n++) {
    let nextNumbers: number[] = [];

    for (let i = 0; i < numbers.length; i++) {
      const number = numbers[i];

      // Case 1
      if (number === 0) {
        nextNumbers.push(1);
        continue;
      }

      // Case 2
      const numberStr = number.toString();
      const numberLength = numberStr.length;

      if (numberLength % 2 === 0) {
        const left = Number(numberStr.slice(0, numberLength / 2));
        const right = Number(numberStr.slice(numberLength / 2));

        nextNumbers.push(left, right);
        continue;
      }

      // Default case
      nextNumbers.push(number * 2024);
    }

    numbers = nextNumbers;
  }

  return numbers.length;
};
