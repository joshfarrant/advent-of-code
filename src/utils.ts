export const readFile = async (path: string): Promise<string> => {
  const fileContents = await Bun.file(path).text();

  return fileContents.trim();
};

export const getFromMap = <T>(map: Map<string, T>, key: string): T => {
  const value = map.get(key);

  if (!value) {
    throw new Error(`No value found for key: ${key}`);
  }

  return value;
};

export const time =
  <T extends (...args: any[]) => any>(label: string, fn: T) =>
  (...args: Parameters<T>): ReturnType<T> => {
    const start = Bun.nanoseconds();
    const returnValue = fn(...args);
    const end = Bun.nanoseconds();

    const duration = end - start;
    const durationMs = duration / 1_000_000;

    console.log(`${label}: ${durationMs}ms`);

    return returnValue;
  };
