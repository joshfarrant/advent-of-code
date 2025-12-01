const add = (a: number, b: number) => a + b;
const multiply = (a: number, b: number) => a * b;

const operators = [add, multiply];

const evaluateExpression = (values: number[], target: number): boolean => {
  if (values.length === 1) {
    return values[0] === target;
  }

  const [a, b, ...rest] = values;

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
