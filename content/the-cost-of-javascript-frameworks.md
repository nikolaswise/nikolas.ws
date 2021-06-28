---
title: The Cost of Javascript Frameworks
slug: the-cost-of-javascript-frameworks
author: Tim Kadlec
year: 2020
source: https://timkadlec.com/remembers/2020-04-21-the-cost-of-javascript-frameworks/
thesis: Javascript inherently is a massive percentage of a performance budget, modern frameworks are less performant than vanilla JS sites.
tags: front end, javascript, performance
type: annotation, bibliography
---

Kadlec's thesis is that Javascript inherently is a massive percentage of a performance budget. From this perspective, he identifies the purpose of frameworks as:

> a framework makes it easier to perform well by either providing a better starting point or providing constraints and characteristics that make it hard to build something that doesn’t perform well.

From Kadlex:

## JavaScript Bytes Served to Mobile Devices, by Percentile
|  | 10th | 25th | 50th | 75th | 90th |
|:--|:--|:--|:--|:--|:--|
| All Sites	 | 93.4kb | 196.6kb	 | 413.5kb	 | 746.8kb	 | 1,201.6kb |
| w/ jQuery	 | 110.3kb	 | 219.8kb	 | 430.4kb	 | 748.6kb | 1,162.3kb |
| w/ Vue.js	 | 244.7kb	 | 409.3kb	 | 692.1kb	 | 1,065.5kb	 | 1,570.7kb |
| w/ Angular | 445.1kb | 675.6kb	| 1,066.4kb	 | 1,761.5kb	 | 2,893.2kb |
| w/ React | 345.8kb | 441.6kb	 | 690.3kb	 | 1,238.5kb	 | 1,893.6kb |

## Scripting related CPU time (in milliseconds) for mobile devices, in percentiles
|  | 10th | 25th | 50th | 75th | 90th |
|:--|:--|:--|:--|:--|:--|
| All Sites	 | 356.4ms | 959.7ms | 2,372.1ms	| 5,367.3ms | 10,485.8ms |
| w/ jQuery	 | 575.3ms | 1,147.4ms	| 2,555.9ms| 5,511.0ms | 10,349.4ms |
| w/ Vue.js	 | 1,130.0ms | 2,087.9ms	| 4,100.4ms	| 7,676.1ms	| 12,849.4ms |
| w/ Angular  | 1,471.3ms	| 2,380.1ms	| 4,118.6ms | 7,450.8ms | 13,296.4ms |
| w/ React | 2,700.1ms | 5,090.3ms | 9,287.6ms | 14,509.6ms | 20,813.3ms |

The takeaway is that modern frameworks, when deploying in a best-in-class manner, can be as lightweight as an average framworkless website, but on average – and absolutely including worst case implementations – modern frameworks are incredibly bloated. In particular, Angular serves heavy pages, React serves slow pages.

From observing the data between sites that detect React _at all_ and sites that only detect React (as in, for sure no jQuery) Kadlec observes that main thread performance drops significantly. This is a clear indication that migrating from jQuery to React harms main thread performance.

> If you have React and jQuery running alongside each other, you’re more likely to be in the midst of a migration to React, or a mixed codebase. Since we have already seen that sites with jQuery spend less time on the main thread than sites with React, it makes sense that having some functionality still driven by jQuery would bring the numbers down a bit.

Additionally, Kadlec observes that mobile devices suffer from this performance decrease more than desktop devices. This suggests that modern frameworks explicitly are avoiding a mobile-first mentality, and relying on contemporary hardware.

To wrap up, Kadlec suggests that this data isn't indicative of the baseline performance capabilities of a framework, but rather indicates that the _implementation_ is at fault. If in general the implementation of a framework is causing performance issues, that the primary fault is in the ecosystem, documentation, and community standards around that framework.