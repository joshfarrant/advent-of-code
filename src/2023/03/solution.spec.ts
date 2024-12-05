import { describe, expect, test } from 'bun:test';
import { readFile } from '@/utils';

import part1FirstSolution from './solutions/01/solution';
import part2FirstSolution from './solutions/02/solution';

const actualInput = await readFile(import.meta.resolve('./input.txt'));
const exampleInput = await readFile(import.meta.resolve('./example-input.txt'));

describe('day 03', () => {
  describe('part 01', () => {
    test('example input', () => {
      expect(part1FirstSolution(exampleInput)).toBe(4361);
    });

    test('real input', () => {
      expect(part1FirstSolution(actualInput)).toBe(551094);
    });
  });

  describe('part 02', () => {
    test('example input', () => {
      expect(part2FirstSolution(exampleInput)).toBe(467835);
    });

    test('real input', () => {
      expect(part2FirstSolution(actualInput)).toBe(80179647);
    });
  });
});
