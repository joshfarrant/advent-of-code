type File = {
  type: 'file';
  id: number;
  size: number;
};

type Space = {
  type: 'space';
  size: number;
};

type Disk = (File | Space)[];

const debug = (disk: Disk) => {
  console.debug(
    disk.reduce((str, item) => {
      if (item.type === 'file') {
        return str + `${item.id}`.repeat(item.size);
      }

      return str + '.'.repeat(item.size);
    }, ''),
  );
};

export default (input: string): number => {
  let disk: Disk = [];
  const totalFiles = (input.length + 1) / 2;

  for (let i = 0; i < input.length; i += 2) {
    const [fileSize, spaceSize = 0] = input
      .slice(i, i + 2)
      .split('')
      .map(Number);
    const id = i / 2;

    const file: File = { type: 'file', id: id, size: fileSize };

    disk.push(file);

    if (spaceSize > 0) {
      const space: Space = { type: 'space', size: spaceSize };
      disk.push(space);
    }
  }

  for (let i = totalFiles - 1; i >= 0; i--) {
    let fileIdx = disk.findIndex(item => item.type === 'file' && item.id === i);
    const file = disk[fileIdx];

    if (!file || file.type !== 'file') {
      throw new Error('File not found');
    }

    const spaceIdx = disk.findIndex(
      (item, i) =>
        item.type === 'space' && item.size >= file.size && i < fileIdx,
    );

    if (spaceIdx === -1) {
      continue;
    }

    const space = disk[spaceIdx];

    const remainingSpace = space.size - file.size;

    // Replace the file with space
    disk[fileIdx] = { type: 'space', size: file.size };

    if (remainingSpace === 0) {
      disk[spaceIdx] = file;
      continue;
    }

    const newSpace: Space = { type: 'space', size: remainingSpace };

    // Create file and space in place of old space
    disk.splice(spaceIdx, 1, file, newSpace);

    // We've removed one and added two items before the fileIdx, so increment it by 1
    fileIdx += 1;

    // Combine contiguous spaces
    for (let j = 0; j < disk.length - 1; j++) {
      if (disk[j].type === 'space' && disk[j + 1].type === 'space') {
        disk[j].size += disk[j + 1].size;
        disk.splice(j + 1, 1);
        // Check the current index again as it now contains the combined space
        j--;
      }
    }
  }

  const x = disk
    .flatMap(item => {
      const value = item.type === 'file' ? item.id : 0;
      return Array(item.size).fill(value);
    })
    .map((val, i) => val * i)
    .reduce((acc, val) => acc + val, 0);

  return x;
};
