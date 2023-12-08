import fs from 'node:fs/promises';
import path from 'node:path';

const readFile = (filePath: string): Promise<string> => {
  const fullPath = path.resolve(import.meta.dir, filePath);
  return Bun.file(fullPath).text();
};

const indexData: { day: number; title: string; file: string }[] = [];

const directories = await fs.readdir('./src/days');

const exportDir = './export';

await fs.rm(exportDir, { recursive: true, force: true });
await fs.mkdir(exportDir);

const now = Date.now();

await Promise.all(
  directories.map(async directory => {
    const puzzleNumber = Number(directory);
    let meta;
    try {
      meta = await import(`./days/${directory}/meta.json`);
    } catch (error) {
      return null;
    }

    indexData.push({
      day: puzzleNumber,
      title: meta.title,
      file: `${puzzleNumber}.json`,
    });

    const [description, notes, input, part1Solution, part2Solution] =
      await Promise.all([
        readFile(`./days/${directory}/description.md`),
        readFile(`./days/${directory}/notes.md`),
        readFile(`./days/${directory}/input.txt`),
        readFile(`./days/${directory}/solutions/01/solution.ts`),
        readFile(`./days/${directory}/solutions/02/solution.ts`),
      ]);

    const data = {
      meta: {
        createdAt: now,
      },
      puzzle: {
        day: puzzleNumber,
        title: meta.title,
        description,
        input,
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
