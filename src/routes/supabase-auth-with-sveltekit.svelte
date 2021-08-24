<script context="module">
	export const metadata = {"title":"Supabase Auth With SvelteKit","description":"Implementing a secure JWT token authentication system for server-rendered applications.","date":"2021.08.20","slug":"supabase-auth-with-sveltekit","type":"text, texts"};
	const { title, description, date, slug, type } = metadata;
</script>
<script>
  import Introduction from '../components/Introduction.svelte'
</script>


<Introduction {metadata} />
<p>I really like using <a href="https://kit.svelte.dev/" rel="nofollow">SvelteKit</a>, even in its pre-1.0 distribution. I also have been really impressed with <a
  href="https://supabase.io/"
  rel="nofollow"
>Supabase</a>, and want to start moving projects away from <a
  href="https://firebase.google.com/"
  rel="nofollow"
>Firebase</a>. One of the things that <a
  href="https://www.dicegraph.com/"
  rel="nofollow"
>Dicegraph</a> uses Firebase for is the authentication handler (I do not want to write my own. Know your limits, friends). </p>
<p>One of the benefits to using SvelteKit with Supabase Auth is that we can have server-side authenticated sessions. One of the drawbacks is that this is confusing and hard. So I thought pretty hard about it, and here’s what I came up with. </p>
<p>The groundwork for this has been laid by some excellent <a
  href="https://www.ashleyconnor.co.uk/2021/06/24/authenticated-server-rendered-pages-with-sveltekit-and-supabase"
  rel="nofollow"
>extant</a> <a
  href="https://github.com/one-aalam/svelte-starter-kit/tree/auth-supabase"
  rel="nofollow"
>resources</a>, so hopefully this doesn’t come off as “look how smart I am” (I’m not), and more as “I wrote this down so I don’t forget what I did” (see previous note).</p>
<h2>Authenticating a User Session</h2>
<p>Create a regular ass form, that submits credentials to a <a
  href="https://kit.svelte.dev/docs#routing-endpoints"
  rel="nofollow"
>SvelteKit endpoint</a>.</p>
<pre class="language-undefined">{@html `<code class="language-undefined">// login.html
&lt;form
  action=&quot;/api/login&quot;
  method=&quot;post&quot;
&gt;
  &lt;label&gt;
    email
    &lt;input
      name=&quot;email&quot;
      type=&quot;email&quot;
      required
    /&gt;
  &lt;/label&gt;

  &lt;label&gt;
    password
    &lt;input
      name=&quot;password&quot;
      type=&quot;password&quot;
      required
    /&gt;
  &lt;/label&gt;

  &lt;button type=&quot;submit&quot;&gt;
    Login
  &lt;/button&gt;
&lt;/form&gt;</code>`}</pre>
<p>The login endpoint takes the credentials, and sends them to Supabase.</p>
<pre class="language-undefined">{@html `<code class="language-undefined">// api/login.js
export async function post(request) &#123;
  let email = request.body.get(&#39;email&#39;)
  let password = request.body.get(&#39;password&#39;)
  let &#123; session &#125; = auth.signIn(&#123; email, password &#125;)
&#125;</code>`}</pre>
<p>This gives us a user object, and an assortment of other good stuff like a <code>JWT</code> and a refresh token. </p>
<p>We can pass that user object back to the app with the request. However! We want to build this with progressive enhancement in mind, and that means letting forms be forms, and if we can Ajax them and do client side handling than that’s <em>better</em> but not <em>necessary</em>. This means that we want to have the result of a successful login call redirect to a logged-in page. This can be expanded to accept a redirect url in general to send a user to. Which we will do later.</p>
<pre class="language-undefined">{@html `<code class="language-undefined">// api/login.js
export async function post(request) &#123;
  let email = request.body.get(&#39;email&#39;)
  let password = request.body.get(&#39;password&#39;)

	let &#123; session &#125; = auth.signIn(&#123; email, password &#125;)

  return &#123;
    status: 302,
    body: &#39;success&#39;,
    headers: &#123;
      location: &#39;/&#39;
    &#125;
  &#125;
&#125;</code>`}</pre>
<p>This server-side redirect means that we cannot pass any data back down to our application at this step directly – returning JSON in the body of this response will get blown away by the text content of the redirect page, meaning we have no way to get at the user object we just generated. This is a new challenge for me, a developer of the Ajax era. </p>
<p>What we <em>can</em> do however, is attach some data to the browser directly via cookies, and make them nice and secure so only our own server endpoints can see them, then these endpoints can use the tokens to get the user objects. Let us attach the <code>access_token</code>, <code>refresh_token</code>, and <code>expires_at</code>, all useful for later. </p>
<p>Let’s write a small helper function that translates those items from the Supabase session object into secure cookies.</p>
<pre class="language-undefined">{@html `<code class="language-undefined">const constructCookies = (session) =&gt; &#123;
  let cookieOptions = &#96;Path=/;HttpOnly;Secure;SameSite=Strict;Expires=$&#123;new Date(session.expires_at * 1000).toUTCString()&#125;;&#96;

  return &#123;
    refresh_token: &#96;refresh_token=$&#123;session.refresh_token&#125;;$&#123;cookieOptions&#125;&#96;,
    access_token: &#96;access_token=$&#123;session.access_token&#125;;$&#123;cookieOptions&#125;&#96;,
    expires_at: &#96;expires_at=$&#123;session.expires_at&#125;;$&#123;cookieOptions&#125;&#96;
  &#125;
&#125;</code>`}</pre>
<p><code>HttpOnly</code> means that this cookie will not be readable from client-side code. <code>Secure</code> means it will only be passed on <code>https</code> requests. <code>SameSite=Strict</code> means that it will only be available on requests to or from our application url. This is as secure as we can make a cookie, but it’s still not 100% perfect <a
  href="https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/"
  rel="nofollow"
>I guess</a>. But good enough for me, for now. Let’s attach that to our response:</p>
<pre class="language-undefined">{@html `<code class="language-undefined">/api/login.js
export async function post(request) &#123;
  let email = request.body.get(&#39;email&#39;)
  let password = request.body.get(&#39;password&#39;)

  const &#123; session &#125; = await supabase.auth.signIn(&#123; email, password &#125;)

  let &#123;
    refresh_token,
    access_token,
    expires_at
  &#125; = constructCookies(session)

  return &#123;
    status: 302,
    body: &#39;success&#39;,
    headers: &#123;
			&#39;set-cookie&#39;: [
				refresh_token, 
				access_token, 
				expires_at
			],
      location: &#39;/&#39;
    &#125;
  &#125;
&#125;</code>`}</pre>
<h3>Check In: Where are we at now?</h3>
<p>We have created a form that accepts a users credentials and submits them to an endpoint that validates those credentials. This endpoint redirects back to the app, and attaches a <code>JWT</code> token as a cookie.</p>
<h2>Using <code>JWT</code> to Get The User</h2>
<p>So now any request we make from the client to our server endpoints will automatically include the <code>JWT</code> we’re using as our bearer token. So our <em>server</em> knows that this user is authenticated and can make calls for them and render data for them, but our client-side Svelte code still has no idea, since we are actively hiding all of these tokens from any JavaScript that runs in the browser for Security Reasons™. How do we bridge that gap and get some useful data to our Svelte application?</p>
<p>We use the <code>handle</code> hook – a <a
  href="https://kit.svelte.dev/docs#hooks-handle"
  rel="nofollow"
>special function</a> that runs on <em>every</em> request that our SvelteKit application makes. The <code>handle</code> function runs on the server, so it can access our <code>HttpOnly</code> cookies. The <code>handle</code> function also can populate a requests <code>locals</code> key, which is where SvelteKit recommends you store session data like “which user is logged in”.</p>
<p>So in our <code>handle</code> function in <code>hooks.js</code> we’ll grab our sweet <code>JWT</code> access token, use that to get the user from Supabase, and stuff that into the request <code>locals</code>.</p>
<pre class="language-undefined">{@html `<code class="language-undefined">// src/hooks.js
export const handle = async (&#123; request, resolve &#125;) =&gt; &#123;
  let cookies = cookie.parse(request.headers.cookie || &#39;&#39;)
  let &#123; user &#125; = await 
  
  supabase.auth.api.getUser(cookies.access_token)
  request.locals.user = user || false;

  let response = await resolve(request)
  return response
&#125;</code>`}</pre>
<p>Now we have our authenticated user object present in any request and response we make with our App. From here, it’s a simple hop, skip and jump to exposing it to our Svelte code in our application, with the <code>getSession</code> <a
  href="https://kit.svelte.dev/docs#hooks-getsession"
  rel="nofollow"
>hook function</a>.</p>
<p><code>getSession</code> runs in both the client and the server, and it’s job is to populate the session object that all SvelteKit pages have access too in their pre-load, server-rendered generation phase. <code>getSession</code> has access to the request (and therefor the <code>locals</code> object), and returns an object that any SvelteKit route can access. So:</p>
<pre class="language-undefined">{@html `<code class="language-undefined">// src/hooks.js
export const getSession = async (request) =&gt; &#123;
  return request.locals
&#125;</code>`}</pre>
<p>It’s as easy as that!</p>
<p>And any page can access this object with it’s own <code>load</code> <a href="https://kit.svelte.dev/docs#loading" rel="nofollow">lifecycle function</a>:</p>
<pre class="language-undefined">{@html `<code class="language-undefined">// src/routes/index.svelte
&lt;script context=&quot;module&quot;&gt;
  export async function load(&#123; session &#125;) &#123;
    return &#123;
      props: &#123;
        session: session
      &#125;
    &#125;
  &#125;
&lt;/script&gt;

&lt;script&gt;
	export let session
	console.log(session) // &#123; user: &#123; … &#125; &#125;
&lt;/script&gt;</code>`}</pre>
<p>Or:</p>
<pre class="language-undefined">{@html `<code class="language-undefined">// src/routes/index.svelte
&lt;script&gt;
	import &#123; session &#125; from &#39;$app/stores&#39;;
	console.log(session) // &#123; user: &#123; … &#125; &#125;
&lt;/script&gt;</code>`}</pre>
<h3>It is too much, let me sum up:</h3>
<p>We’ve done a lot here, let’s go over it all from start to finish and see what we have.</p>
<ol>
<li>A form accepts a users email and password, and submits them to a login endpoint.</li>
<li>The login endpoint exchanges the credentials for a Supabase user and access tokens.</li>
<li>The login endpoint attaches the tokens to secure, super-secret, server-only cookies and redirects the client to another page.</li>
<li>When that page loads, SvelteKit’s <code>handle</code> hook function grabs the cookie from the request, exchanges the access token for a user object, and stuffs <em>that</em> object on to the <code>request.locals</code> key.</li>
<li>When the page renders, SvelteKit’s <code>getSession</code> hook function runs, grabbing the contents of the <code>request.locals</code> object and making it available to the SvelteKit app as the current users <code>session</code>.</li>
<li>SvelteKit routes (and layout components) can access the <code>session</code> object either in a load function, or straight from the application store.</li>
<li>Your app now knows what is happening with the whole “authenticated user” situation.</li>
</ol>
<h2>Is that everything?</h2>
<p>No, not really. This is just the simple best-case path for a successful user login. The full spec for an app’s authentication would be a little more complicated, probably something like this:</p>
<h3>SvelteKit & Supabase Auth Spec</h3>
<ul>
<li>A Signup form submits a redirect url, email, and password to a signup endpoint<ul>
<li>A telemetry event fires to app analytics</li>
<li>The signup endpoint creates a new user in Supabase</li>
<li>If there is an error:<ul>
<li>A telemetry event fires to app analytics</li>
<li>The endpoint redirects the user back to the signup form with error messages in query params</li>
<li>The signup form renders the error messages</li>
</ul></li>
<li>If there is a success:<ul>
<li>A telemetry event fires to app analytics</li>
<li>The endpoint attaches tokens to secure cookies, and redirects to the provided url.</li>
</ul></li>
<li>The form is progressively enhanced to use fetch to post instead of a form submit<ul>
<li>On error<ul>
<li>the form renders the error returned by the endpoint</li>
</ul></li>
<li>On success<ul>
<li>the form redirects to the provided url</li>
</ul></li>
</ul></li>
</ul></li>
<li>A login form submits redirect url, email, and password to a login endpoint <ul>
<li>A telemetry event fires to app analytics</li>
<li>If there is an error:<ul>
<li>A telemetry event fires to app analytics</li>
<li>The endpoint redirects the user back to the login form with error messages in query params</li>
<li>The login form renders the error messages</li>
</ul></li>
<li>If there is a success:<ul>
<li>A telemetry event fires to app analytics</li>
<li>The endpoint attaches tokens to secure cookies, and redirects to the provided url.</li>
</ul></li>
<li>The form is progressively enhanced to use fetch to post instead of a form submit<ul>
<li>On error<ul>
<li>the form renders the error returned by the endpoint</li>
</ul></li>
<li>On success<ul>
<li>the form redirects to the provided url</li>
</ul></li>
</ul></li>
</ul></li>
<li>The <code>handle</code> hook function<ul>
<li>Looks for auth cookies on the request.<ul>
<li>If there are no auth cookies<ul>
<li>no-op</li>
</ul></li>
<li>If there <em>are</em> auth cookies, <ul>
<li>it looks for a user object on the request locals<ul>
<li>if there is one,<ul>
<li>it checks against the <code>expires_at</code> cookie to see if it’s expired</li>
<li>if it is<ul>
<li>it attempts to exchange thee refresh token for an access token</li>
<li>… see below.</li>
</ul></li>
<li>if it is not<ul>
<li>no-op</li>
</ul></li>
</ul></li>
<li>if there is not one<ul>
<li>it attempts to exchange the access token for a user object.</li>
<li>if that errors,<ul>
<li>it attempts to use the refresh token to get a new access token</li>
<li>if that errors,<ul>
<li>it deletes all auth cookies from the request headers</li>
<li>it deletes all user data from the request locals</li>
</ul></li>
<li>if that succeeds,<ul>
<li>it attempts to exchange the access token for a user object</li>
<li>if that errors,<ul>
<li>it deletes all auth cookies from the request headers</li>
<li>it deletes all user data from the request locals</li>
</ul></li>
<li>that succeeds,<ul>
<li>it sets the user object on the request locals</li>
<li>it sets the new tokens on the request header auth cookies</li>
</ul></li>
</ul></li>
</ul></li>
<li>if that succeeds,<ul>
<li>it attaches the user object to the request locals.</li>
</ul></li>
</ul></li>
</ul></li>
</ul></li>
</ul></li>
</ul></li>
<li>The <code>getSession</code> hook function<ul>
<li>Attaches returns the <code>request.locals</code> value.</li>
</ul></li>
<li>A logout form posts a redirect url to a logout endpoint<ul>
<li>A telemetry event fires to app analytics</li>
<li>The logout endpoint deletes all auth cookies</li>
<li>The logout endpoint redirects back to the application</li>
<li>The form is progressively enhanced to use fetch to post instead of a form submit<ul>
<li>On error<ul>
<li>the form renders the error returned by the endpoint</li>
</ul></li>
<li>On success<ul>
<li>the form redirects to the provided url</li>
</ul></li>
</ul></li>
<li>The form is progressively enhanced to use fetch to post instead of a form submit<ul>
<li>On error<ul>
<li>the form renders the error returned by the endpoint</li>
</ul></li>
<li>On success<ul>
<li>the form redirects to to the provided url</li>
</ul></li>
</ul></li>
</ul></li>
<li>A delete user form posts to a delete user endpoint<ul>
<li>A telemetry event fires to app analytics</li>
<li>The delete user endpoint takes the users <code>uuid</code> and calls the Supabase <code>deleteUser</code> function.<ul>
<li>On error,<ul>
<li>endpoint redirects to the app with error message in there query param</li>
</ul></li>
<li>On success,<ul>
<li>endpoint deletes all auth cookies</li>
<li>endpoint calls any other cleanup functions needed </li>
<li>endpoint redirects to the app.</li>
</ul></li>
</ul></li>
<li>The form is progressively enhanced to use fetch to post instead of a form submit<ul>
<li>On error<ul>
<li>the form renders the error returned by the endpoint</li>
</ul></li>
<li>On success<ul>
<li>the form redirects to to the provided url</li>
</ul></li>
</ul></li>
</ul></li>
<li>Every Function:<ul>
<li>Is instrumented to post telemetry data to an observability system.</li>
</ul></li>
<li>Every Redirect:<ul>
<li>is validated by<ul>
<li>is a relative url</li>
<li>is in a list of known urls</li>
</ul></li>
</ul></li>
</ul>
<h3>Sample Application Structure</h3>
<p>The SvelteKit app could look something like this: which I really should turn into a repo you can just clone.</p>
<pre class="language-undefined">{@html `<code class="language-undefined">/src
	/lib
		/utils
			constructAuthCookies.js
			deleteAuthCookies.js
			observability.js
			analytics.js
		/components
			form.svelte
	/routes
		/api
			login.js
			logout.js
			signup.js
			delete-user.js
		index.svelte
		login.svelte
		signup.svelte
	hooks.js</code>`}</pre>
<p>	Wow! It seems less hard when I write it all down like that. Now I’m off to implement that complete auth spec.x</p>
