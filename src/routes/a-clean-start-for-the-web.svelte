<script context="module">
	export const metadata = {"title":"A Clean Start for the Web","slug":"a-clean-start-for-the-web","thesis":"How do we make the web fun, participatory, and good?","source":"https://macwright.com/2020/08/22/clean-starts-for-the-web.html","author":"Tom Macwright","year":2020,"tags":"internet, web","type":"annotation, bibliography"};
	const { title, slug, thesis, source, author, year, tags, type } = metadata;
</script>

<blockquote>
<p>The web’s evolution over the last decade has mirrored the American economy. All of the essential indicators are going “up and to the right,” a steady stream of fundamental advances reassure use that there “is progress,” but the actual experience and effects for individuals stagnates or regresses.</p>
</blockquote>
<p>tmcw is approaching the contemporary problem of technical debt, the result when our system is so complex and fucked that it’s starting to collapse and there’s nothing we can do about.</p>
<blockquote>
<p>The platform side is what changed last week, when Mozilla laid off 250 employees and indicated that it would affect Firefox development … The real winner is not just Chrome, but Chrome’s engine. One codebase, KHTML, split into WebKit (Safari), and Blink (Chrome, Microsoft Edge, Opera, etc.)</p>
</blockquote>
<blockquote>
<p>This a textbook monoculture. In one sense, it’s a victory for collaboration because nobody’s ‘wasting time’ on competing implementations and web developers can expect the same features and bugs across different browsers. But in a deeper way, it threatens one of the basic principles of how the web has evolved.</p>
</blockquote>
<p>Tmcw identifies that our browsers our now a monoculture, which is an interesting problem to have because 1) there are some clear indications that a monoculture by technical behemoths is <em>bad</em> but it’s only an interesting because 2) browsers should just be all implementing the spec anyway. The <em>spec</em> is an interesting problem, since <em>it also</em> is just a monoculture dominated by technical behemoths. </p>
<blockquote>
<p>Organizations like the WHATWG, W3C, and IETF have been collaboration spaces for independent developers, corporations, and academics to discuss potential new features of the web.</p>
</blockquote>
<p>At least the spec pretends or tries to be open and community oriented. </p>
<blockquote>
<p> Chrome has been moving extremely fast, adding new specifications and ideas at a startling rate, and it’s becoming one of the hardest pieces of software to replicate.</p>
</blockquote>
<p>The problem is that Google dominates the spec, and is gaining monopoly on the <em>spec</em>. </p>
<blockquote>
<p>Not only is it nearly impossible to build a new browser from scratch, once you have one the ongoing cost of keeping up with standards requires a full team of experts. </p>
</blockquote>
<p>This is probably the point and the goal of the hostile takeover of the spec. The creation of a platform that becomes a monopoly on a market is a hallmark tech company business model.</p>
<blockquote>
<p>The web has had about 25 years to grow, few opportunities to shrink, and is now surrounded by an extremely short-sighted culture that is an outgrowth of economic and career short-termism.</p>
</blockquote>
<p>Haha, Im not sure I have any insight here but its funny</p>
<blockquote>
<p>For folks who just want to create a web page, who don’t want to enter an industry, there’s a baffling array of techniques, but all the simplest, probably-best ones are stigmatized. It’s easier to stumble into building your resume in React with GraphQL than it is to type some HTML in Notepad.</p>
</blockquote>
<p>Tmcw identifies that there is a problem for creators in that making web shit is outlandishly difficult.</p>
<blockquote>
<p>The end result is that I no longer expect pages to be fast, even with uBlock installed in Firefox and a good local fiber internet provider.</p>
</blockquote>
<p>Tmcw indentifies that there is a problem for consumers in that    our technical debt has resulted in a horrible experience. </p>
<blockquote>
<p>I don’t want to lay all of the blame at those web developers … Segment offered a big page of on/off switches with hundreds of data providers & ad-tech companies on it. And, sure, enough, some folks closer to the business side started clicking all those buttons.</p>
</blockquote>
<p>This is an interesting way of throwing the business team under the bus for making choices that are obvious to them and removing our own culpability in building these systems. </p>
<blockquote>
<p>How do we make the web fun, participatory, and good?</p>
</blockquote>
<p>There is Tmcw’s thesis: which obviously has a ton of value judgment wrapped up in it. </p>
<blockquote>
<p> the current web which has basically thrown away semantic HTML as an idea.</p>
</blockquote>
<p>Is that true or is that just a dig at the current dominant process and system?</p>
<blockquote>
<p>Then there’s the “application web”. This started as server applications…</p>
</blockquote>
<p>We’ve seen Tmcw dig at the front-end space before.</p>
<blockquote>
<p>The problem is that the “document web” is often plagued by application characteristics - it’s the JavaScript and animations and complexity that makes your average newspaper website an unmitigated disaster. Where document websites adopt application patterns they often accidentally sacrifice accessibility, performance, and machine readability.</p>
</blockquote>
<p>I feel this is classic Tmcw “get off my lawn” crankiness. Rich Harris addresses this: <code>It's a spectrum, and the interesting stuff happens in the middle. There's magic in that grey area. I still believe the web has the potential to be a fundamentally more expressive medium than its predecessors (http://worrydream.com/MediaForThinkingTheUnthinkable/ is on a similar wavelength to that notion)</code> </p>
<blockquote>
<p>The application web uses JSX, not HTML, and would like that in the browser itself, or Svelte, instead of JavaScript, and would like that too.</p>
</blockquote>
<p>Haha our boy is coming for Rich! I’m not I understand what the dig here is … he’s mad at a language that has a compile step? Isn’t that what like … most applications use? Rust, C, whatever, they all compile down to a native runtime language. </p>
<blockquote>
<p>When I read blog posts from ‘traditional web developers’ who are mad that HTML & CSS aren’t enough anymore and that everything is complicated – I think this is largely that the application stack for building websites has replaced the document stack in a lot of places.</p>
</blockquote>
<p>I mean, that’s a decent point. The problem is that we’ve created a disconnect between what we want to build, why we won’t to build it, and how we build it. We use insane toolchains to solve simple problems, and not all tools are for the same thing. </p>
<blockquote>
<p>The appeal of social networks is partly because they let us create documents without thinking about web technology, and they provide guarantees around performance, accessibility, and polish that otherwise would take up our time.</p>
</blockquote>
<p>This seems like a decent point well made. Those of us who want to reduce tech behemoth monoculture absolutely need to reckon with the real value that social networks offer to users. </p>
<blockquote>
<p>standards like RSS and services like Instapaper show that pleasing formatting and distribution can be done at the platform level and be provided on top of existing vanilla websites.</p>
</blockquote>
<p>Thats a decent proof of concept the problem, as illustrated above, is around the tools and systems we’ve built for ourselves to make things “easier”.</p>
<blockquote>
<p>Okay, so let’s say we’re creating a new document web … First, you need a minimal, standardized markup language for sending documents around. … Then, you need a browser … Could you build a pure-Markdown-browsing browser that goes straight through this pipeline? Maybe?</p>
</blockquote>
<p>This is a pretty interesting idea, but sounds like it’s absolutely a subset of the current system which is railed against above. Maybe the idea is that it can grow independently  <em>from</em> being a subset <em>to</em> being something more. </p>
<blockquote>
<p>The problem with imagining the application web is that it’s pretty expansive.</p>
</blockquote>
<p>Yeah no shit tmcw. Im not sure how any of this gets around the problem outlined above: hostile takeover of a public spec by private tech behemoths. </p>
<blockquote>
<p>The worse the ‘Mac App Store’ and ‘Windows App Store’ and ’App Store’ and ’Play Store’ get, the bigger a cut those monopolies demand, the more it costs to be a Mac or Windows developer, the more that applications get pushed to the web. Sure, some applications are better on the web. But a lot are just there because it’s the only place left where you can easily, cheaply, and freely share or sell a product.</p>
</blockquote>
<p>Creating an “App Web” could so easily just colonize that space with those same models of monoculture. </p>
<blockquote>
<p>There are a lot of other ways to look at and solve this problem. I think it is a problem, for everyone except Google.</p>
</blockquote>
<p>Right, this is the goal for Google. And creating a new set of specs is not going to <em>solve</em> that problem, because that problem is a reflection of our current society and what we value and how we work. </p>
<blockquote>
<p>The idea of a web browser being something we can comprehend, of a web page being something that more people can make, feels exciting to me.</p>
</blockquote>
<p>This is a good goal, and I endorse it! Our medium tho is that of the technical monoculture, the baked in assumptions that a small group has used to create this new world. The issue is with the hardware and the physical things and the human society that surrounds and makes those things possible. </p>
<blockquote>
<p>What if we could start over?</p>
</blockquote>
<p>Tmcw is calling for a revolution of the web without being so explicit about it. The idea he is presenting is that there needs to be a messy, democratic, socialist approach to our <em>specs</em> that create more room for the individual, and that in empowering the individual with rights also creates a number of responsibilities to the society that they must uphold. This is a socialist argument for the web, and I wholly agree with it. I think that he needs to be explicit about what he’s actually calling for and imagine what the real world repercussions of the position would be, and how we need to make the same call of our society for the same ends. </p>
