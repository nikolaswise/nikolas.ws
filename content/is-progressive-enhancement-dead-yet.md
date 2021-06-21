---
title: Is Progressive Enhancement Dead Yet?
slug: pickering/is-progressive-enhancement-dead-yet
author: Heydon Pickering
year: 2021
source: https://briefs.video/videos/is-progressive-enhancement-dead-yet/
tags: design, development, javascript, js
thesis: Progressively enhancing web applications is not only an essential practice for accessibility, but it provides a framework to respect separation of concerns in technology _and_ reduce boilerplate, polyfills, and otherwise kludgy code. 
type: annotation
---

Pickering wants to talk about Progressive Enhancement, but apparently a lot of people are over it and want to be done with it. Pickering thinks that putting progressive enhancement to bed – and worrying about it no more would be a "grave" mistake. 

Pickering addresses some common misconceptions. 

Progressive Enhancement is Not:
- Something you install using a package manager.
- Progressive enhancement is not a `<noscript>` tag with the text "Please turn on Javascript".
- Progressive enhancement is not rendering HTML on the server, then having the browser re-render that HTML via hydration (_React_)

Pickering uses an metaphor of the skateboard to explain what progressive enhancement _is_.

> Imagine two skateboards. One is the old fashioned kind, it's just a board with wheels. The other has a screw hole near the front, allowing you to attach some handlebars and make the skateboard a scooter. Just because the handlebars don't attach to the older skateboard doesn't mean it's broken. It still works as a skateboard. 

In Pickerings example, the handlebars are a feature that the browser may or may not support. Importantly, if there is no support for the feature, things _still work fine._ Great emphasis is placed on this point.

> The basic layout is not a broken layout.

Here's a provide example of a progressively enhanced masonry layout:

```
.grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
}

@supports (grid-template-rows: masonry) {
	.grid {
		.grid-template-rows: masonry;
	}
}
```

If a browser supports `@supports` and `grid-template-rows:masonry`, the layout engine applied the layout. The key here is that out layout tools are handling out layout, and Javascript is not relied on _at all_ for functions that Javascript is not intended for. 

Another example, using [<watched-box>](https://github.com/Heydon/watched-box) is provided:

```
// use web component
<watched-box
	widthBreaks="320px, 60ch"
	heightBreaks="100vh, 2014px" 
/>
	<!-- children -->
</watched-box>

// progressive enhancement logic 
if ('ResizeObserver' in window && 'customElements' in window) {
	customElemeents.define('watched-box', WatchedBox);
}	

// load custom element as module
<script type="module" src="watched-box.js"></script
```

The module import self-selects for modern browsers, the custom element code itself checks for browser feature support, and if none of these things exist the children of the `<watched-box>` tag render normally.

Another example of conditionally importing Javascript:

```
// ignored by old browsers, used by modern browsers
<script type="module" serc="new.js"></script>


// ignored by modern browsers, used by old browsers
<script nomodule src="old.js"></script>
```

This is all predicated on respecting the separation of concerns for HTML, CSS, and JS, and it's important that we don't do thing in JS that could and should be done with CSS. 

Pickering closes with a counter-example of regressive enhancement with a tab pattern. This pattern is better handled in a traditional HTML structure, as adding large amount of Javascript to collapse the pattern into tabs create both an accessibility and user experience nightmare that can be hugely difficult to untangle. Pickering identified the important of letting the browser technologies do their thing. 

The final note is as follows:

> Use Javascript to do Javascript things. And not Javascript to do like … not Javascript things. 