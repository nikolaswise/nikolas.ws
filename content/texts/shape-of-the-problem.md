---
title: The Shape of the Problem
slug: shape-of-the-problem
date: 2021.06.29
description: Ontological data structures, real-time editing, and what a web app _really_ is man.
type: text
---

At [work](https://smugmug.com) the other day I was thinking about a problem: Websites as User Generated Content, a part of the business I've been low-key thinking about for nearly a year. A chance conversation with [Reuben Son](https://reubenson.com/) about Vox's content editing tool [Kiln](https://github.com/clay/clay-kiln) altered my perspective on who a _user_ is when thinking about UGC. For them, their users are their editors and authors. Kiln works by loading an editor interface directly over the rendered web page, and allows for editing of any portion of that webpage.

It occurred to me that one could use a real-time NoSQL database like [FaunaDB](https://fauna.com/) or [Firebase](https://firebase.google.com/) to store a document model, run an app that subscribes to changes to this database and renders the document model into the DOM, than do the same bit where a editor lays over the page and allows for editing, posting changes directly to the NoSQL database. The resulting update would re-render the document for the editor, _and anyone else also currently viewing the app_. This would look like Squarespace, but be naturally multi-tenant. After editing, a static site could be generated and hosted on s3 to serve to a larger audience. Questions around draft states, not publishing another users edits, and other logistical things started to crowd my mind, but the core idea was interesting enough for me to decide to put a prototype together.

Unfortunately (well…) before I could get to it, I was dropped in cold to a meeting about an impending migration of our knowledge base. We have hundreds of articles with URLs that are going to get 100s of new URLs and we have to update them across out entire application, hopefully also solving the problem for good and never having to do it again. Since our larger content strategy was at the forefront of my mind, I pitched creating a Knowledge Organization System that associates a UUID with an article URL, then consume that UUID in applications and not worry about the URL. Front the whole thing with a content management system and our support team can update article URLs whenever and it's never a problem 
again. 

Thats when I realized that _these two problems are the same problem_. Both have the same set of concerns and desired behaviors a collection of structured data documents that support CRUD operations, paired with a visualization of the. document. So:

- A collection of documents.
- A system for creation and editing of these documents.
- A web app for rendering and visualizing these documents, either in progress or some production state.

Rephrased, the components are:

1. The Ontology / Structure
2. The Editor Interface 
3. The Rendered Form\
  a. A Dynamic form\
  b. A Static form

Note that the Dynamic form is not _necessarily_ a server or client-side rendered experience, but a way of seeing the changes you're making before committing to a production state.  The Static form then is not _necessarily_ a static asset (it can be server or client side generated from a database) but denotes a _stable production state_ as viewed by a audience.

For the knowledge base, the ontology is the index of articles. For the UGC websites, it is content and component structure. Thee editor interface is a CMS, either a product or like Kiln, something in house that sits on top. The rendered form for the sites is a static html build, for the knowledge base it's 301 redirect service. 

This is super abstract on purpose! I think this is the core structure of _all web apps_. Since this structure is so general as to be mostly useless (maybe interesting as a teaching tool),  the value of a _web app typology_ must come from taking an opinionated perspective on all three of the above points. This can be used as a tool to examine and critique popular web app typologies to validate the concept; how does a given typology express its disposition and behaviors in each component?

Our first typology for analysis is the "Static Site" – an unchanging directory of html files generated at build time from a codebase, largely on a developers local machine. The ontology of many popular static site generates is the local file system, and attendant metadata. The editor interface is the developers command line and the source code repository (git really is an excellent content management system). The dynamic form is a dev server that runs locally and re-renders changes in real-time, and the static form is the built source code output to static assets.

Another popular typology is the "Wordpress Site". A [classic in web development](/wordpress-but-not-terriible). Here, the ontology is a MySQL database who's structure is invented ad-hoc by the developer. The editor interface is a PHP (and React I guess with Wordpress 5) web application that allows for manipulation of the MySQL database. The dynamic form is the "preview" of database changes or a "staging" environment for code and data, whole the static form is determined by PHP templates that fetch data form the database and interpolate pages at run time, on each request. 

The "Shopify" is structurally the same as the "Wordpress", but swap PHP for Ruby like a good early 2000's startup and make the  Ontology a pre-determined e-commerce structure. I think this is the dominant web app disposition, with a range of opinions on how much should happen on the server and how much should happen on the client.

Two other typologies I think are worth exploring, the "Notebook" and the "Data Driven Web App". The Notebook, like [Observable](https://observablehq.com/) positions the ontology as an unstructured document. The editor interface is a word processor app for that document, and the rendered form is a combination of pre-set app framework and _the contents of the document_. Dynamic form is a draft state of the document, static form is a published state. Notebooks are very interesting and different, and Observable is a great example of one. Since we're in the neighborhood of Mike Bostock, let's talk about "Data Driven Applications". The ontology _is the data doing the driving_. The rendered form is source code for visualizing the data — dynamic locally run while editing code, static is hosted on a server or cdn. The editor interface is relinquished to whatever real-world process governs the collection of the data.

Each typology is a powerful conception of what a web app can be, and each one has a unique and distinct perspective on the three important parts of what a web app is. No one is better than the others, since they each have a different relationship. And a different definition of good. 

The shape of my two problems that were actually one problem gave me an idea for a new kind of web app typology, one that borrows from the Semantic Web and real-time web apps. The dispositions and technical behavior of the app would look something like this:

## 1: The Ontology

This kind of app will use off-the-shelf RFDA or JSON-LD ontologies. These ontologies can be extended or created, but _must_ be valid RDFA or JSON-LD (either is fine, since they can be machine translated into each other). This allows for deeply semantic structures, machine readable relationships, and lossless data transfer between systems. Structuring this data as a graph allows for narrow, tailored _consumption_ of the dat via GraphQL without dedicated API development and maintenance. It also allows for the entire data system to be visualized.

Using these semantic ontologies rather than providing a blank slate and letting the data structures grow on an ad-hoc basis also saves _a lot_ of time in creating the data models; since it's all semantic and robot friendly a single URI to the ontology should be enough to populate all the content models any given editor interface might need.

## 2: The Rendered Form

The guiding principle of thee rendered form is to be as light as possible over the wire, for both the dynamic and static forms.

The rendered form splits the difference between a JAMstack real-time application and a static site. The dynamic form is hosted as a web app, and subscribes to real-time changes in the ontology documents. As the data changes, the dynamic form updates to reflect it. This takes the development build off of the local machine and puts it where more than one person can see it at a time. The static form is a built collection of static html files that an be hosted from any CDN to the wider audience.

## 3: The Editor Interface

The editor is completely separate from the renderer, but a common protocol unites it with the renderer on one end and the ontology on the other. Load the editor on any given dynamic rendered page to get an experience where _any_ given property of the ontology can be edited, written to the database, and the effects seen immediately in real-time by anyone connected to the dynamic render. The diffs can then be stashed, discarded, or published. 

## Conclusion

The end result of an app like this would be an experience sort of like [Glitch](https://glitch.com/), sort of like [Squarespace](https://www.squarespace.com/) and sort of like [Observable](https://observablehq.com/). 

With permissions around what rendering or editing app can see or touch what in the database, its possible and even _important_ that any given concept that relates to the system can be represented in the system — either the data itself of a metadata record that is indexical to the data. This allows the entire system to be meaningfully connected, which enables solutions for many common problems (uri mapping, incompatable data structures, duplicated databases, nightmare migrations, vendor lock in) and opens the door to new use cases and implementations, like bespoke CRMs seamlessly integrated into a product or an ecosystem of _editing experiences_ that are completely independant of any given renderer or ontology. 

A clumsy handle for this kind of app could be a Semantic Mono-Database. Not as catchy as JAMstack, SPA, or Static Site. We'll get there tho, I'm sure a meaningful name will present itself as I work to build the first real one of these things.

