import { describe, expect, test } from 'bun:test';
import { readFile } from '@/utils';

import part1FirstSolution from './solutions/01/first';
import part1FunctionalSolution from './solutions/01/solution';
import part2FirstSolution from './solutions/02/solution';

const actualInput = await readFile(import.meta.resolve('./input.txt'));
const exampleInput1 = await readFile(
  import.meta.resolve('./example-input-01.txt'),
);
const exampleInput2 = await readFile(
  import.meta.resolve('./example-input-02.txt'),
);

describe('day 01', () => {
  describe('part 01', () => {
    describe.each([
      ['firstSolution', part1FirstSolution],
      ['functionalSolution', part1FunctionalSolution],
    ])('%s', (_, solution) => {
      test('example input', () => {
        expect(solution(exampleInput1)).toBe(142);
      });

      test('real input', () => {
        expect(solution(actualInput)).toBe(54601);
      });
    });
  });

  describe('part 02', () => {
    describe.each([['firstSolution', part2FirstSolution]])(
      '%s',
      (_, solution) => {
        test('example input', () => {
          expect(solution(exampleInput2)).toBe(281);
        });

        test('real input', () => {
          expect(solution(actualInput)).toBe(54078);
        });
      },
    );
  });
});
