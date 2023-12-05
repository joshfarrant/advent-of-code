export default (input: string): number =>
  input
    .replace(/[a-z]/gi, '')
    .split('\n')
    .reduce((acc, curr) => {
      const first = curr.at(0);
      const last = curr.at(-1);

      return acc + Number(`${first}${last}`);
    }, 0);
