This one took a fair bit of thinking, but in the end I settled on what seemed like the most obvious (naive?) solutions.

The solutions to both part are written in a very imperative style. Usually, I tend to write — or at least think — in an imperative style initially, then I go back and refactor to a more functional style once I've got a working solution and a passing test suite to work against. I didn't do that here as I'm not sure of the best way to elegantly refactor these loops — especially the while loops — into a more declarative style. At a high level the code could still be considered functional as all of the functions are pure, but the loops are a bit of a mess and miss out on that declarative magic functional programming is known for.

One thing to note is that I had an off-by-one error in part 2 which I still don't particularly understand. The below line needed tweaking to get the correct answer:

```ts
// Part 1
const endColumn = clampColumn(column + numberLength + 1);

// Part 2
const endColumn = clampColumn(column + numberLength);
```

I'd have expected the `+ 1` to be required in both cases as the `endColumn` variable is only used to define the search area for the special character. The way I use the variable is different between parts (a slice vs a for loop), but I still don't fully understand why the change was needed. I'll have to revisit this at some point as, at time of writing, I don't have any more time to spend on it.
