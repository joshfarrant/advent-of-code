type Coordinate = [y: number, x: number];
const getCoordinate =
  (width: number) =>
  (index: number): Coordinate => [Math.floor(index / width), index % width];

const buildNodeMap = (input: string, width: number) => {
  const map = new Map<string, Coordinate[]>();
  const getCoordinateOnGrid = getCoordinate(width);

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === '.') continue;

    const coordinates = map.get(char) || [];

    const coordinate = getCoordinateOnGrid(i);
    coordinates.push(coordinate);
    map.set(char, coordinates);
  }

  return map;
};

const isInBounds =
  (width: number, height: number) => (coordinate: Coordinate) => {
    const [y, x] = coordinate;
    return y >= 0 && y < height && x >= 0 && x < width;
  };

export default (input: string): number => {
  const width = input.indexOf('\n');
  const inputString = input.replaceAll('\n', '');
  const height = inputString.length / width;

  const nodeMap = buildNodeMap(inputString, width);

  const antinodes = new Set<string>();

  const isInInputBounds = isInBounds(width, height);

  nodeMap.forEach(nodes => {
    for (let i = 0; i < nodes.length - 1; i++) {
      const node = nodes[i];

      antinodes.add(node.join(','));

      for (let j = i + 1; j < nodes.length; j++) {
        const otherNode = nodes[j];

        antinodes.add(otherNode.join(','));

        const [dy, dx] = [otherNode[0] - node[0], otherNode[1] - node[1]];

        let antinode: Coordinate = [otherNode[0] + dy, otherNode[1] + dx];

        while (isInInputBounds(antinode)) {
          antinodes.add(antinode.join(','));
          antinode = [antinode[0] + dy, antinode[1] + dx];
        }

        antinode = [node[0] - dy, node[1] - dx];

        while (isInInputBounds(antinode)) {
          antinodes.add(antinode.join(','));
          antinode = [antinode[0] - dy, antinode[1] - dx];
        }
      }
    }
  });

  return antinodes.size;
};
