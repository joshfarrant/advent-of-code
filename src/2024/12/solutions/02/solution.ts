type Coordinate = [number, number];
type Grid = string[][];

const getNeighbours = (grid: Grid, [x, y]: Coordinate): Coordinate[] => {
  const neighbours: Coordinate[] = [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ];

  return neighbours.filter(
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

    const newNeighbours = getNeighbours(grid, current).filter(n => {
      const [nx, ny] = n;
      return grid[ny][nx] === targetChar && !visited.has(pointToString(n));
    });

    queue.push(...newNeighbours);
  }

  return region;
};

const countSides = (grid: Grid, region: Set<string>): number => {
  const regionPoints = Array.from(region).map(pointStr =>
    pointStr.split(',').map(Number),
  ) as Coordinate[];

  const getNeighbours = ([x, y]: Coordinate): Coordinate[] => {
    return [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];
  };

  const isInRegion = (point: Coordinate): boolean => {
    return region.has(point.join(','));
  };

  let neighboursSet = new Set<Coordinate>();

  for (const point of regionPoints) {
    getNeighbours(point)
      .filter(n => !isInRegion(n))
      .forEach(point => neighboursSet.add(point));
  }

  const sides = Array.from(neighboursSet).reduce((sides, point) => {
    const adjacentSides = sides.filter((pointsOnSide, i) => {
      const isAdjacent = pointsOnSide.some(p => {
        const [px, py] = p;
        const [x, y] = point;
        const dx = Math.abs(px - x);
        const dy = Math.abs(py - y);
        return dx + dy === 1;
      });

      return isAdjacent;
    });

    if (adjacentSides.length === 0) {
      sides.push([point]);
      return sides;
    }

    adjacentSides.forEach(side => {
      side.push(point);
    });

    return sides;
  }, [] as Coordinate[][]);

  (() => {
    const neighbours = Array.from(neighboursSet);
    const minX = Math.min(...neighbours.map(p => p[0]));
    const maxX = Math.max(...neighbours.map(p => p[0]));
    const minY = Math.min(...neighbours.map(p => p[1]));
    const maxY = Math.max(...neighbours.map(p => p[1]));

    const debugGrid = Array.from({ length: maxY - minY + 1 }, () =>
      Array.from({ length: maxX - minX + 1 }, () => []),
    );

    let chars = 'abcdefghijklmnopqrstuvwxyz';
    for (const side of sides) {
      for (const point of side) {
        const [x, y] = point;
        const id = chars[sides.indexOf(side)];
        debugGrid[y - minY][x - minX].push(id);
      }
    }

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        if (isInRegion([x, y])) {
          debugGrid[y - minY][x - minX].push('◙');
        }
      }
    }

    console.table(
      debugGrid.map(row =>
        row
          .map((charArr): string => {
            const char = charArr.join('');
            return char.padEnd(4, ' ');
          })
          .join(' '),
      ),
    );
  })();

  return sides.length;
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

    const sides = countSides(grid, region);
    const char = grid[point[1]][point[0]];
    console.table({ char, sides });

    return totalPrice + area * sides;
  }, 0);
};
