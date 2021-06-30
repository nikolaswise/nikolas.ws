<script context="module">
	export const metadata = {"title":"Building a Client Library for ArcGIS","slug":"building-a-client-library","date":"2015.3.09","description":"Writing a wrapper client library to smooth out design weirdness at the API level leads to plenty of design thinking on the way things should be.","type":"text, texts"};
	const { title, slug, date, description, type } = metadata;
</script>

<p>This year I built a JavaScript wrapper for Node and the Browser around the ArcGIS REST API to simplify working with that platform as a developer. This was as an exercise in API design, as well as making a tool that I wanted to use but didn’t exist yet. The project is a bare-bones library to ease interactions with the ArcGIS REST API in JavaScript and Node apps.</p>
<p>Sometimes – and for sure in this case – an API can be rough, built over time, and not provide the sort of logical models that work well with specific language environments. This was the case with the ArcGIS REST API that I was running in to. A lot of the decisions had been made over the course of years, and didn’t translate very smoothly a language as young as Node.js.</p>
<p>The first step was to figure out what problems I wanted to solve. A lot of my work with Esri PDX has been about content handling, and so this is where I started. Reading <em>all</em> the doc to get a big picture of what’s going on with the API, and talk to everyone who’s done work like this before to figure out what problems <em>they</em> needed to solve was the first step. From there I felt I had enough context and information to make the thing useful for more people than just me, and make sure that it was coherent with the underlying goals of the original API.</p>
<p>This project works to simplify and unify the gap between the ArcGIS REST API and a contemporary Node application. This library is a UI in the most basic sense of the term — it provides an interface between the developer and the servers. That interface needs to be well designed and thoughtful in order to make the process as smooth, intuitive, and pleasurable as possible.</p>
<p>One of the most important parts of the project is to provide developers with a way to access the ArcGIS platform without needing to architect their entire application around opinionated frameworks (like Dojo, for example). Though the library itself is written in ES6, it’s distributed as plain, normal ES5 – both as a node package and a packaged bundle. This means it works both in Node and the browser, and has very few opinions on how it integrates with the rest of your app.</p>
<p>Right now, the library wraps most of the basic platform content management and interactions - getting and editing users, organizations, and items. The Node ArcGIS Client Library is an open source project — so it’s scope will increase as the community works to accomplish more goals and workflows.</p>
<h2>Setting up the client</h2>
<p>The first step in using the library is initializing the client with your target portal.</p>
<pre class="language-undefined">{@html `<code class="language-undefined">var ArcGIS = require(&#39;arcgis&#39;)
var arcgis = ArcGIS()</code>`}</pre>
<p>This sets up a default object for interacting with the API. This default is going to talk to ArcGIS Online as an anonymous, unauthenticated user. One can authenticate this client session as a named user by passing in a user token obtained from a successful OAuth login process.</p>
<pre class="language-undefined">{@html `<code class="language-undefined">var arcgis = Arcgis(&#123;
  token: namedUserToken
&#125;)</code>`}</pre>
<p>This isn’t exclusive to ArcGIS Online. The API for interacting with your organization’s installation of Portal or Server is the same. Setting up the client session with your instance is done by specifying your API domain.</p>
<pre class="language-undefined">{@html `<code class="language-undefined">var arcgis = Arcgis(&#123;
  domain: &#39;ago.my-server.com&#39;,
  token: namedUserToken
&#125;)</code>`}</pre>
<p>Beyond the initialization of the client, the library is exclusively async. All the functions return promises by default.</p>
<pre class="language-undefined">{@html `<code class="language-undefined">function log (m) &#123;
  console.log(m)
&#125;
function ohNo (err) &#123;
  return new Error(err)
&#125;
arcgis.request()
.then(log)
.catch(ohNo)</code>`}</pre>
<p>You can also pass in a node-style callback, if you’d prefer.</p>
<pre class="language-undefined">{@html `<code class="language-undefined">function log (err, results) &#123;
  if (err) &#123;
    return new Error(err)
  &#125; else &#123;
    console.log(results)
  &#125;
&#125;
arcgis.request(&#123;&#125;, log)</code>`}</pre>
<p>Both methods work just as well, and use all the same business logic. I like promises, but maybe you don’t. This is one of the main reasons the library does its best to avoid inflicting my opinions on your codebase.</p>
<p>Once we have an authenticated session, we can do all sorts of stuff — like figure out who we are:</p>
<pre class="language-undefined">{@html `<code class="language-undefined">function hello (user) &#123;
  console.log(&#39;Hello, &#39; + user.firstName)
&#125;
arcgis.user(&#39;NikolasWise&#39;).then(hello)</code>`}</pre>
<p>We can get all of the items that user has in the platform:</p>
<pre class="language-undefined">{@html `<code class="language-undefined">function getContent (user) &#123;
  return user.content()
&#125;
function logContent (content) &#123;
  console.log(content)
&#125;
arcgis.user(&#39;NikolasWise&#39;)
.then(getContent)
.then(logContent)</code>`}</pre>
<p>Or a list of all the groups that a user is a member of.</p>
<pre class="language-undefined">{@html `<code class="language-undefined">function logGroups (item) &#123;
  item.groups.forEach(function (group) &#123;
    console.log(group.title)
  &#125;)
&#125;
arcgis.user(&#39;NikolasWise&#39;).then(logGroups)</code>`}</pre>
<p>The library also can interact with the user’s organization, returning information, members, or all the content associated with the organization.</p>
<pre class="language-undefined">{@html `<code class="language-undefined">function logOrg (org) &#123;
  console.log(org)
&#125;
arcgis.organization(&#39;esripdx&#39;).then(logOrg)</code>`}</pre>
<p>The organization call defaults to ‘self’ — whatever organization the current user is a member of.</p>
<pre class="language-undefined">{@html `<code class="language-undefined">function getMembers (org) &#123;
  return org.members()
&#125;
function log (members) &#123;
  console.log(members)
&#125;
arcgis.organization().then(getMembers).then(log)</code>`}</pre>
<p>Many of the content calls are abstractions or helper methods for longer, more complicated calls to the <code>search</code> endpoint.</p>
<pre class="language-undefined">{@html `<code class="language-undefined">function getContent (org) &#123;
  return org.content()
&#125;
function log (items) &#123;
  console.log(items)
&#125;
arcgis.organization().then(getContent).then(log)</code>`}</pre>
<p>In this way we are able to create a transitional layer between the API itself (a super complicated call to the search endpoint) and what application developers need (all my organization’s content).</p>
<h2>Working with content</h2>
<p>Platform content is the weakest link in the library as of today. ArcGIS supports a huge range of item types, and quite a number of sophisticated things you can do with those item types. For now the basics are more or less in place — like getting an item’s details:</p>
<pre class="language-undefined">{@html `<code class="language-undefined">var layerID = &#39;a5e5e5ac3cfc44dfa8e90b92cd7289fb&#39;
function logItem (item) &#123;
  console.log(item)
&#125;
arcgis.item(layerID).then(logItem)</code>`}</pre>
<p>Or updating the those details and editing the permissions:</p>
<pre class="language-undefined">{@html `<code class="language-undefined">var layerId = &#39;a5e5e5ac3cfc44dfa8e90b92cd7289fb&#39;
function updateItem (item) &#123;
  return item.update(&#123;
    snippet: &#39;Building footprints in my neighborhood in Portland, Oregon&#39;
  &#125;)
&#125;
function shareItem (item) &#123;
  console.log(item)
  return item.permissions(&#123;
    access: &#39;public&#39;
  &#125;)
&#125;
arcgis.item(layerId)
.then(updateItem)
.then(shareItem)</code>`}</pre>
<p>So far, there’s some support for item-type-specific methods that are starting to open up the possibilities of manipulating your content from Node — like getting all the data in a layer.</p>
<pre class="language-undefined">{@html `<code class="language-undefined">var layerID = &#39;a5e5e5ac3cfc44dfa8e90b92cd7289fb&#39;
function getData (item) &#123;
  return item.data()
&#125;
function logData (data) &#123;
  console.log(data)
&#125;
arcgis.item(layerId)
.then(getData)
.then(logData)</code>`}</pre>
<p>There is a lot more of the platform that we could cover than this - services, analysis, layer creation and tile publishing all are actions that this library or ones like it could cover.</p>
