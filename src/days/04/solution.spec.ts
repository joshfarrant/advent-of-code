import { describe, expect, test } from 'bun:test';
import { readFile } from '@/utils';

import part1FirstSolution from './solutions/01/solution';
import part2FirstSolution from './solutions/02/solution';

/* prettier-ignore */
const actualInput = await import.meta
  .resolve('./input.txt')
  .then(readFile);
const exampleInput = await import.meta
  .resolve('./example-input.txt')
  .then(readFile);

describe('day 04', () => {
  describe('part 01', () => {
    test('example input', () => {
      expect(part1FirstSolution(exampleInput)).toBe(13);
    });

    test('real input', () => {
      expect(part1FirstSolution(actualInput)).toBe(21088);
    });
  });

  describe('part 02', () => {
    test('example input', () => {
      expect(part2FirstSolution(exampleInput)).toBe(30);
    });

    test('real input', () => {
      expect(part2FirstSolution(actualInput)).toBe(6874754);
    });
  });
});
