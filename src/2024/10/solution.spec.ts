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
        expect(solution(exampleInput)).toBe(36);
      });

      test('example input 2', () => {
        expect(solution(exampleInput2)).toBe(2);
      });

      test('real input', () => {
        expect(solution(actualInput)).toBe(566);
      });
    });
  });

  describe('part 02', () => {
    describe.each([['solution', part2Solution]])('%s', (_, solution) => {
      test('example input', () => {
        expect(solution(exampleInput)).toBe(81);
      });

      test('real input', () => {
        expect(solution(actualInput)).toBe(1324);
      });
    });
  });
});
