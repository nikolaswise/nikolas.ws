---
draft: true
title: Building a Client Library
date: 2015-12-4
description: Writing a wrapper client library to smooth out design weirdness at the API level leads to plenty of design thinking on the way things should be.
---

#### Outline

- I built a Javascript wrapper for Node and the Browser around the ArcGIS REST API to simplify working with that platform as a developer.

- Sometimes backing API's are rough, built over time, and don't provide the sort of logical models that work well with specific language environments.

- Figure out what problems you want to solve. Read all the doc to get a big picture of what's going on with the API. Talk to everyone who's done work like this before to figure out what problems they needed to solve.

- Sketch out what the main concepts of the library will be, how they interact with each other, and how the end user is gonna interact with them.

- Write a ton of doc. Write the doc to match the behaviors you would expect to happen, working from the base principles you've already worked out.

- Write the code to make the doc work as advertised, change things as needed. Change the doc when you made a bad call. Repeat.
