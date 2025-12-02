import { describe, expect, test } from 'bun:test';
import { readFile } from '@/utils';

import part1Solution from './solutions/01/solution';
import part2Solution from './solutions/02/solution';

const actualInput = await readFile(await import.meta.resolve('./input.txt'));
const exampleInput = await readFile(
  await import.meta.resolve('./example-input-01.txt'),
);

describe('day 02', () => {
  describe('part 01', () => {
    describe.each([['solution', part1Solution]])('%s', (_, solution) => {
      test('example input', () => {
        expect(solution(exampleInput)).toBe(1227775554);
      });

      test('real input', () => {
        expect(solution(actualInput)).toBe(12850231731);
      });
    });
  });

  describe('part 02', () => {
    describe.each([['solution', part2Solution]])('%s', (_, solution) => {
      test('example input', () => {
        expect(solution(exampleInput)).toBe(4174379265);
      });

      test('real input', () => {
        expect(solution(actualInput)).toBe(24774350322);
      });
    });
  });
});
