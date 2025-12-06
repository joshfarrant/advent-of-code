const add = (a: number, b: number) => a + b;
const multiply = (a: number, b: number) => a * b;

const operationsMap = new Map([
  ['+', add],
  ['*', multiply],
]);

export default (input: string): number => {
  const arr2d = input.split('\n').map(line => line.trim().split(/\s+/));

  let total = 0;

  for (let x = 0; x < arr2d[0].length; x++) {
    const operationSymbol = arr2d.at(-1)![x];
    const operation = operationsMap.get(operationSymbol)!;

    let runningTotal = 0;

    for (let y = 0; y < arr2d.length - 1; y++) {
      const value = Number(arr2d[y][x]);

      if (runningTotal === 0 && operation === multiply) {
        runningTotal = operation(1, value);
      } else {
        runningTotal = operation(runningTotal, value);
      }
    }

    total += runningTotal;
  }

  return total;
};
