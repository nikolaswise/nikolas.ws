---
title: Fun With JSON-LD
slug: fun-with-json-ld
description: Learning about JSON-LD is all about and why we should. 
date: 2020.08.25
type: text, texts
---

<script>
  import Introduction from '../components/Introduction.svelte'
</script>

<Introduction {metadata} />

Working with [Adam Riemer](https://www.adamriemer.me/) on SmugMug's SEO has been a really illuminating experience. SEO consulting has always been flagged in my mind as "Snake Oil Business", but Adam really is the best in the field. Almost all of his SEO suggestions focus on performance and accessibility, and he has some clear, hard metrics to define "good". This squares with my fundamental understanding of good SEO practices, and has broadened my horizons and understanding of of the practice.

Something that Adam introduced me to is JSON-LD – a way of creating structured metadata for pages that's more explicit that microdata formats. Here's what I've learned about JSON-LD so far. 

JSON-LD is Google's preferred format for accurately and succinctly structuring metadata for pages. This gives them insight into what's on your page and why, and they use The Algorithm to interact and consume this data. Using their standards gives you the _opportunity_ to get top, fancy search results but there's no guarantee of that. The best thing to do is to use your structured data to give the best, more accurate, and complete picture of what content your page has for your audience. Trying to game SEO here is probably going to backfire, just describe things as they are as clearly as possible.

The primary _purpose_ of structured data is to create a machine-readable and algorithm friendly metadata for your content. This allows the content to be consumed by the crawlers and the robots, and join in the mesh of content that Google exposes to users when they perform searches or ask questions of it.

Clearly this is a double-edged proposition. By using structured data you're explicitly buying in to the ecosystem that Google is creating, and allowing your content to be trawled and used and understood however they want. You undoubtable end up providing value to Google in excess to what they are providing to you. Not to mention participating in the project of making the world machine-readable, which has it's own philosophical freight. 
 
[Schema.org](https://schema.org/) has a lot of data types that might be appropriate for your project: Articles, Books, Breadcrumbs, Carousel, Course, Critic Review, Dataset, Event, How-to, Local Business, Movie, Podcast, Product, Software App, and Video are all ones that look interesting to me. 

For something like this site, we're using pretty much entirely `Website` and `Article` – and connect them with a `CollectionPage` and a `Person` who is me! Maybe some of the art will be a `CreativeWork`.

Some information on these types:

- Article: [https://schema.org/Article](https://schema.org/Article)
- Person: [https://schema.org/Person](https://schema.org/Person)
- Collection Page: [https://schema.org/CollectionPage](https://schema.org/CollectionPage)
- Creative Work: [https://schema.org/CreativeWork](https://schema.org/CreativeWork)
- Web Site: [https://schema.org/WebSite](https://schema.org/WebSite)

Lets work through [Google's example of an article](https://developers.google.com/search/docs/data-types/article), maybe for this article!

Here's the `script` tag that is home to our structured data:

```
<script type="application/ld+json">
…
</script>
```

We fill it with a JSON object that describes our data structure:

```
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article headline",
  "datePublished": "2020-08-25T16:42:53.786Z",
  "dateModified": "2020-08-25T16:42:53.786Z"
}
```

The `@context` key clues the robot in to the data definition we're going to be using, which is the `schema.org` definitions. The `@type` tag associates the following data with the pre-defined structure. From there on it's relevant data! `headline`, `datePublished` and `dateModified` are all directly pulled from the content itself. In out case our data looks like this:

```
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Fun With JSON-LD",
  "datePublished": "2020-08-12T08:00:00+08:00",
  "dateModified": "2020-08-12T08:00:00+08:00"
}
```

Open question: `BlogPosting` or `Article`? Im going to stick with `BlogPosting` since these texts are really just that. I would use `Article` if I was writing a news piece or a review, or something maybe more scholarly. 

The last required field is an `image`:

> For best results, provide multiple high-resolution images (minimum of 300,000 pixels when multiplying width and height) with the following aspect ratios: 16x9, 4x3, and 1x1.

```
{
	…
  "image": [
    "https://example.com/photos/1x1/photo.jpg",
    "https://example.com/photos/4x3/photo.jpg",
    "https://example.com/photos/16x9/photo.jpg"
  ]
}
```

This means that creating thumbnails for every Article is important, and those images need to exist on the page in a way that user can see. 

For this site, the main use of these images is going to be for sharing thumbnails. The fact that the image needs to be on the pages is interesting, since that really influences the design of the page. I've found that creating the necessity for a prominent thumbnail or hero image that accompanies each article is a recipe for a) not writing articles and b) bland stock photography. I want to avoid both. That means for this site I'm going to do illustrated images, small sketches and motif explorations that may or may not illustrate the article, and attach it to the _bottom_ of the article.

There are two other sections I want to look at, even though they are not requirements according to Google. These are the `author` and the `publisher` fields. The goal of using these fields is to create an association between you and your work; or in the case of the `publisher` field between an imprint entity and the creative works they've published. In our use case for this site, my goal is to create a machine-readable entity that is 'Nikolas Wise' and attach my articles and my work to that, in order to create a coherent entity that is exposed to the broader web. 

The `author` field is a `Person` or an `Organization`, the `publisher` field is an `Organization`. Lets start with `Person`:

> A person (alive, dead, undead, or fictional).
[https://schema.org/Person](https://schema.org/Person)

It gets added to our LSON-LD like this:

```
{
	…
  "author": {
	  "@type": "Person",
	  …
  }
}
```

There are a lot of properties in this schema, like `deathPlace` and `knows`. One could really get into this and make it a very robust and complete data object, but I'm not sure how much value that would bring at the end of the day. There's a fine line between following specs and best practices to achieve a goal and ticking boxes to structure our lives solely in order to make them legible to the algorithm. I guess we each decide where that line is for ourselves.

For me, I'm going to stick with `name`, `url`, `image`, `jobTitle`, `knowsLanguage`, and `sameAs`. Although `publishingPrinciples` seems interesting, and I might write one of those. 

Most of the fields are simple text strings, and can get filled out like so:

```
{
	…
  "author": {
	  "@type": "Person",
		"name": "Nikolas Wise",
		"url": "https://nikolas.ws",
		"image": "https://photos.smugmug.com/Portraits/i-ThnJCF5/0/f9013fdc/X4/wise-X4.jpg",
		"jobTitle": "Web Developer",
		"knowsLanguage": "en, fr",
		"sameAs": …,
  }
}
```

The language codes are from the [language code spec](https://tools.ietf.org/html/bcp47), and could also be [language](https://schema.org/Language) schema objects. The job title could be a [Defined Term](https://schema.org/DefinedTerm) schema object. 

The `sameAs` key is an interesting one, it's either a URL or an array of URLs that connect this `@person` with other parts of the web that are _also_ that `@person`. 

```
{
	…
  "@person": {
	  …
		"sameAs": [
			"https://twitter.com/nikolaswise",
			"https://github.com/nikolaswise",
			"https://www.instagram.com/nikolaswise/",
			"https://www.linkedin.com/in/nikolas-wise-6b170265/",
		],
  }
}
```

This will connect "me" with this site and my twitter, github, instagram, and linkedin profiles. Those are the pages that I want to the algorithm to associate with "me".

`@organization` is similar to `@person` in a lot of ways, and the fundamental idea is the same. The goal is to create a single entity that the algorithm can connect disparate pages and items too. I'm not going to set of an `@organization` here, but the the [`@organization` schema type](https://schema.org/Organization) has the spec for the object. 

So that's it! That means the entire JSON-LD for this article – and therefor the rest of the texts as well, looks like this:

```
<script type="application/ld+json">
	{
	  "@context": "https://schema.org",
	  "@type": "Article",
	  "headline": "Article headline",
	  "datePublished": "2020-08-25T16:42:53.786Z",
	  "dateModified": "2020-08-25T16:42:53.786Z",
	  "image": [
	    "https://example.com/photos/1x1/photo.jpg",
	    "https://example.com/photos/4x3/photo.jpg",
	    "https://example.com/photos/16x9/photo.jpg"
	  ],
	  "author": {
		  "@type": "Person",
			"name": "Nikolas Wise",
			"url": "https://nikolas.ws",
			"image": "https://photos.smugmug.com/Portraits/i-ThnJCF5/0/f9013fdc/X4/wise-X4.jpg",
			"jobTitle": "Web Developer",
			"knowsLanguage": "en, fr",
			"sameAs": [
				"https://twitter.com/nikolaswise",
				"https://github.com/nikolaswise",
				"https://www.instagram.com/nikolaswise/",
				"https://www.linkedin.com/in/nikolas-wise-6b170265/",
			],
	  }
	}
</script>
```