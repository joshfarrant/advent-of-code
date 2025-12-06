import { describe, expect, test } from 'bun:test';
import { readFile } from '@/utils';

import part1Solution from './solutions/01/solution';
import part2Solution from './solutions/02/solution';

const actualInput = await readFile(await import.meta.resolve('./input.txt'));
const exampleInput = await readFile(
  await import.meta.resolve('./example-input-01.txt'),
);

describe('day 01', () => {
  describe('part 01', () => {
    describe.each([['solution', part1Solution]])('%s', (_, solution) => {
      test('example input', () => {
        expect(solution(exampleInput)).toBe(4277556);
      });

      test('real input', () => {
        expect(solution(actualInput)).toBe(4309240495780);
      });
    });
  });

  describe('part 02', () => {
    describe.each([['solution', part2Solution]])('%s', (_, solution) => {
      test('example input', () => {
        expect(solution(exampleInput)).toBe(3263827);
      });

      test('real input', () => {
        expect(solution(actualInput)).toBe(9170286552289);
      });
    });
  });
});
