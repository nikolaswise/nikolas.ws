---
title: Factorial! Race!
description: Finding an upper limit on factorials in JavaScript
date: 2021.06.07
slug: factorial-race
---


```js
const factorial = (x) => x > 1 ? x * factorial(x - 1) : 1
factorial(170) // 7.257415615307994e+306
factorial(171) // Infinity
```

```js
const big_factorial = (x) => x > 1 ? x * big_factorial(x - BigInt(1)) : BigInt(1)
big_factorial(BigInt(171)) // 1241018070217667823424840524103103992616605577501693185388951803611996075221691752992751978120487585576464959501670387052809889858690710767331242032218484364310473577889968548278290754541561964852153468318044293239598173696899657235903947616152278558180061176365108428800000000000000000000000000000000000000000n
```

```js
big_factorial(BigInt(1000)) // 402387260…0n
big_factorial(BigInt(10000)) // RangeError: Maximum call stack size exceeded
```

```js
const big_fast_factorial = (x) => {
  let r = BigInt(1);
  for (let i = BigInt(2); i <= x; i++)
    r = r * i;
  return r;
}
big_fast_factorial(BigInt(10000)) // 284625…0n in about 70ms
```

```js
big_fast_factorial(BigInt(20000)) // ~300ms
big_fast_factorial(BigInt(30000)) // ~650ms
// …
big_fast_factorial(BigInt(90000)) // ~7238ms
big_fast_factorial(BigInt(100000)) // ~9266ms
```

```
𝑒ln(𝑛!)=𝑛!
where
∑𝑛𝑘=1(ln𝑛)
```

```js
const new_arr = (s,n) => {
  if (s < 0 || n < 0) { return []}
  return Array.from(Array(n+1).keys()).filter(v => v > s-1)
}

const Σ = (min, max, fn) => new_arr(min, max).reduce((acc, val) => fn(val) + acc, 0)
```

```js
const log = (x) => Math.log(x)
Math.exp(Σ(1, 1000000, log)) // Infinity

The end!
```