import { sum } from 'rambda';

const mapInsertOrIncrement =
  (map: Map<number, number>) =>
  (key: number, value: number = 1) => {
    const count = map.get(key) || 0;
    map.set(key, count + value);
    return map;
  };

export default (input: string, blinks: number): number => {
  let numberMap = input.split(' ').reduce((map, number) => {
    map.set(Number(number), 1);
    return map;
  }, new Map<number, number>());

  for (let n = 1; n <= blinks; n++) {
    let newNumberMap = new Map<number, number>();
    const insertOrIncrement = mapInsertOrIncrement(newNumberMap);

    numberMap.forEach((count, number) => {
      // Case 1
      if (number === 0) {
        insertOrIncrement(1, count);
        return;
      }

      // Case 2
      const numberStr = number.toString();
      const numberLength = numberStr.length;

      if (numberLength % 2 === 0) {
        const left = Number(numberStr.slice(0, numberLength / 2));
        const right = Number(numberStr.slice(numberLength / 2));

        insertOrIncrement(left, count);
        insertOrIncrement(right, count);
        return;
      }

      insertOrIncrement(number * 2024, count);
    });

    numberMap = newNumberMap;
  }

  return sum(Array.from(numberMap.values()));
};
