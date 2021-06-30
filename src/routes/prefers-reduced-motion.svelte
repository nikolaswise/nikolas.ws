<script context="module">
	export const metadata = {"title":"prefers-reduced-motion; Taking a no-motion-first approach to animations","slug":"prefers-reduced-motion","source":"https://tatianamac.com/posts/prefers-reduced-motion/","author":"Tatiana Mac","year":2021,"tags":"internet, design, a11y, accessibility, css, development","thesis":"Use the prefers-reduced-motion media query to help guide your animation principles. By default, do not include animations, which should only be approached as a progressive enhancement.","type":"annotation, bibliography"};
	const { title, slug, source, author, year, tags, thesis, type } = metadata;
</script>
<script>
  import Introduction from '../components/Introduction.svelte'
</script>


<Introduction {metadata} />
<p>While animations can be quite powerful tools for communication relationships and building a brand, Mac notes that “Animations, especially when overused and abused, can make people very ill.”</p>
<p>Mac notes that in their practice, the guiding approach is to default to the users explicit preferences:</p>
<blockquote>
<p>A core accessibility approach of mine is to let the user determine what’s best for them and to enable as many user settings as I can. Most operating systems allow us to reduce the motion and have for a very long time.</p>
</blockquote>
<p>It’s hard to find argument with this. This is clearly a good principle. This article will focus on <code>prefers-reduced-motion</code>, but its worth taking a note here that there are others which should be explored and expanded on, perhaps a project for another day.</p>
<p>Mac leads with the two values for <code>prefers-reduced-motion</code> : <code>no-prefernce</code> and <code>reduced</code>. Importantly, Mac notes:</p>
<blockquote>
<p>I want to make a critical note here that this is operating on a no-consent model. Ew. The user hasn’t necessarily opted into animations. They just haven’t checked “Reduce motion.” That could be because they like and can tolerate animations, or, it’s equally possible the user doesn’t know about this setting. So, I want us to make sure we’re not assuming that these users necessarily want animations.</p>
</blockquote>
<p>Mac cuts through what could easily be bad assumptions at the beginning of a project. Thinking carefully about what our starting assumptions — our front end axioms if you will — <em>actually are and are not</em> is of critical importance. </p>
<blockquote>
<p>Start with No Motion … When I collaborate with a designer/animator on an animation, I first ask, “Is this animation critical to understanding the content?” … More often than not, the answer is “no.” … When conceived well, animations should be an enhancement to an explanation.</p>
</blockquote>
<p>Mac will then default to <code>animation: none</code>, removing all animation entirely. Therefor, following the <code>first</code> methodology, we only <em>add</em> animation if the user settings are explicit about <code>no-preference</code>. Mac notes that the <code>first</code> methodology means that for older browsers without support for the media query, we default to the <em>more accessible</em> option. This is related to <a
  href="/bibliography/pickering/is-progressive-enhancement-dead-yet"
>Pickering’s explanation of Progressive Enhancement.</a>.</p>
<p>Mac than notes that we can remove <em>all</em> the animations from the base style sheet bundle, and only serve them <em>if the user has <code>no-preference</code> set</em></p>
<pre class="language-undefined">{@html `<code class="language-undefined">&lt;link
  rel=&quot;stylesheet&quot;
  href=&quot;animations.css&quot;
  media=&quot;(prefers-reduced-motion: no-preference)&quot;
/&gt;</code>`}</pre>
<p>This is rather clever, because it creates an argument from performance for following a principle for accessibility. </p>
<p>Mac then fleshes out a scenario where the designer has determined that the animation is in fact <em>critical</em> to the interaction. My favorite question to ask in this case (and Mac’s “spiciest” is their direct and to the point “If the animation can’t load for someone or they can’t see it, what was your plan?“.</p>
<p>Mac than moves to exploring other, non-css based animations:</p>
<ul>
<li>Auto-playing video: Don’t do it. Just, don’t do it.</li>
<li>JavaScript animations: find a way to respect the setting, those tools are there. My take: don’t do it.</li>
</ul>
<p>Mac ends the article with their own references. </p>
<p>I particularly like and am compelled by Mac’s argument that “by default we should do the most accessible thing” which is very close to my own principle of “do as little as possible” or “keep it stupid simple”, as well as Mac’s commitment to knowing what the user settings are and respecting <em>all of them</em>. I for one have more to learn in this regard.</p>
