Part 1 of this was relatively straight-forward, however part 2 added some complications.

My first solution to part 2 would replace all occurences of spelled out numbers (one, two, three, etc) with the numeric version using something like this.

```ts
str.replace(/(one|two|three|etc)/g, getDigit);
```

However this caused issues in cases where the string ended with a pair of spelled out numbers which shared a end/start character, for example _twone_, _oneight_. In these cases, the string would be read left-to-right, so the first number would be replaced, thus breaking the second number. So _twone_ would become _2ne_ and _oneight_ would become _1ight_, which would result in an incorrect total.

I considered an approach where I would read the string backwards and replace occurences of reversed spelled out numbers, eg _eno_, _owt_, etc, however this felt messy and I was sure there was a better way. It turns out there's not really a nice way of doing it, and in the end I had to seek out a hint from the subreddit.
