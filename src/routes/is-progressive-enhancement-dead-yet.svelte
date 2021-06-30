<script context="module">
	export const metadata = {"title":"Is Progressive Enhancement Dead Yet?","slug":"is-progressive-enhancement-dead-yet","author":"Heydon Pickering","year":2021,"source":"https://briefs.video/videos/is-progressive-enhancement-dead-yet/","tags":"design, development, javascript, js","thesis":"Progressively enhancing web applications is not only an essential practice for accessibility, but it provides a framework to respect separation of concerns in technology _and_ reduce boilerplate, polyfills, and otherwise kludgy code.","type":"annotation, bibliography"};
	const { title, slug, author, year, source, tags, thesis, type } = metadata;
</script>
<script>
  import Introduction from '../components/Introduction.svelte'
</script>


<Introduction {metadata} />
<p>Pickering wants to talk about Progressive Enhancement, but apparently a lot of people are over it and want to be done with it. Pickering thinks that putting progressive enhancement to bed – and worrying about it no more would be a “grave” mistake. </p>
<p>Pickering addresses some common misconceptions. </p>
<p>Progressive Enhancement is Not:</p>
<ul>
<li>Something you install using a package manager.</li>
<li>Progressive enhancement is not a <code>&lt;noscript&gt;</code> tag with the text “Please turn on Javascript”.</li>
<li>Progressive enhancement is not rendering HTML on the server, then having the browser re-render that HTML via hydration (<em>React</em>)</li>
</ul>
<p>Pickering uses an metaphor of the skateboard to explain what progressive enhancement <em>is</em>.</p>
<blockquote>
<p>Imagine two skateboards. One is the old fashioned kind, it’s just a board with wheels. The other has a screw hole near the front, allowing you to attach some handlebars and make the skateboard a scooter. Just because the handlebars don’t attach to the older skateboard doesn’t mean it’s broken. It still works as a skateboard. </p>
</blockquote>
<p>In Pickerings example, the handlebars are a feature that the browser may or may not support. Importantly, if there is no support for the feature, things <em>still work fine.</em> Great emphasis is placed on this point.</p>
<blockquote>
<p>The basic layout is not a broken layout.</p>
</blockquote>
<p>Here’s a provide example of a progressively enhanced masonry layout:</p>
<pre class="language-undefined">{@html `<code class="language-undefined">.grid &#123;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
&#125;

@supports (grid-template-rows: masonry) &#123;
	.grid &#123;
		.grid-template-rows: masonry;
	&#125;
&#125;</code>`}</pre>
<p>If a browser supports <code>@supports</code> and <code>grid-template-rows:masonry</code>, the layout engine applied the layout. The key here is that out layout tools are handling out layout, and Javascript is not relied on <em>at all</em> for functions that Javascript is not intended for. </p>
<p>Another example, using <a
  href="https://github.com/Heydon/watched-box"
  rel="nofollow"
><watched-box></a> is provided:</p>
<pre class="language-undefined">{@html `<code class="language-undefined">// use web component
&lt;watched-box
	widthBreaks=&quot;320px, 60ch&quot;
	heightBreaks=&quot;100vh, 2014px&quot; 
/&gt;
	&lt;!-- children --&gt;
&lt;/watched-box&gt;

// progressive enhancement logic 
if (&#39;ResizeObserver&#39; in window &amp;&amp; &#39;customElements&#39; in window) &#123;
	customElemeents.define(&#39;watched-box&#39;, WatchedBox);
&#125;	

// load custom element as module
&lt;script type=&quot;module&quot; src=&quot;watched-box.js&quot;&gt;&lt;/script</code>`}</pre>
<p>The module import self-selects for modern browsers, the custom element code itself checks for browser feature support, and if none of these things exist the children of the <code>&lt;watched-box&gt;</code> tag render normally.</p>
<p>Another example of conditionally importing Javascript:</p>
<pre class="language-undefined">{@html `<code class="language-undefined">// ignored by old browsers, used by modern browsers
&lt;script type=&quot;module&quot; serc=&quot;new.js&quot;&gt;&lt;/script&gt;


// ignored by modern browsers, used by old browsers
&lt;script nomodule src=&quot;old.js&quot;&gt;&lt;/script&gt;</code>`}</pre>
<p>This is all predicated on respecting the separation of concerns for HTML, CSS, and JS, and it’s important that we don’t do thing in JS that could and should be done with CSS. </p>
<p>Pickering closes with a counter-example of regressive enhancement with a tab pattern. This pattern is better handled in a traditional HTML structure, as adding large amount of Javascript to collapse the pattern into tabs create both an accessibility and user experience nightmare that can be hugely difficult to untangle. Pickering identified the important of letting the browser technologies do their thing. </p>
<p>The final note is as follows:</p>
<blockquote>
<p>Use Javascript to do Javascript things. And not Javascript to do like … not Javascript things. </p>
</blockquote>
