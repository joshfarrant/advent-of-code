import {
  addIndex,
  curry,
  filter,
  map,
  pipe,
  sort,
  split,
  sum,
  tap,
} from 'rambda';

const splitEach = (separator: string) => map(split(separator));

type Page = number;
type Pages = Page[];
type Rule = [Page, Page];

const processRules = map<string, Rule>(
  pipe(split('|'), ([a, b]) => [Number(a), Number(b)] as Rule),
);
const processPages = map<string, Pages>(pipe(split(','), map(Number)));

const filterWithIndex = addIndex(filter);

const getMiddleItem = (arr: number[]): number =>
  arr[Math.floor(arr.length / 2)];

const equalWhenStringified = (a: unknown, b: unknown): boolean =>
  JSON.stringify(a) === JSON.stringify(b);

const sortPagesWithRules = (rules: Rule[]) =>
  sort<number>((pageA, pageB) => {
    for (const [ruleA, ruleB] of rules) {
      if (pageA === ruleA && pageB === ruleB) {
        return -1;
      }
      if (pageA === ruleB && pageB === ruleA) {
        return 1;
      }
    }
    return 0;
  });

export default (input: string) => {
  const [rules, pagesArr] = pipe(
    split('\n\n'),
    splitEach('\n'),
    ([rules, pages]): [Rule[], Pages[]] => [
      processRules(rules),
      processPages(pages),
    ],
  )(input);

  return pipe(
    map(sortPagesWithRules(rules)),
    filterWithIndex((pages: Pages[], i: number) =>
      equalWhenStringified(pages, pagesArr[i]),
    ),
    map(getMiddleItem),
    sum,
  )(pagesArr);
};
