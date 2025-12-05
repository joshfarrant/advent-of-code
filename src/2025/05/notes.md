Part 2 had me stumped for a little while.

Of course, the first thing I tried with part 2 was to iterate through each of the ranges and push each id into a `Set`. Unsurprisingly, I ran out of memory pretty quickly.

My next solution was pretty close to my final solution and, frustratingly, it passed with the example input but gave me the wrong answer for the actualy input. After some debugging — and the suggestion to amend my example input with `9-21` — I realised that I wasn't handling cases where one range was entirely contained within another range that I'd already processed. Fixing that bug gave me the correct answer.

In the end this one wasn't too bad, but I do wish 9-21 was part of the puzzles example input!
