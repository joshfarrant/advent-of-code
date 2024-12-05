import fs from 'node:fs/promises';
import path from 'node:path';

// Get year from CLI arguments, default to current year
const year = process.argv[2] || new Date().getFullYear().toString();

const readFile = (filePath: string): Promise<string> => {
  const fullPath = path.resolve(import.meta.dir, filePath);
  return Bun.file(fullPath).text();
};

const indexData: { day: number; title: string; file: string }[] = [];

const directories = await fs.readdir(`./src/${year}`);

const exportDir = './export';

await fs.rm(exportDir, { recursive: true, force: true });
await fs.mkdir(exportDir);

const now = Date.now();

await Promise.all(
  directories.map(async directory => {
    const puzzleNumber = Number(directory);
    let meta;
    try {
      meta = await import(`./${year}/${directory}/meta.json`);
    } catch (error) {
      return null;
    }

    indexData.push({
      day: puzzleNumber,
      title: meta.title,
      file: `${puzzleNumber}.json`,
    });

    const [notes, part1Solution, part2Solution] = await Promise.all([
      readFile(`./${year}/${directory}/notes.md`),
      readFile(`./${year}/${directory}/solutions/01/solution.ts`),
      readFile(`./${year}/${directory}/solutions/02/solution.ts`),
    ]);

    const data = {
      meta: {
        createdAt: now,
      },
      puzzle: {
        day: puzzleNumber,
        title: meta.title,
      },
      notes,
      solutions: {
        part1: part1Solution,
        part2: part2Solution,
      },
    };

    const json = JSON.stringify(data, null, 2);

    await Bun.write(path.resolve(exportDir, `${puzzleNumber}.json`), json);
  }),
);

const sortedIndexData = indexData.toSorted((a, b) => {
  const aDay = a.day;
  const bDay = b.day;
  if (aDay < bDay) return -1;
  if (aDay > bDay) return 1;
  return 0;
});

const indexJson = JSON.stringify(
  {
    meta: {
      createdAt: now,
    },
    data: sortedIndexData,
  },
  null,
  2,
);
await Bun.write(path.resolve(exportDir, `index.json`), indexJson);
