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

describe('day 01', () => {
  describe('part 01', () => {
    describe.each([['solution', part1Solution]])('%s', (_, solution) => {
      test('example input', () => {
        expect(solution(exampleInput, 1)).toBe(7);
      });

      test('example input', () => {
        expect(solution(exampleInput2, 6)).toBe(22);
      });

      test('example input', () => {
        expect(solution(exampleInput2, 25)).toBe(55312);
      });

      test('real input', () => {
        expect(solution(actualInput, 25)).toBe(197357);
      });
    });
  });

  describe('part 02', () => {
    describe.each([['solution', part2Solution]])('%s', (_, solution) => {
      test('real input', () => {
        expect(solution(actualInput, 75)).toBe(234568186890978);
      });
    });
  });
});
