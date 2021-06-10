---
title: Factorial! Race!
description: Finding an upper limit on factorials in JavaScript
date: 2021.06.07
slug: factorial-race
---

For the past while now, I've been tinkering on [a side project](https://www.dicegraph.com/) that builds and graphs arbitrary probability distributions created by dice rolling outcomes. It's extremely niche and dorky, but it's a been a really fun way to explore both product design development and new concepts in math and programming that have otherwise never presented themselves during my career.

This is an article about the second bit.

One of the interesting things that I discovered early on was that when adding the ability to _multiply and reduce_ dice rather than just _multiply or reduce_ dice (ie; roll 1d6, roll the resulting number of dice, on a 4 or higher roll again, sum the total results. Complicated!) the distributions are [not normal](https://en.wikipedia.org/wiki/Normal_distribution), which means in order to actually graph the distribution we need to calculate every possible outcome. Not a big deal, since computers are good at this sort of stuff!

However, I quickly discovered an upper bound: the calculation requires working with [factorials](https://en.wikipedia.org/wiki/Factorial). When the factorials get big, JavaScript gives up and returns `Infinity`. This is because there is [a maximum limit](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) to the size of a double-precision floating-point number that JS uses for the `Number` type. Wow, this got both mathy and programmery really quickly.

This gave us an upper bound of `170!`, since the rest of the distribution calculations don't like it when you pass them `Infinity`.

```js
const factorial = (x) => x > 1 ? x * factorial(x - 1) : 1
factorial(170) // 7.257415615307994e+306
factorial(171) // Infinity
```

Lucky for us, JavaScript has implemented a [Big Integer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) type for integers that are … well … big! I was able to refactor my `factorial` function to use `BigInt`s.

```js
const big_factorial = (x) => x > 1 ? x * big_factorial(x - BigInt(1)) : BigInt(1)
big_factorial(BigInt(171)) // 1241018070217667823424840524103103992616605577501693185388951803611996075221691752992751978120487585576464959501670387052809889858690710767331242032218484364310473577889968548278290754541561964852153468318044293239598173696899657235903947616152278558180061176365108428800000000000000000000000000000000000000000n
```

So what's our new upper bound? We can handle `170!` easily, how high can we go? `1,000!`? `10,000!`?

```js
big_factorial(BigInt(1000)) // 402387260…0n
big_factorial(BigInt(10000)) // RangeError: Maximum call stack size exceeded
```

Turns out `1,000!` is a walk in the park. `10,000!` gets a little more interesting! The error that returns on the function is about [too much recursion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Too_much_recursion). We're calling `big_factorial` _from_ `big_factorial` ten thousand times and the browser thinks this means something is wrong, so it bails out on the process.

So, what if we refactor our recursive `big_factorial` to use a loop?

```js
const big_fast_factorial = (x) => {
  let r = BigInt(1);
  for (let i = BigInt(2); i <= x; i++)
    r = r * i;
  return r;
}
big_fast_factorial(BigInt(10000)) // 284625…0n in about 70ms
```

`10,000!` is fast! We can get reliably get the result of that in less than 100ms. And since our loop will run as long as it needs to, our upper bound should now be based on compute and return time, rather than type errors or browser guardrails. Lets see what we can do now:

```js
big_fast_factorial(BigInt(20000)) // ~300ms
big_fast_factorial(BigInt(30000)) // ~650ms
// …
big_fast_factorial(BigInt(90000)) // ~7238ms
big_fast_factorial(BigInt(100000)) // ~9266ms
```

Things … start to get slow above 30 or 40 thousand factorial. Every additional ten thousand to our initial number adds more and more time to the compute function. Im sure theres some fancy `O(n)` complexity notation to express this, but I don't really want to figure that out. It's too slow to use an in a UI above say, `50,000!`.

Turns out tho, even mathematicians don't really calculate factorials this big. They use [Stirlings' Approximation](https://en.wikipedia.org/wiki/Stirling%27s_approximation) instead, since it's faster and "good enough". It looks sort of like this:

```
𝑒ln(𝑛!) = 𝑛!
where
ln(𝑛!) = ∑𝑛𝑘=1(ln𝑛)
```

It would be pretty cool to do this in JavaScript! And personally, I love "good enough". I've already got a handy function for running Big Sigma calculations:

```js
const new_arr = (s,n) => {
  if (s < 0 || n < 0) { return []}
  return Array.from(Array(n+1).keys()).filter(v => v > s-1)
}

const Σ = (min, max, fn) => new_arr(min, max).reduce((acc, val) => fn(val) + acc, 0)
```

So lets try this out:

```js
const log = (x) => Math.log(x)
Math.exp(Σ(1, 1000000, log)) // Infinity
```

Oh no! The end result of our `1,000,000!` function _is still Infinity_. Thats because one million factorial is … very big. It could still fit into a `BigInt`, but then we have another problem: we cant run `Math` functions on the `BigInt` type. And we can't rewrite the functions to use `BigInt`s because the type is, by definition, _only for integers_. and `𝑒` is definitely not an integer. Even a math library like [math.js](https://mathjs.org/) has the same issues around typing, despite trying to account for it.

Naturally, this leads to a simple proposal: FaaStorials! Fast Factorials as a Service! Since factorials are immutable, it should be possible to store the first 1,000,000 or so in a database, and provide an API for querying and returning them. Even a slow network request would be faster than computing the factorial locally. It should be possible to crunch (slowly) all the factorials, and write them to a database for retrieval on demand. I wrote this function and got about 7,000 rows written before I realized it would probably be expensive.

According to my rough estimating, `1,000,000!` would send a response that weights about `700kb`, and the whole database would be in the neighborhood of `350gb`. This would cost me about $80 a month to store, maybe $100 a month to pay for the requests as well. I pulled the plug on the script.

As with many problems, the upper bound ends up being defined by time and money, the end!