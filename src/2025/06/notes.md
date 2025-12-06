Part one here was pretty straightforward, but part two took some thinking.

I went through a few different approaches — changing my approach significantly when I spotted that numbers can be left or right aligned — before realising that I could just process all lines together from right-to-left, then top to bottom for each column. When we get to an operator we the know we've processed all the numbers in that block and we can then perform the calculation and add the result to the total.

I'm a bit ill as I do this and my solution nearly reflected that as I came quite close to using an `eval`, but in the end clearer heads prevailed and I'm quite happy with my operator object and `reduce` combo.
