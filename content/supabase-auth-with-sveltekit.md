---
title: Supabase Auth With SvelteKit
description: Implementing a secure JWT token authentication system for server-rendered applications.
date: 2021.08.20
slug: supabase-auth-with-sveltekit
type: text, texts
---

<script>
  import Introduction from '../components/Introduction.svelte'
</script>

<Introduction {metadata} />

I really like using [SvelteKit](https://kit.svelte.dev/), even in its pre-1.0 distribution. I also have been really impressed with [Supabase](https://supabase.io/), and want to start moving projects away from [Firebase](https://firebase.google.com/). One of the things that [Dicegraph](https://www.dicegraph.com/) uses Firebase for is the authentication handler (I do not want to write my own. Know your limits, friends). 

One of the benefits to using SvelteKit with Supabase Auth is that we can have server-side authenticated sessions. One of the drawbacks is that this is confusing and hard. So I thought pretty hard about it, and here's what I came up with. 

The groundwork for this has been laid by some excellent [extant](https://www.ashleyconnor.co.uk/2021/06/24/authenticated-server-rendered-pages-with-sveltekit-and-supabase) [resources](https://github.com/one-aalam/svelte-starter-kit/tree/auth-supabase), so hopefully this doesn't come off as "look how smart I am" (I'm not), and more as "I wrote this down so I don't forget what I did" (see previous note).

## Authenticating a User Session

Create a regular ass form, that submits credentials to a [SvelteKit endpoint](https://kit.svelte.dev/docs#routing-endpoints).

```
// login.html
<form
  action="/api/login"
  method="post"
>
  <label>
    email
    <input
      name="email"
      type="email"
      required
    />
  </label>

  <label>
    password
    <input
      name="password"
      type="password"
      required
    />
  </label>

  <button type="submit">
    Login
  </button>
</form>
```

The login endpoint takes the credentials, and sends them to Supabase.

```
// api/login.js
export async function post(request) {
  let email = request.body.get('email')
  let password = request.body.get('password')
  let { session } = auth.signIn({ email, password })
}
```

This gives us a user object, and an assortment of other good stuff like a `JWT` and a refresh token. 

We can pass that user object back to the app with the request. However! We want to build this with progressive enhancement in mind, and that means letting forms be forms, and if we can Ajax them and do client side handling than that's _better_ but not _necessary_. This means that we want to have the result of a successful login call redirect to a logged-in page. This can be expanded to accept a redirect url in general to send a user to. Which we will do later.

```
// api/login.js
export async function post(request) {
  let email = request.body.get('email')
  let password = request.body.get('password')

	let { session } = auth.signIn({ email, password })

  return {
    status: 302,
    body: 'success',
    headers: {
      location: '/'
    }
  }
}
```

This server-side redirect means that we cannot pass any data back down to our application at this step directly – returning JSON in the body of this response will get blown away by the text content of the redirect page, meaning we have no way to get at the user object we just generated. This is a new challenge for me, a developer of the Ajax era. 

What we _can_ do however, is attach some data to the browser directly via cookies, and make them nice and secure so only our own server endpoints can see them, then these endpoints can use the tokens to get the user objects. Let us attach the `access_token`, `refresh_token`, and `expires_at`, all useful for later. 

Let's write a small helper function that translates those items from the Supabase session object into secure cookies.

```
const constructCookies = (session) => {
  let cookieOptions = `Path=/;HttpOnly;Secure;SameSite=Strict;Expires=${new Date(session.expires_at * 1000).toUTCString()};`

  return {
    refresh_token: `refresh_token=${session.refresh_token};${cookieOptions}`,
    access_token: `access_token=${session.access_token};${cookieOptions}`,
    expires_at: `expires_at=${session.expires_at};${cookieOptions}`
  }
}
```

`HttpOnly` means that this cookie will not be readable from client-side code. `Secure` means it will only be passed on `https` requests. `SameSite=Strict` means that it will only be available on requests to or from our application url. This is as secure as we can make a cookie, but it's still not 100% perfect [I guess](https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/). But good enough for me, for now. Let's attach that to our response:

```
/api/login.js
export async function post(request) {
  let email = request.body.get('email')
  let password = request.body.get('password')

  const { session } = await supabase.auth.signIn({ email, password })

  let {
    refresh_token,
    access_token,
    expires_at
  } = constructCookies(session)

  return {
    status: 302,
    body: 'success',
    headers: {
			'set-cookie': [
				refresh_token, 
				access_token, 
				expires_at
			],
      location: '/'
    }
  }
}
```

### Check In: Where are we at now?

We have created a form that accepts a users credentials and submits them to an endpoint that validates those credentials. This endpoint redirects back to the app, and attaches a `JWT` token as a cookie.

## Using `JWT` to Get The User

So now any request we make from the client to our server endpoints will automatically include the `JWT` we're using as our bearer token. So our _server_ knows that this user is authenticated and can make calls for them and render data for them, but our client-side Svelte code still has no idea, since we are actively hiding all of these tokens from any JavaScript that runs in the browser for Security Reasons™. How do we bridge that gap and get some useful data to our Svelte application?

We use the `handle` hook – a [special function](https://kit.svelte.dev/docs#hooks-handle) that runs on _every_ request that our SvelteKit application makes. The `handle` function runs on the server, so it can access our `HttpOnly` cookies. The `handle` function also can populate a requests `locals` key, which is where SvelteKit recommends you store session data like "which user is logged in".

So in our `handle` function in `hooks.js` we'll grab our sweet `JWT` access token, use that to get the user from Supabase, and stuff that into the request `locals`.

```
// src/hooks.js
export const handle = async ({ request, resolve }) => {
  let cookies = cookie.parse(request.headers.cookie || '')
  let { user } = await 
  
  supabase.auth.api.getUser(cookies.access_token)
  request.locals.user = user || false;

  let response = await resolve(request)
  return response
}
```

Now we have our authenticated user object present in any request and response we make with our App. From here, it's a simple hop, skip and jump to exposing it to our Svelte code in our application, with the `getSession` [hook function](https://kit.svelte.dev/docs#hooks-getsession).

`getSession` runs in both the client and the server, and it's job is to populate the session object that all SvelteKit pages have access too in their pre-load, server-rendered generation phase. `getSession` has access to the request (and therefor the `locals` object), and returns an object that any SvelteKit route can access. So:

```
// src/hooks.js
export const getSession = async (request) => {
  return request.locals
}
```

It's as easy as that!

And any page can access this object with it's own `load` [lifecycle function](https://kit.svelte.dev/docs#loading):

```
// src/routes/index.svelte
<script context="module">
  export async function load({ session }) {
    return {
      props: {
        session: session
      }
    }
  }
</script>

<script>
	export let session
	console.log(session) // { user: { … } }
</script>
```

Or:

```
// src/routes/index.svelte
<script>
	import { session } from '$app/stores';
	console.log(session) // { user: { … } }
</script>
```


### It is too much, let me sum up:

We've done a lot here, let's go over it all from start to finish and see what we have.

1. A form accepts a users email and password, and submits them to a login endpoint.
2. The login endpoint exchanges the credentials for a Supabase user and access tokens.
3. The login endpoint attaches the tokens to secure, super-secret, server-only cookies and redirects the client to another page.
4. When that page loads, SvelteKit's `handle` hook function grabs the cookie from the request, exchanges the access token for a user object, and stuffs _that_ object on to the `request.locals` key.
5. When the page renders, SvelteKit's `getSession` hook function runs, grabbing the contents of the `request.locals` object and making it available to the SvelteKit app as the current users `session`.
6. SvelteKit routes (and layout components) can access the `session` object either in a load function, or straight from the application store.
7. Your app now knows what is happening with the whole "authenticated user" situation.

## Is that everything?

No, not really. This is just the simple best-case path for a successful user login. The full spec for an app's authentication would be a little more complicated, probably something like this:

### SvelteKit & Supabase Auth Spec

- A Signup form submits a redirect url, email, and password to a signup endpoint
	- A telemetry event fires to app analytics
	- The signup endpoint creates a new user in Supabase
	- If there is an error:
		- A telemetry event fires to app analytics
		- The endpoint redirects the user back to the signup form with error messages in query params
		- The signup form renders the error messages
	- If there is a success:
		- A telemetry event fires to app analytics
		- The endpoint attaches tokens to secure cookies, and redirects to the provided url.
	- The form is progressively enhanced to use fetch to post instead of a form submit
		- On error
			- the form renders the error returned by the endpoint
		- On success
			- the form redirects to the provided url
- A login form submits redirect url, email, and password to a login endpoint 
	- A telemetry event fires to app analytics
	- If there is an error:
		- A telemetry event fires to app analytics
		- The endpoint redirects the user back to the login form with error messages in query params
		- The login form renders the error messages
	- If there is a success:
		- A telemetry event fires to app analytics
		- The endpoint attaches tokens to secure cookies, and redirects to the provided url.
	- The form is progressively enhanced to use fetch to post instead of a form submit
		- On error
			- the form renders the error returned by the endpoint
		- On success
			- the form redirects to the provided url
- The `handle` hook function
	- Looks for auth cookies on the request.
		- If there are no auth cookies
			- no-op
		- If there _are_ auth cookies, 
			- it looks for a user object on the request locals
				- if there is one,
					- it checks against the `expires_at` cookie to see if it's expired
					- if it is
						- it attempts to exchange thee refresh token for an access token
						- … see below.
					- if it is not
						- no-op
				- if there is not one
					- it attempts to exchange the access token for a user object.
					- if that errors,
						- it attempts to use the refresh token to get a new access token
						- if that errors,
							- it deletes all auth cookies from the request headers
							- it deletes all user data from the request locals
						- if that succeeds,
							- it attempts to exchange the access token for a user object
							- if that errors,
								- it deletes all auth cookies from the request headers
								- it deletes all user data from the request locals
							- that succeeds,
								- it sets the user object on the request locals
								- it sets the new tokens on the request header auth cookies
					- if that succeeds,
						- it attaches the user object to the request locals.
- The `getSession` hook function
	- Attaches returns the `request.locals` value.
- A logout form posts a redirect url to a logout endpoint
	- A telemetry event fires to app analytics
	- The logout endpoint deletes all auth cookies
	- The logout endpoint redirects back to the application
	- The form is progressively enhanced to use fetch to post instead of a form submit
		- On error
			- the form renders the error returned by the endpoint
		- On success
			- the form redirects to the provided url
	- The form is progressively enhanced to use fetch to post instead of a form submit
		- On error
			- the form renders the error returned by the endpoint
		- On success
			- the form redirects to to the provided url
- A delete user form posts to a delete user endpoint
	- A telemetry event fires to app analytics
	- The delete user endpoint takes the users `uuid` and calls the Supabase `deleteUser` function.
		- On error,
			- endpoint redirects to the app with error message in there query param
		- On success,
			- endpoint deletes all auth cookies
			- endpoint calls any other cleanup functions needed 
			- endpoint redirects to the app.
	- The form is progressively enhanced to use fetch to post instead of a form submit
		- On error
			- the form renders the error returned by the endpoint
		- On success
			- the form redirects to to the provided url
- Every Function:
	- Is instrumented to post telemetry data to an observability system.
- Every Redirect:
	- is validated by
		- is a relative url
		- is in a list of known urls

### Sample Application Structure

The SvelteKit app could look something like this: which I really should turn into a repo you can just clone.

```
/src
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
	hooks.js
```

	Wow! It seems less hard when I write it all down like that. Now I'm off to implement that complete auth spec.x
