type Coordinate = [number, number];
type Grid = string[][];

const getNeighbors = (grid: Grid, [x, y]: Coordinate): Coordinate[] => {
  const neighbors: Coordinate[] = [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ];

  return neighbors.filter(
    ([nx, ny]) => nx >= 0 && nx < grid[0].length && ny >= 0 && ny < grid.length,
  );
};

const pointToString = ([x, y]: Coordinate): string => `${x},${y}`;

const findRegion = (
  grid: Grid,
  start: Coordinate,
  visited: Set<string>,
): Set<string> => {
  const region = new Set<string>();
  const queue: Coordinate[] = [start];
  const targetChar = grid[start[1]][start[0]];

  while (queue.length > 0) {
    const current = queue.shift()!;
    const currentStr = pointToString(current);

    if (visited.has(currentStr)) continue;

    visited.add(currentStr);
    region.add(currentStr);

    const newNeighbors = getNeighbors(grid, current).filter(n => {
      const [nx, ny] = n;
      return grid[ny][nx] === targetChar && !visited.has(pointToString(n));
    });

    queue.push(...newNeighbors);
  }

  return region;
};

const calculatePerimeter = (grid: Grid, region: Set<string>): number => {
  let perimeter = 0;

  for (const pointStr of region) {
    const [x, y] = pointStr.split(',').map(Number);
    const char = grid[y][x];

    const sides: Coordinate[] = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];

    sides.forEach(([nx, ny]) => {
      if (
        nx < 0 ||
        nx >= grid[0].length ||
        ny < 0 ||
        ny >= grid.length ||
        grid[ny][nx] !== char
      ) {
        perimeter++;
      }
    });
  }

  return perimeter;
};

export default (input: string): number => {
  const grid = input.split('\n').map(line => line.split(''));

  const allPoints: Coordinate[] = grid.flatMap((row, y) =>
    row.map((_, x) => [x, y] as Coordinate),
  );

  const visited = new Set<string>();

  return allPoints.reduce((totalPrice, point) => {
    const pointStr = pointToString(point);

    if (visited.has(pointStr)) return totalPrice;

    const region = findRegion(grid, point, visited);

    const area = region.size;

    const perimeter = calculatePerimeter(grid, region);

    return totalPrice + area * perimeter;
  }, 0);
};
