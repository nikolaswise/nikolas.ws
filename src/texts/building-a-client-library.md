---
title: Building a Client Library for ArcGIS
date: 2015-12-4
description: Writing a wrapper client library to smooth out design weirdness at the API level leads to plenty of design thinking on the way things should be.
---

Write up and talk bout making client libs and stuff.

#### Outline

- I built a Javascript wrapper for Node and the Browser around the ArcGIS REST API to simplify working with that platform as a developer.

- Sometimes backing API's are rough, built over time, and don't provide the sort of logical models that work well with specific language environments.

- Figure out what problems you want to solve. Read all the doc to get a big picture of what's going on with the API. Talk to everyone who's done work like this before to figure out what problems they needed to solve.

- Sketch out what the main concepts of the library will be, how they interact with each other, and how the end user is gonna interact with them.

- Write a ton of doc. Write the doc to match the behaviors you would expect to happen, working from the base principles you've already worked out.

This year I built a JavaScript wrapper for Node and the Browser around the ArcGIS REST API to simplify working with that platform as a developer. This was as an exercise in API design, as well as making a tool that I wanted to use but didn't exist yet. The project is a bare-bones library to ease interactions with the ArcGIS REST API in JavaScript and Node apps.

Sometimes – and for sure in this case – an API can be rough, built over time, and not provide the sort of logical models that work well with specific language environments. This was the case with the ArcGIS REST API that I was running in to. A lot of the decisions had been made over the course of years, and didn't translate very smoothly a language as young as Node.js.

The first step was to figure out what problems I wanted to solve. A lot of my work with Esri PDX has been about content handling, and so this is where I started. Reading _all_ the doc to get a big picture of what's going on with the API, and talk to everyone who's done work like this before to figure out what problems *they* needed to solve was the first step. From there I felt I had enough context and information to make the thing useful for more people than just me, and make sure that it was coherent with the underlying goals of the original API.

This project works to simplify and unify the gap between the ArcGIS REST API and a contemporary Node application. This library is a UI in the most basic sense of the term — it provides an interface between the developer and the servers. That interface needs to be well designed and thoughtful in order to make the process as smooth, intuitive, and pleasurable as possible.

One of the most important parts of the project is to provide developers with a way to access the ArcGIS platform without needing to architect their entire application around opinionated frameworks (like Dojo, for example). Though the library itself is written in ES6, it's distributed as plain, normal ES5 – both as a node package and a packaged bundle. This means it works both in Node and the browser, and has very few opinions on how it integrates with the rest of your app.

Right now, the library wraps most of the basic platform content management and interactions - getting and editing users, organizations, and items. The Node ArcGIS Client Library is an open source project — so it's scope will increase as the community works to accomplish more goals and workflows.

## Setting up the client

The first step in using the library is initializing the client with your target portal.

```
var ArcGIS = require('arcgis')
var arcgis = ArcGIS()
```

This sets up a default object for interacting with the API. This default is going to talk to ArcGIS Online as an anonymous, unauthenticated user. One can authenticate this client session as a named user by passing in a user token obtained from a successful OAuth login process.

```
var arcgis = Arcgis({
  token: namedUserToken
})
```

This isn't exclusive to ArcGIS Online. The API for interacting with your organization's installation of Portal or Server is the same. Setting up the client session with your instance is done by specifying your API domain.

```
var arcgis = Arcgis({
  domain: 'ago.my-server.com',
  token: namedUserToken
})
```

Beyond the initialization of the client, the library is exclusively async. All the functions return promises by default.

```
function log (m) {
  console.log(m)
}
function ohNo (err) {
  return new Error(err)
}
arcgis.request()
.then(log)
.catch(ohNo)
```

You can also pass in a node-style callback, if you'd prefer.

```
function log (err, results) {
  if (err) {
    return new Error(err)
  } else {
    console.log(results)
  }
}
arcgis.request({}, log)
```

Both methods work just as well, and use all the same business logic. I like promises, but maybe you don't. This is one of the main reasons the library does its best to avoid inflicting my opinions on your codebase.

Once we have an authenticated session, we can do all sorts of stuff — like figure out who we are:

```
function hello (user) {
  console.log('Hello, ' + user.firstName)
}
arcgis.user('NikolasWise').then(hello)
```

We can get all of the items that user has in the platform:

```
function getContent (user) {
  return user.content()
}
function logContent (content) {
  console.log(content)
}
arcgis.user('NikolasWise')
.then(getContent)
.then(logContent)
```

Or a list of all the groups that a user is a member of.

```
function logGroups (item) {
  item.groups.forEach(function (group) {
    console.log(group.title)
  })
}
arcgis.user('NikolasWise').then(logGroups)
```

The library also can interact with the user's organization, returning information, members, or all the content associated with the organization.

```
function logOrg (org) {
  console.log(org)
}
arcgis.organization('esripdx').then(logOrg)
```

The organization call defaults to 'self' — whatever organization the current user is a member of.

```
function getMembers (org) {
  return org.members()
}
function log (members) {
  console.log(members)
}
arcgis.organization().then(getMembers).then(log)
```

Many of the content calls are abstractions or helper methods for longer, more complicated calls to the `search` endpoint.

```
function getContent (org) {
  return org.content()
}
function log (items) {
  console.log(items)
}
arcgis.organization().then(getContent).then(log)
```

In this way we are able to create a transitional layer between the API itself (a super complicated call to the search endpoint) and what application developers need (all my organization's content).

## Working with content

Platform content is the weakest link in the library as of today. ArcGIS supports a huge range of item types, and quite a number of sophisticated things you can do with those item types. For now the basics are more or less in place — like getting an item's details:

```
var layerID = 'a5e5e5ac3cfc44dfa8e90b92cd7289fb'
function logItem (item) {
  console.log(item)
}
arcgis.item(layerID).then(logItem)
```

Or updating the those details and editing the permissions:

```
var layerId = 'a5e5e5ac3cfc44dfa8e90b92cd7289fb'
function updateItem (item) {
  return item.update({
    snippet: 'Building footprints in my neighborhood in Portland, Oregon'
  })
}
function shareItem (item) {
  console.log(item)
  return item.permissions({
    access: 'public'
  })
}
arcgis.item(layerId)
.then(updateItem)
.then(shareItem)
```

So far, there's some support for item-type-specific methods that are starting to open up the possibilities of manipulating your content from Node — like getting all the data in a layer.

```
var layerID = 'a5e5e5ac3cfc44dfa8e90b92cd7289fb'
function getData (item) {
  return item.data()
}
function logData (data) {
  console.log(data)
}
arcgis.item(layerId)
.then(getData)
.then(logData)
```

There is a lot more of the platform that we could cover than this - services, analysis, layer creation and tile publishing all are actions that this library or ones like it could cover.