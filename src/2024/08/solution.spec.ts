import { describe, expect, test } from 'bun:test';
import { readFile } from '@/utils';

import part1Solution from './solutions/01/solution';
import part2Solution from './solutions/02/solution';

const actualInput = await readFile(import.meta.resolve('./input.txt'));
const exampleInput = await readFile(
  import.meta.resolve('./example-input-01.txt'),
);
const exampleInput2 = await readFile(
  import.meta.resolve('./example-input-02.txt'),
);

const exampleInput3 = await readFile(
  import.meta.resolve('./example-input-03.txt'),
);

describe('day 01', () => {
  describe('part 01', () => {
    describe.each([['solution', part1Solution]])('%s', (_, solution) => {
      test('example input', () => {
        expect(solution(exampleInput)).toBe(14);
      });

      test('example input 2', () => {
        expect(solution(exampleInput2)).toBe(4);
      });

      test('real input', () => {
        expect(solution(actualInput)).toBe(381);
      });
    });
  });

  describe('part 02', () => {
    describe.each([['solution', part2Solution]])('%s', (_, solution) => {
      test('example input', () => {
        expect(solution(exampleInput)).toBe(34);
      });

      test('example input 3', () => {
        expect(solution(exampleInput3)).toBe(9);
      });

      test('real input', () => {
        expect(solution(actualInput)).toBe(1184);
      });
    });
  });
});
