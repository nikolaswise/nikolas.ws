<script context="module">
	export const metadata = {"title":"Getting Started with Web Workers","description":"Move intensive computational process off the main thread.","date":"2021.11.16","slug":"getting-started-with-web-workers","type":"text, texts","draft":true};
	const { title, description, date, slug, type, draft } = metadata;
</script>
<script>
  import Introduction from '../components/Introduction.svelte'
</script>


<Introduction {metadata} />
<h2>Notes:</h2>
<blockquote>
<p>Web Workers are a simple means for web content to run scripts in background threads. The worker thread can perform tasks without interfering with the user interface. In addition, they can perform I/O using XMLHttpRequest (although the responseXML and channel attributes are always null) or fetch (with no such restrictions). Once created, a worker can send messages to the JavaScript code that created it by posting messages to an event handler specified by that code (and vice versa). <a
  href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers"
  rel="nofollow"
>^mdn</a></p>
</blockquote>
<p>Workers are created with the <code>Worker()</code> constructor, which runs a named HS fuel that contains the code that will run in the worker. Workers had a runtime that is similar but a little different than our main JS thread – importantly they have access to <code>fetch</code> and <em>do not</em> have access to the <code>window</code> object. Instead of <code>window</code>, a worker global scope is accessed with <code>self</code>. </p>
<blockquote>
<p>Data is sent between workers and the main thread via a system of messages — both sides send their messages using the postMessage() method, and respond to messages via the onmessage event handler (the message is contained within the Message event’s data attribute.) The data is copied rather than shared. <a
  href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers"
  rel="nofollow"
>^mdn</a></p>
</blockquote>
<p>It looks like Workers can do two interesting things, spawn more workers and import scripts with <code>importScripts('foo.js')</code>. This means they can keep their own thread clear, and also multiple workers can share logical blocks of JS.</p>
<p>There are two types of workers: dedicated workers and shared workers. Dedicated workers are only accessible to the script which called it, meaning it can only post and receive messages from the window and instance that constructed it. Shared workers can be accessed from multiple windows or threads, tho each worker has to construct the worker like so: <code>var myWorker = new SharedWorker('worker.js');</code>. Shared workers have to explicitly communicate through an open port, while dedicated workers do this implicitly. Shared workers let different windows or tabs from the same app communicate with each other. </p>
<p>This doesn’t actually feel terribly complicated. Let’s look at some of the libraries that exist to abstract these workers and see what’s up. </p>
<p>Comlink says that it “Comlink makes WebWorkers enjoyable. Comlink is a tiny library (1.1kB), that removes the mental barrier of thinking about postMessage and hides the fact that you are working with workers.”<a
  href="https://github.com/GoogleChromeLabs/comlink"
  rel="nofollow"
>^comlink</a>. It wraps workers with a Class function that handles exposing ports and passing messages, and basically turns your Worker into a class instance with async methods that you can call and invoke from your main thread application. This is interesting and fine and all, but I don’t super love classes. Lets see what else is up.</p>
<p>Post-Me says “it is easy for a parent (for example the main app) and a child (for example a worker or an iframe) to expose methods and custom events to each other.”<a
  href="https://github.com/alesgenova/post-me"
  rel="nofollow"
>^post-me</a>. It still uses worker construction, but wraps the worker in a Messenger class. The messenger initiates a connection and then uses <code>remoteHandle.call</code> to call functions form the worker and handle them like Promises. Still seems more complicated that just using workers?</p>
<p>Threads.js lets you “Call workers transparently, await results. It’s never been easier.”<a
  href="https://threads.js.org/"
  rel="nofollow"
>^threads.js</a>. This looks like it actually brings something interesting to the table by creating a unified interface for both web-workers (off-thread processes in the browser) and node workers (off-thread process on a node server). That’s a value add! Tho if your main goal is to free up the main thread to render UI, node doesn’t exactly have that problem. Additionally, with a micro-service server less endpoint architecture any number of node calls can bring the same level of concurrency to the table, tho I guess with additional network request overhead. </p>
<p>Honestly the API for Threads.js looks really simple and nice:</p>
<pre class="language-undefined">{@html `<code class="language-undefined">// master.js
import &#123; spawn, Thread, Worker &#125; from &quot;threads&quot;

async function main() &#123;
  const auth = await spawn(new Worker(&quot;./workers/auth&quot;))
  const hashed = await auth.hashPassword(&quot;Super secret password&quot;, &quot;1234&quot;)

  console.log(&quot;Hashed password:&quot;, hashed)

  await Thread.terminate(auth)
&#125;

main().catch(console.error)</code>`}</pre>
<pre class="language-undefined">{@html `<code class="language-undefined">// workers/auth.js - will be run in worker thread
import sha256 from &quot;js-sha256&quot;
import &#123; expose &#125; from &quot;threads/worker&quot;

expose(&#123;
  hashPassword(password, salt) &#123;
    return sha256(password + salt)
  &#125;
&#125;)</code>`}</pre>
<p>It also allows you to create Observables with with you can stream data. So THAT seems cool, but maybe all this is pretty advanced stuff, for when an app outgrows native interactions with a web worker. So let’s not worry about that for now and just set up some basic workers. </p>
<p>It looks like the goal of all these libs is to work around the issue created by the opacity between <code>postMessage</code> and <code>onMessage</code> - it’s hard to differentiate between what message is associated with what response. What response is associated with what message? What does sending multiple messages do if they overlap? Lets find out!</p>
<h3>Creating a Web Worker</h3>
<p>In our main thread, we can create a small component that takes a number, sends to a worker which will calculate the factorial of that number, and update the output to the result. </p>
<pre class="language-undefined">{@html `<code class="language-undefined">&lt;form class=&quot;js-dedicated-worker-form&quot;&gt;
  &lt;label&gt;
    Calculate Factorial
    &lt;input type=&quot;number&quot; /&gt;
    &lt;button&gt;
      Get Factorial
    &lt;/button&gt;
  &lt;/label&gt;
&lt;/form&gt;
&lt;output class=&quot;js-dedicated-output&quot;&gt;&lt;/output&gt;</code>`}</pre>
<pre class="language-undefined">{@html `<code class="language-undefined">// script.js
// main thread
const dedicatedWorker = new Worker(&#39;factorial.js&#39;);

const dedicatedForm = document.querySelector(&quot;.js-dedicated-worker-form&quot;); 
const dedicatedOutout = document.querySelector(&quot;.js-dedicated-output&quot;)

const dedicatedSubmit = (e) =&gt; &#123;
  e.preventDefault()
  let int = Number(e.target[0].value)
  dedicatedOutout.innerHTML = &#39;Loading…&#39;
  
  dedicatedWorker.postMessage(int);
&#125;

dedicatedWorker.onmessage = function(e) &#123;
  console.log(&#39;Message received from worker&#39;);
  console.log(e.data)
  dedicatedOutout.innerHTML = e.data
&#125;

dedicatedForm.addEventListener(&#39;submit&#39;, dedicatedSubmit)</code>`}</pre>
<pre class="language-undefined">{@html `<code class="language-undefined">// factorial.js
// worker thread
const big_fast_factorial = (x) =&gt; &#123;
  let r = self.BigInt(1);
  for (let i = self.BigInt(2); i &lt;= x; i++)
    r = r * i;
  return r;
&#125;

onmessage = function(e) &#123;
  postMessage(big_fast_factorial(self.BigInt(e.data)));
&#125;</code>`}</pre>
<p>This will take the number from the form, send it to the factorial worker, which will calculate the factorial, return the result to the main thread, which will handle the UI and update the DOM. Best case scenario, as the main thread and DOM won’t lock up while the worker crunches an enormous factorial. </p>
<p>If we put the postMessage into a set timeout, we can simulate a very slow process and test race conditions. </p>
<p>In this case, we submit <code>1</code> and get the <code>loading…</code> indicator. We change the input to <code>2</code> and resubmit. Three seconds after the initial submit, out output reads <code>1</code>. Three seconds after the second submit, the output updates from <code>1</code> to <code>2</code>. </p>
<p>We can see the synchronous behavior of the thread in action if we remove the timeout and let the factorial crunch however it wants to. Let’s start by submitting <code>40,000</code>, which will take a while to crunch, and then immediately change the input to <code>1</code>, which will resolve almost immediately. The loading indicator will appear for however long it takes to calculate <code>40,000!</code>, then that result will flash in the output for as long as it takes to calculate <code>1!</code>, then the result for <code>1!</code> will appear in the output. This means we do not have race conditions with synchronous functions in the worker, and the messages will be treated on a first in first out basis. </p>
<p>What happens when we make an async function inside our worker? Can we convince the worker to return the first value we submit last, and wind up with a UI that displays the result of <code>1!</code> as some massive integer which is obviously not correct?</p>
<pre class="language-undefined">{@html `<code class="language-undefined">const big_fast_factorial = async (x) =&gt; &#123;
  let r = self.BigInt(1);
  for (let i = self.BigInt(2); i &lt;= x; i++)
    r = r * i;
  return r;
&#125;

onmessage = async (e) =&gt; &#123;
  var workerResult = await big_fast_factorial(self.BigInt(e.data))
  postMessage(workerResult);
&#125;</code>`}</pre>
<p>Apparently not! We wind up with an end state of <code>1! === 1</code>, which is correct. Not only that, but now it doesn’t even flash the enormous integer that is <code>40,000!</code>. This appears to be an improvement! However, it does still take the entire amount of time to calculate the result of <code>40,000!</code> before it can show us the result of <code>1!</code>. This indicates there is still <em>something</em> synchronous happening. A potential solution here would be to create a message system for canceling previous async functions, but the takeaway is that these workers can be used to product results that will be consistent with the UI that requested them. </p>
<p>If your dedicated worker doesn’t need to <em>really</em> care about what <em>called</em> it in the first place, than the out of the box architecture is perfect and will work great. If there needs to be some awareness, perhaps structuring your worker so that it returns the initial parameters it was called with would be useful:</p>
<pre class="language-undefined">{@html `<code class="language-undefined">onmessage = async (e) =&gt; &#123;
  var workerResult = await big_fast_factorial(self.BigInt(e.data))
  postMessage(&#123;
    i: e.data,
    o: workerResult
  &#125;);
&#125;</code>`}</pre>
<p>We can then do whatever needs doing with these associated inputs and outputs. Very neat!</p>
<h3>Shared Web Workers</h3>
<p>Shared Web Workers are interesting, but the fact the Safari <em>removed</em> support for them in 2015 and seems to have no interest in bringing them back, combined with the hoops you would have to jump through to polyfill them seems to make them impractical for most use cases. The only situation where they could be used is if falling back to a single dedicated worker instead of a shared worker still brings value to the table. This means they <em>shouldn’t</em> be used for messaging across instances of the app in separate windows. Im still thinking of some use cases where a dedicated worker would be fine, but a shared worker would be better. That said, I only spent one afternoon playing around with these, so if you think of good use case let me know. </p>
<p>If your thinking about using a shared web worker, some other tools to consider include:</p>
<p><strong><a
  href="https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API"
  rel="nofollow"
>BroadcastChannel</a>:</strong> Slightly support than Shared Workers, with indications that it’s coming to Safari soon. BroadcastChannel is specifically designed for messaging across instances of an application and cross-window communication. </p>
<p><strong><a
  href="https://developer.mozilla.org/en-US/docs/Web/API/WebSocket"
  rel="nofollow"
>WebSockets</a>:</strong> Used to open a persistent connection between a server and client and communocating events up or down.</p>
<p><strong><a
  href="https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API"
  rel="nofollow"
>WebRTC</a></strong>: WebRTC is used to open real-time connections between peers, instead of between clients and a server like a WebSocket. This allows for any number of clients to communicate directly with each other. Additionally, there seems to be interest in <a
  href="https://github.com/w3c/webrtc-extensions/issues/77"
  rel="nofollow"
>allowing WebRTC connection in Workers</a> which would be a very interesting thing indeed.</p>
<p>I’m not going to write <em>too</em> much about the ins and outs of implementing </p>
<p>Lets use a shared worker to create communication across tabs, creating a use case like band camp, where any instance of the app can share current information.</p>
<p><strong>Something is weird with caches and shared workers, the latest code updates in glitch don’t get loaded by other tabs. Who knows if this is a glitch thing or a worker thing.</strong></p>
<p>It looks like that shared workers don’t get requested over the wire quite the same way as dedicated workers. Instead, a shared worker loads <em>once</em> for the session, than any subsequent load pulls from whatever version is cached in the session. This means that development is tricky, since you need to close <em>all</em> open windows and re-open them between any edit to the file to ensure that all the windows are running the same, most recent, file.</p>
