---
title: Getting Started with Web Workers
description: Move intensive computational process off the main thread.
date: 2021.11.16
slug: getting-started-with-web-workers
type: text, texts
draft: true
---

<script>
  import Introduction from '../components/Introduction.svelte'
</script>

<Introduction {metadata} />


## Notes:

> Web Workers are a simple means for web content to run scripts in background threads. The worker thread can perform tasks without interfering with the user interface. In addition, they can perform I/O using XMLHttpRequest (although the responseXML and channel attributes are always null) or fetch (with no such restrictions). Once created, a worker can send messages to the JavaScript code that created it by posting messages to an event handler specified by that code (and vice versa). [^mdn]

Workers are created with the `Worker()` constructor, which runs a named HS fuel that contains the code that will run in the worker. Workers had a runtime that is similar but a little different than our main JS thread – importantly they have access to `fetch` and _do not_ have access to the `window` object. Instead of `window`, a worker global scope is accessed with `self`. 

> Data is sent between workers and the main thread via a system of messages — both sides send their messages using the postMessage() method, and respond to messages via the onmessage event handler (the message is contained within the Message event's data attribute.) The data is copied rather than shared. [^mdn]

It looks like Workers can do two interesting things, spawn more workers and import scripts with `importScripts('foo.js')`. This means they can keep their own thread clear, and also multiple workers can share logical blocks of JS.

There are two types of workers: dedicated workers and shared workers. Dedicated workers are only accessible to the script which called it, meaning it can only post and receive messages from the window and instance that constructed it. Shared workers can be accessed from multiple windows or threads, tho each worker has to construct the worker like so: `var myWorker = new SharedWorker('worker.js');`. Shared workers have to explicitly communicate through an open port, while dedicated workers do this implicitly. Shared workers let different windows or tabs from the same app communicate with each other. 

This doesn't actually feel terribly complicated. Let's look at some of the libraries that exist to abstract these workers and see what's up. 

Comlink says that it "Comlink makes WebWorkers enjoyable. Comlink is a tiny library (1.1kB), that removes the mental barrier of thinking about postMessage and hides the fact that you are working with workers."[^comlink]. It wraps workers with a Class function that handles exposing ports and passing messages, and basically turns your Worker into a class instance with async methods that you can call and invoke from your main thread application. This is interesting and fine and all, but I don't super love classes. Lets see what else is up.

Post-Me says "it is easy for a parent (for example the main app) and a child (for example a worker or an iframe) to expose methods and custom events to each other."[^post-me]. It still uses worker construction, but wraps the worker in a Messenger class. The messenger initiates a connection and then uses `remoteHandle.call` to call functions form the worker and handle them like Promises. Still seems more complicated that just using workers?

Threads.js lets you "Call workers transparently, await results. It's never been easier."[^threads.js]. This looks like it actually brings something interesting to the table by creating a unified interface for both web-workers (off-thread processes in the browser) and node workers (off-thread process on a node server). That's a value add! Tho if your main goal is to free up the main thread to render UI, node doesn't exactly have that problem. Additionally, with a micro-service server less endpoint architecture any number of node calls can bring the same level of concurrency to the table, tho I guess with additional network request overhead. 

Honestly the API for Threads.js looks really simple and nice:

```
// master.js
import { spawn, Thread, Worker } from "threads"

async function main() {
  const auth = await spawn(new Worker("./workers/auth"))
  const hashed = await auth.hashPassword("Super secret password", "1234")

  console.log("Hashed password:", hashed)

  await Thread.terminate(auth)
}

main().catch(console.error)
```

```
// workers/auth.js - will be run in worker thread
import sha256 from "js-sha256"
import { expose } from "threads/worker"

expose({
  hashPassword(password, salt) {
    return sha256(password + salt)
  }
})
```

It also allows you to create Observables with with you can stream data. So THAT seems cool, but maybe all this is pretty advanced stuff, for when an app outgrows native interactions with a web worker. So let's not worry about that for now and just set up some basic workers. 

It looks like the goal of all these libs is to work around the issue created by the opacity between `postMessage` and `onMessage` - it's hard to differentiate between what message is associated with what response. What response is associated with what message? What does sending multiple messages do if they overlap? Lets find out!

### Creating a Web Worker

In our main thread, we can create a small component that takes a number, sends to a worker which will calculate the factorial of that number, and update the output to the result. 

```
<form class="js-dedicated-worker-form">
  <label>
    Calculate Factorial
    <input type="number" />
    <button>
      Get Factorial
    </button>
  </label>
</form>
<output class="js-dedicated-output"></output>
```

```
// script.js
// main thread
const dedicatedWorker = new Worker('factorial.js');

const dedicatedForm = document.querySelector(".js-dedicated-worker-form"); 
const dedicatedOutout = document.querySelector(".js-dedicated-output")

const dedicatedSubmit = (e) => {
  e.preventDefault()
  let int = Number(e.target[0].value)
  dedicatedOutout.innerHTML = 'Loading…'
  
  dedicatedWorker.postMessage(int);
}

dedicatedWorker.onmessage = function(e) {
  console.log('Message received from worker');
  console.log(e.data)
  dedicatedOutout.innerHTML = e.data
}

dedicatedForm.addEventListener('submit', dedicatedSubmit)
```

```
// factorial.js
// worker thread
const big_fast_factorial = (x) => {
  let r = self.BigInt(1);
  for (let i = self.BigInt(2); i <= x; i++)
    r = r * i;
  return r;
}

onmessage = function(e) {
  postMessage(big_fast_factorial(self.BigInt(e.data)));
}
```

This will take the number from the form, send it to the factorial worker, which will calculate the factorial, return the result to the main thread, which will handle the UI and update the DOM. Best case scenario, as the main thread and DOM won't lock up while the worker crunches an enormous factorial. 

If we put the postMessage into a set timeout, we can simulate a very slow process and test race conditions. 

In this case, we submit `1` and get the `loading…` indicator. We change the input to `2` and resubmit. Three seconds after the initial submit, out output reads `1`. Three seconds after the second submit, the output updates from `1` to `2`. 

We can see the synchronous behavior of the thread in action if we remove the timeout and let the factorial crunch however it wants to. Let's start by submitting `40,000`, which will take a while to crunch, and then immediately change the input to `1`, which will resolve almost immediately. The loading indicator will appear for however long it takes to calculate `40,000!`, then that result will flash in the output for as long as it takes to calculate `1!`, then the result for `1!` will appear in the output. This means we do not have race conditions with synchronous functions in the worker, and the messages will be treated on a first in first out basis. 

What happens when we make an async function inside our worker? Can we convince the worker to return the first value we submit last, and wind up with a UI that displays the result of `1!` as some massive integer which is obviously not correct?

```
const big_fast_factorial = async (x) => {
  let r = self.BigInt(1);
  for (let i = self.BigInt(2); i <= x; i++)
    r = r * i;
  return r;
}

onmessage = async (e) => {
  var workerResult = await big_fast_factorial(self.BigInt(e.data))
  postMessage(workerResult);
}
```

Apparently not! We wind up with an end state of `1! === 1`, which is correct. Not only that, but now it doesn't even flash the enormous integer that is `40,000!`. This appears to be an improvement! However, it does still take the entire amount of time to calculate the result of `40,000!` before it can show us the result of `1!`. This indicates there is still _something_ synchronous happening. A potential solution here would be to create a message system for canceling previous async functions, but the takeaway is that these workers can be used to product results that will be consistent with the UI that requested them. 

If your dedicated worker doesn't need to _really_ care about what _called_ it in the first place, than the out of the box architecture is perfect and will work great. If there needs to be some awareness, perhaps structuring your worker so that it returns the initial parameters it was called with would be useful:

```
onmessage = async (e) => {
  var workerResult = await big_fast_factorial(self.BigInt(e.data))
  postMessage({
    i: e.data,
    o: workerResult
  });
}
```

We can then do whatever needs doing with these associated inputs and outputs. Very neat!

### Shared Web Workers

Shared Web Workers are interesting, but the fact the Safari _removed_ support for them in 2015 and seems to have no interest in bringing them back, combined with the hoops you would have to jump through to polyfill them seems to make them impractical for most use cases. The only situation where they could be used is if falling back to a single dedicated worker instead of a shared worker still brings value to the table. This means they _shouldn't_ be used for messaging across instances of the app in separate windows. Im still thinking of some use cases where a dedicated worker would be fine, but a shared worker would be better. That said, I only spent one afternoon playing around with these, so if you think of good use case let me know. 

If your thinking about using a shared web worker, some other tools to consider include:

**[BroadcastChannel](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API):** Slightly support than Shared Workers, with indications that it's coming to Safari soon. BroadcastChannel is specifically designed for messaging across instances of an application and cross-window communication. 

**[WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket):** Used to open a persistent connection between a server and client and communocating events up or down.

**[WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)**: WebRTC is used to open real-time connections between peers, instead of between clients and a server like a WebSocket. This allows for any number of clients to communicate directly with each other. Additionally, there seems to be interest in [allowing WebRTC connection in Workers](https://github.com/w3c/webrtc-extensions/issues/77) which would be a very interesting thing indeed.

I'm not going to write _too_ much about the ins and outs of implementing 

Lets use a shared worker to create communication across tabs, creating a use case like band camp, where any instance of the app can share current information.

**Something is weird with caches and shared workers, the latest code updates in glitch don't get loaded by other tabs. Who knows if this is a glitch thing or a worker thing.**

It looks like that shared workers don't get requested over the wire quite the same way as dedicated workers. Instead, a shared worker loads _once_ for the session, than any subsequent load pulls from whatever version is cached in the session. This means that development is tricky, since you need to close _all_ open windows and re-open them between any edit to the file to ensure that all the windows are running the same, most recent, file.

[^mdn]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
[^comlink]: https://github.com/GoogleChromeLabs/comlink
[^post-me]: https://github.com/alesgenova/post-me
[^threads.js]: https://threads.js.org/
[^peirophp]: https://gist.github.com/pierophp/898f8316afa1bd04e04853bc3e3cfb48
[^smashing]: https://www.smashingmagazine.com/2021/06/web-workers-2021/