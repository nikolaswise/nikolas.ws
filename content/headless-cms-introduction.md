---
title: Headless CMS; A Brief Introduction
description: What _is_ a Headless CMS, and how can it be useful for building websites and apps?
date: 2021.05.28
slug: headless-cms-introduction
type: text, texts
---

<script>
  import Introduction from '../components/Introduction.svelte'
</script>

<Introduction {metadata} />

A Content Management System is a central aspect of any web project - even projects where you would never think of as "having" or "using" a CMS. In these sorts of projects the content management system _is_ the codebase, and the strategy for managing content is identical to the process for managing code. This, obviously, is not ideal for anyone who wants to edit content and not code, or in uncomfortable in the workflows that developers rely on for our day-to-day practice — like Git. The other end of the spectrum of CMS is something like Squarespace — the code is the content. Not ideal if you want to edit code and not content. A traditional CMS like Wordpress attempts to split the difference; the CMS controls the code and the content, but makes an attempt to keep them at least a little independant by storage content in a database and providing an admin interface for editing and authoring that content.

All of the above approach the problem of content management with the same set of assumptions: the CMS is responsible for taking the content, combining it with the code, and assembling and delivering the entire website. Both parts are coupled together, with the CMS rendering the "head" of the website or app.

In the past few years with rise of build-time generated and static sites, a new approach to this problem has been articulated and built by a number of companies. The basic idea underlying this new approach is that the CMS should only be in charge of content, and interacted with like any other API. This decouples the code from the content, and removes the CMS from any responsibility of interacting with the code at all. This style of CMS does not render anything out to the web, and is thus called a headless CMS. In short, a headless CMS has no website out of the box. This means there is not a default theme (there are no themes!) to configure, there is no classic "blog" visuals or interfaces to configure and map too content. A blog is just one of many things a headless CMS can be used for.

A headless CMS has a number of advantages: the first among them is that the product in charge of managing content can focus solely on managing content, and be very, very good at authoring, creating, and editing without needing to also be a good tool for building web apps with. The second biggest advantage is it provides the development team with complete freedom to meet the real-world business use cases associated with the project without relying on the CMS to support those use cases.

Search Engine Optimization is an excellent example of these two characteristics at work – we are completely free to implement any SEO improvements without any support from the CMS, because the CMS doesn't do anything but manage content. SEO tags and page metadata can become content like any other content, and the codebase of the web app is responsible for rendering the actual website as it goes over the wire and gets consumed by browsers. Instead of relying on Wordpress Plugins or trusting that Squarespace is following best practices, all of the implementation details over your SEO strategy is completely in your teams control — just like any project _without_ a CMS integration — while the content itself is entirely in your strategy or marketing teams control.

A Headless CMS exposes content via an API, and that's all it does. 

Contentful provides a set of client libraries that allow content to be consumed in a developers language of choice, meaning that the technologies or systems used to render your app can be selected by any set of criteria at hand, rather than being forced into a decision by the CMS – if you use Wordpress you're writing your app in PHP within Wordpress. With Contentful you can [write your app in Go](https://github.com/contentful-labs/contentful-go) if you want and live your best life.

Below is a quick overview of using the Contentful JavaScript SDK to access content in the Headless CMS. It returns JSON and can be used at run-time or build-time to add content to a website or app:

```
const contentful = require('contentful')

const client = contentful.createClient({
  space: <space-id>,
  accessToken: <access-token>,
  host: <host>
})
```

The `client` provides a set of methods for interacting and querying the content database; 

```
 getSpace: async ƒ getSpace(),
  getContentType: async ƒ getContentType(),
  getContentTypes: async ƒ getContentTypes(),
  getEntry: async ƒ getEntry(),
  getEntries: async ƒ getEntries(),
  getAsset: async ƒ getAsset(),
  getAssets: async ƒ getAssets(),
  createAssetKey: async ƒ createAssetKey(),
  getLocales: async ƒ getLocales(),
  parseEntries: ƒ parseEntries(),
  sync: async ƒ sync()
```

You can use the `getEntries` function to get all the entries available:

```
client.getEntries()
  .then(entries => {
    console.log(entries)
  })
```

Or query on metadata or content:

```
  client.getEntries({
    content_type: 'lesson',
    'fields.slug[in]': 'content-management'
  }).then(entries => {
    console.log(entries)
  })
```

Contentful in particular is interesting because one of the fields you can add to your entries is a reference _to other entries_. This gives the information architecture model some pretty amazing abilities to structure and enable pretty much any sort of content strategy you want to build. Some simple key-value pairs for getting strings to complicated, nested, conditional data structures. 

And from the code's perspective, it's all just JSON! 

For an example of how one can write components that consume this general API data, I've put together a small sample of how to create a component that's defined by JSON structures, and how handling different configuration keys alongside content strings can create a powerful way to integrate with a Headless CMS like Contentful. Check out the [demo on Glitch](https://component-doc-sample.glitch.me/).