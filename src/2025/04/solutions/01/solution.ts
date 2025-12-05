type Grid = string[][];

const RADIUS = 1;
const ROLL = '@';

const createGridChecker =
  (grid: Grid) =>
  (centerY: number, centerX: number): boolean => {
    const maxX = grid[0].length - 1;
    const maxY = grid.length - 1;

    let adjacentRolls = 0;

    for (let dy = -1 * RADIUS; dy <= RADIUS; dy++) {
      for (let dx = -1 * RADIUS; dx <= RADIUS; dx++) {
        // We don't care about the center cell
        if (dx === 0 && dy === 0) continue;

        const x = centerX + dx;
        const y = centerY + dy;

        if (x < 0 || x > maxX || y < 0 || y > maxY) continue;

        if (grid[y][x] === ROLL) {
          adjacentRolls += 1;
        }

        if (adjacentRolls >= 4) {
          return false;
        }
      }
    }

    return true;
  };

export default (input: string): number => {
  const grid = input.split('\n').map(line => line.split('')) as Grid;

  const rollIsAccessible = createGridChecker(grid);

  let accessibleRolls = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === ROLL && rollIsAccessible(y, x)) {
        accessibleRolls += 1;
      }
    }
  }

  return accessibleRolls;
};
