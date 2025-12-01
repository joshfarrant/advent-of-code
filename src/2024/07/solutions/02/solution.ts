const add = (a: number, b: number) => a + b;
const multiply = (a: number, b: number) => a * b;
const concat = (a: number, b: number) => Number(`${a}${b}`);

const operators = [add, multiply, concat];

const evaluateExpression = (values: number[], target: number): boolean => {
  const [a, b, ...rest] = values;

  if (values.length === 1) {
    return a === target;
  }

  if (a > target) {
    return false;
  }

  for (const operator of operators) {
    const nextValues = [operator(a, b), ...rest];

    if (evaluateExpression(nextValues, target)) {
      return true;
    }
  }

  return false;
};

export default (input: string): number => {
  return input
    .split('\n')
    .map<number>(line => {
      const [targetString, valuesString] = line.split(': ');
      const target = Number(targetString);
      const values = valuesString.split(' ').map(Number);

      return evaluateExpression(values, target) ? target : 0;
    })
    .reduce(add, 0);
};
