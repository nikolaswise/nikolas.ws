---
draft: true
title: Fun With JSON-LD
description: Learning about JSON-LD is all about and why we should. 
date: 2020.08.12
----

Working with Adam Riemer on SmugMug's SEO has been a really illuminating experience. SEO consulting has always been flagged for me as "Snake Oil Business", but Adam really is the best in the field. Almost all of this SEO suggestions focus on performance and accessibility, and he has some clear, hard metrics to define "good". This squares with my fundamental understanding of good SEO practices, and broadens my horizons significantly. 

Something that Adam introduced me to is JSON-LD – a way of creating structures metadata for pages that's more explicit that micro formats. Here's what I've learned about JSON-LD so far. 

> https://developers.google.com/search/docs/guides/intro-structured-data

JSON-LD is Google's preferred format for accurately and succinctly structuring metadata for pages. This gives them insight into what's on your page and why, and they use The Algorithm is interact and consume this data. Hewing to there standards gives you the _opportunity_ to get top, fancy search results but there's no garuntee of that. The best thing to do is to use your strutted data to give the best, more accurate, and complete picture of what content your page has for your audience. Trying to game SEO here is probably going to backfire, just describe things as they are as clearly as possible.

The primary _purpose_ of structured data is to create 


> https://developers.google.com/search/docs/guides/sd-policies
 
 It may seem obvious but don't block your pages from being indexed by robots. Adam says that some page you _want_ to _exclude_ so they don't pull from your main page authority. 

 Its not super clear to me when this is appropriate. 
 
 • Don't show stale time-sensitive information
 • 
 
 > https://developers.google.com/search/docs/guides/search-gallery

Some handy pages types! Articles, Books, Breadcrumbs, Carousel, Course, Critic Review, Dataset, Event, How-to, Local Business, Movie, Podcast, Product, Software App, Video, 

For something like this site, we're using pretty much entirely `Website` and `Article` – and connect them with a `CollectionPage` and a `Person` who is me! Maybe some of the art will be a `CreativeWork`

Some imformation on these types:

Article: https://schema.org/Article
Person: https://schema.org/Person
Collection Page: https://schema.org/CollectionPage
Creative Work: https://schema.org/CreativeWork
Web Site: https://schema.org/WebSite


https://developers.google.com/search/docs/data-types/article

Lets work through google's example of an article, maybe for this article!

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
  "datePublished": "2015-02-05T08:00:00+08:00",
  "dateModified": "2015-02-05T09:20:00+08:00"
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

Open question: `BlogPosting` or `Article`???

The last required field is an `image`:

> For best results, provide multiple high-resolution images (minimum of 300,00su0 pixels when multiplying width and height) with the following aspect ratios: 16x9, 4x3, and 1x1.

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