<script context="module">
	export const metadata = {"title":"The Cost of Javascript Frameworks","slug":"the-cost-of-javascript-frameworks","author":"Tim Kadlec","year":2020,"source":"https://timkadlec.com/remembers/2020-04-21-the-cost-of-javascript-frameworks/","thesis":"Javascript inherently is a massive percentage of a performance budget, modern frameworks are less performant than vanilla JS sites.","tags":"front end, javascript, performance","type":"annotation, bibliography"};
	const { title, slug, author, year, source, thesis, tags, type } = metadata;
</script>
<script>
  import Introduction from '../components/Introduction.svelte'
</script>


<Introduction {metadata} />
<p>Kadlec’s thesis is that Javascript inherently is a massive percentage of a performance budget. From this perspective, he identifies the purpose of frameworks as:</p>
<blockquote>
<p>a framework makes it easier to perform well by either providing a better starting point or providing constraints and characteristics that make it hard to build something that doesn’t perform well.</p>
</blockquote>
<p>From Kadlex:</p>
<h2>JavaScript Bytes Served to Mobile Devices, by Percentile</h2>
<table>
<thead>
<tr>
<th align="left"></th>
<th align="left">10th</th>
<th align="left">25th</th>
<th align="left">50th</th>
<th align="left">75th</th>
<th align="left">90th</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">All Sites</td>
<td align="left">93.4kb</td>
<td align="left">196.6kb</td>
<td align="left">413.5kb</td>
<td align="left">746.8kb</td>
<td align="left">1,201.6kb</td>
</tr>
<tr>
<td align="left">w/ jQuery</td>
<td align="left">110.3kb</td>
<td align="left">219.8kb</td>
<td align="left">430.4kb</td>
<td align="left">748.6kb</td>
<td align="left">1,162.3kb</td>
</tr>
<tr>
<td align="left">w/ Vue.js</td>
<td align="left">244.7kb</td>
<td align="left">409.3kb</td>
<td align="left">692.1kb</td>
<td align="left">1,065.5kb</td>
<td align="left">1,570.7kb</td>
</tr>
<tr>
<td align="left">w/ Angular</td>
<td align="left">445.1kb</td>
<td align="left">675.6kb</td>
<td align="left">1,066.4kb</td>
<td align="left">1,761.5kb</td>
<td align="left">2,893.2kb</td>
</tr>
<tr>
<td align="left">w/ React</td>
<td align="left">345.8kb</td>
<td align="left">441.6kb</td>
<td align="left">690.3kb</td>
<td align="left">1,238.5kb</td>
<td align="left">1,893.6kb</td>
</tr>
</tbody>
</table>
<h2>Scripting related CPU time (in milliseconds) for mobile devices, in percentiles</h2>
<table>
<thead>
<tr>
<th align="left"></th>
<th align="left">10th</th>
<th align="left">25th</th>
<th align="left">50th</th>
<th align="left">75th</th>
<th align="left">90th</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">All Sites</td>
<td align="left">356.4ms</td>
<td align="left">959.7ms</td>
<td align="left">2,372.1ms</td>
<td align="left">5,367.3ms</td>
<td align="left">10,485.8ms</td>
</tr>
<tr>
<td align="left">w/ jQuery</td>
<td align="left">575.3ms</td>
<td align="left">1,147.4ms</td>
<td align="left">2,555.9ms</td>
<td align="left">5,511.0ms</td>
<td align="left">10,349.4ms</td>
</tr>
<tr>
<td align="left">w/ Vue.js</td>
<td align="left">1,130.0ms</td>
<td align="left">2,087.9ms</td>
<td align="left">4,100.4ms</td>
<td align="left">7,676.1ms</td>
<td align="left">12,849.4ms</td>
</tr>
<tr>
<td align="left">w/ Angular</td>
<td align="left">1,471.3ms</td>
<td align="left">2,380.1ms</td>
<td align="left">4,118.6ms</td>
<td align="left">7,450.8ms</td>
<td align="left">13,296.4ms</td>
</tr>
<tr>
<td align="left">w/ React</td>
<td align="left">2,700.1ms</td>
<td align="left">5,090.3ms</td>
<td align="left">9,287.6ms</td>
<td align="left">14,509.6ms</td>
<td align="left">20,813.3ms</td>
</tr>
</tbody>
</table>
<p>The takeaway is that modern frameworks, when deploying in a best-in-class manner, can be as lightweight as an average framworkless website, but on average – and absolutely including worst case implementations – modern frameworks are incredibly bloated. In particular, Angular serves heavy pages, React serves slow pages.</p>
<p>From observing the data between sites that detect React <em>at all</em> and sites that only detect React (as in, for sure no jQuery) Kadlec observes that main thread performance drops significantly. This is a clear indication that migrating from jQuery to React harms main thread performance.</p>
<blockquote>
<p>If you have React and jQuery running alongside each other, you’re more likely to be in the midst of a migration to React, or a mixed codebase. Since we have already seen that sites with jQuery spend less time on the main thread than sites with React, it makes sense that having some functionality still driven by jQuery would bring the numbers down a bit.</p>
</blockquote>
<p>Additionally, Kadlec observes that mobile devices suffer from this performance decrease more than desktop devices. This suggests that modern frameworks explicitly are avoiding a mobile-first mentality, and relying on contemporary hardware.</p>
<p>To wrap up, Kadlec suggests that this data isn’t indicative of the baseline performance capabilities of a framework, but rather indicates that the <em>implementation</em> is at fault. If in general the implementation of a framework is causing performance issues, that the primary fault is in the ecosystem, documentation, and community standards around that framework.</p>
