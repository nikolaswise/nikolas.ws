<script context="module">
	export const metadata = {"title":"Fun With JSON-LD","slug":"fun-with-json-ld","description":"Learning about JSON-LD is all about and why we should.","date":"2020.08.25","type":"text, texts"};
	const { title, slug, description, date, type } = metadata;
</script>
<script>
  import Introduction from '../components/Introduction.svelte'
</script>


<Introduction {metadata} />
<p>Working with <a href="https://www.adamriemer.me/" rel="nofollow">Adam Riemer</a> on SmugMug’s SEO has been a really illuminating experience. SEO consulting has always been flagged in my mind as “Snake Oil Business”, but Adam really is the best in the field. Almost all of his SEO suggestions focus on performance and accessibility, and he has some clear, hard metrics to define “good”. This squares with my fundamental understanding of good SEO practices, and has broadened my horizons and understanding of of the practice.</p>
<p>Something that Adam introduced me to is JSON-LD – a way of creating structured metadata for pages that’s more explicit that microdata formats. Here’s what I’ve learned about JSON-LD so far. </p>
<p>JSON-LD is Google’s preferred format for accurately and succinctly structuring metadata for pages. This gives them insight into what’s on your page and why, and they use The Algorithm to interact and consume this data. Using their standards gives you the <em>opportunity</em> to get top, fancy search results but there’s no guarantee of that. The best thing to do is to use your structured data to give the best, more accurate, and complete picture of what content your page has for your audience. Trying to game SEO here is probably going to backfire, just describe things as they are as clearly as possible.</p>
<p>The primary <em>purpose</em> of structured data is to create a machine-readable and algorithm friendly metadata for your content. This allows the content to be consumed by the crawlers and the robots, and join in the mesh of content that Google exposes to users when they perform searches or ask questions of it.</p>
<p>Clearly this is a double-edged proposition. By using structured data you’re explicitly buying in to the ecosystem that Google is creating, and allowing your content to be trawled and used and understood however they want. You undoubtable end up providing value to Google in excess to what they are providing to you. Not to mention participating in the project of making the world machine-readable, which has it’s own philosophical freight. </p>
<p><a href="https://schema.org/" rel="nofollow">Schema.org</a> has a lot of data types that might be appropriate for your project: Articles, Books, Breadcrumbs, Carousel, Course, Critic Review, Dataset, Event, How-to, Local Business, Movie, Podcast, Product, Software App, and Video are all ones that look interesting to me. </p>
<p>For something like this site, we’re using pretty much entirely <code>Website</code> and <code>Article</code> – and connect them with a <code>CollectionPage</code> and a <code>Person</code> who is me! Maybe some of the art will be a <code>CreativeWork</code>.</p>
<p>Some information on these types:</p>
<ul>
<li>Article: <a
  href="https://schema.org/Article"
  rel="nofollow"
>https://schema.org/Article</a></li>
<li>Person: <a
  href="https://schema.org/Person"
  rel="nofollow"
>https://schema.org/Person</a></li>
<li>Collection Page: <a
  href="https://schema.org/CollectionPage"
  rel="nofollow"
>https://schema.org/CollectionPage</a></li>
<li>Creative Work: <a
  href="https://schema.org/CreativeWork"
  rel="nofollow"
>https://schema.org/CreativeWork</a></li>
<li>Web Site: <a
  href="https://schema.org/WebSite"
  rel="nofollow"
>https://schema.org/WebSite</a></li>
</ul>
<p>Lets work through <a
  href="https://developers.google.com/search/docs/data-types/article"
  rel="nofollow"
>Google’s example of an article</a>, maybe for this article!</p>
<p>Here’s the <code>script</code> tag that is home to our structured data:</p>
<pre class="language-undefined">{@html `<code class="language-undefined">&lt;script type=&quot;application/ld+json&quot;&gt;
…
&lt;/script&gt;</code>`}</pre>
<p>We fill it with a JSON object that describes our data structure:</p>
<pre class="language-undefined">{@html `<code class="language-undefined">&#123;
  &quot;@context&quot;: &quot;https://schema.org&quot;,
  &quot;@type&quot;: &quot;Article&quot;,
  &quot;headline&quot;: &quot;Article headline&quot;,
  &quot;datePublished&quot;: &quot;2020-08-25T16:42:53.786Z&quot;,
  &quot;dateModified&quot;: &quot;2020-08-25T16:42:53.786Z&quot;
&#125;</code>`}</pre>
<p>The <code>@context</code> key clues the robot in to the data definition we’re going to be using, which is the <code>schema.org</code> definitions. The <code>@type</code> tag associates the following data with the pre-defined structure. From there on it’s relevant data! <code>headline</code>, <code>datePublished</code> and <code>dateModified</code> are all directly pulled from the content itself. In out case our data looks like this:</p>
<pre class="language-undefined">{@html `<code class="language-undefined">&#123;
  &quot;@context&quot;: &quot;https://schema.org&quot;,
  &quot;@type&quot;: &quot;Article&quot;,
  &quot;headline&quot;: &quot;Fun With JSON-LD&quot;,
  &quot;datePublished&quot;: &quot;2020-08-12T08:00:00+08:00&quot;,
  &quot;dateModified&quot;: &quot;2020-08-12T08:00:00+08:00&quot;
&#125;</code>`}</pre>
<p>Open question: <code>BlogPosting</code> or <code>Article</code>? Im going to stick with <code>BlogPosting</code> since these texts are really just that. I would use <code>Article</code> if I was writing a news piece or a review, or something maybe more scholarly. </p>
<p>The last required field is an <code>image</code>:</p>
<blockquote>
<p>For best results, provide multiple high-resolution images (minimum of 300,000 pixels when multiplying width and height) with the following aspect ratios: 16x9, 4x3, and 1x1.</p>
</blockquote>
<pre class="language-undefined">{@html `<code class="language-undefined">&#123;
	…
  &quot;image&quot;: [
    &quot;https://example.com/photos/1x1/photo.jpg&quot;,
    &quot;https://example.com/photos/4x3/photo.jpg&quot;,
    &quot;https://example.com/photos/16x9/photo.jpg&quot;
  ]
&#125;</code>`}</pre>
<p>This means that creating thumbnails for every Article is important, and those images need to exist on the page in a way that user can see. </p>
<p>For this site, the main use of these images is going to be for sharing thumbnails. The fact that the image needs to be on the pages is interesting, since that really influences the design of the page. I’ve found that creating the necessity for a prominent thumbnail or hero image that accompanies each article is a recipe for a) not writing articles and b) bland stock photography. I want to avoid both. That means for this site I’m going to do illustrated images, small sketches and motif explorations that may or may not illustrate the article, and attach it to the <em>bottom</em> of the article.</p>
<p>There are two other sections I want to look at, even though they are not requirements according to Google. These are the <code>author</code> and the <code>publisher</code> fields. The goal of using these fields is to create an association between you and your work; or in the case of the <code>publisher</code> field between an imprint entity and the creative works they’ve published. In our use case for this site, my goal is to create a machine-readable entity that is ‘Nikolas Wise’ and attach my articles and my work to that, in order to create a coherent entity that is exposed to the broader web. </p>
<p>The <code>author</code> field is a <code>Person</code> or an <code>Organization</code>, the <code>publisher</code> field is an <code>Organization</code>. Lets start with <code>Person</code>:</p>
<blockquote>
<p>A person (alive, dead, undead, or fictional).
<a
  href="https://schema.org/Person"
  rel="nofollow"
>https://schema.org/Person</a></p>
</blockquote>
<p>It gets added to our LSON-LD like this:</p>
<pre class="language-undefined">{@html `<code class="language-undefined">&#123;
	…
  &quot;author&quot;: &#123;
	  &quot;@type&quot;: &quot;Person&quot;,
	  …
  &#125;
&#125;</code>`}</pre>
<p>There are a lot of properties in this schema, like <code>deathPlace</code> and <code>knows</code>. One could really get into this and make it a very robust and complete data object, but I’m not sure how much value that would bring at the end of the day. There’s a fine line between following specs and best practices to achieve a goal and ticking boxes to structure our lives solely in order to make them legible to the algorithm. I guess we each decide where that line is for ourselves.</p>
<p>For me, I’m going to stick with <code>name</code>, <code>url</code>, <code>image</code>, <code>jobTitle</code>, <code>knowsLanguage</code>, and <code>sameAs</code>. Although <code>publishingPrinciples</code> seems interesting, and I might write one of those. </p>
<p>Most of the fields are simple text strings, and can get filled out like so:</p>
<pre class="language-undefined">{@html `<code class="language-undefined">&#123;
	…
  &quot;author&quot;: &#123;
	  &quot;@type&quot;: &quot;Person&quot;,
		&quot;name&quot;: &quot;Nikolas Wise&quot;,
		&quot;url&quot;: &quot;https://nikolas.ws&quot;,
		&quot;image&quot;: &quot;https://photos.smugmug.com/Portraits/i-ThnJCF5/0/f9013fdc/X4/wise-X4.jpg&quot;,
		&quot;jobTitle&quot;: &quot;Web Developer&quot;,
		&quot;knowsLanguage&quot;: &quot;en, fr&quot;,
		&quot;sameAs&quot;: …,
  &#125;
&#125;</code>`}</pre>
<p>The language codes are from the <a
  href="https://tools.ietf.org/html/bcp47"
  rel="nofollow"
>language code spec</a>, and could also be <a
  href="https://schema.org/Language"
  rel="nofollow"
>language</a> schema objects. The job title could be a <a
  href="https://schema.org/DefinedTerm"
  rel="nofollow"
>Defined Term</a> schema object. </p>
<p>The <code>sameAs</code> key is an interesting one, it’s either a URL or an array of URLs that connect this <code>@person</code> with other parts of the web that are <em>also</em> that <code>@person</code>. </p>
<pre class="language-undefined">{@html `<code class="language-undefined">&#123;
	…
  &quot;@person&quot;: &#123;
	  …
		&quot;sameAs&quot;: [
			&quot;https://twitter.com/nikolaswise&quot;,
			&quot;https://github.com/nikolaswise&quot;,
			&quot;https://www.instagram.com/nikolaswise/&quot;,
			&quot;https://www.linkedin.com/in/nikolas-wise-6b170265/&quot;,
		],
  &#125;
&#125;</code>`}</pre>
<p>This will connect “me” with this site and my twitter, github, instagram, and linkedin profiles. Those are the pages that I want to the algorithm to associate with “me”.</p>
<p><code>@organization</code> is similar to <code>@person</code> in a lot of ways, and the fundamental idea is the same. The goal is to create a single entity that the algorithm can connect disparate pages and items too. I’m not going to set of an <code>@organization</code> here, but the the <a href="https://schema.org/Organization" rel="nofollow"><code>@organization</code> schema type</a> has the spec for the object. </p>
<p>So that’s it! That means the entire JSON-LD for this article – and therefor the rest of the texts as well, looks like this:</p>
<pre class="language-undefined">{@html `<code class="language-undefined">&lt;script type=&quot;application/ld+json&quot;&gt;
	&#123;
	  &quot;@context&quot;: &quot;https://schema.org&quot;,
	  &quot;@type&quot;: &quot;Article&quot;,
	  &quot;headline&quot;: &quot;Article headline&quot;,
	  &quot;datePublished&quot;: &quot;2020-08-25T16:42:53.786Z&quot;,
	  &quot;dateModified&quot;: &quot;2020-08-25T16:42:53.786Z&quot;,
	  &quot;image&quot;: [
	    &quot;https://example.com/photos/1x1/photo.jpg&quot;,
	    &quot;https://example.com/photos/4x3/photo.jpg&quot;,
	    &quot;https://example.com/photos/16x9/photo.jpg&quot;
	  ],
	  &quot;author&quot;: &#123;
		  &quot;@type&quot;: &quot;Person&quot;,
			&quot;name&quot;: &quot;Nikolas Wise&quot;,
			&quot;url&quot;: &quot;https://nikolas.ws&quot;,
			&quot;image&quot;: &quot;https://photos.smugmug.com/Portraits/i-ThnJCF5/0/f9013fdc/X4/wise-X4.jpg&quot;,
			&quot;jobTitle&quot;: &quot;Web Developer&quot;,
			&quot;knowsLanguage&quot;: &quot;en, fr&quot;,
			&quot;sameAs&quot;: [
				&quot;https://twitter.com/nikolaswise&quot;,
				&quot;https://github.com/nikolaswise&quot;,
				&quot;https://www.instagram.com/nikolaswise/&quot;,
				&quot;https://www.linkedin.com/in/nikolas-wise-6b170265/&quot;,
			],
	  &#125;
	&#125;
&lt;/script&gt;</code>`}</pre>
