<script>
	import { fade } from 'svelte/transition';
	import Header from '../components/Header.svelte'
	import Nav from '../components/Nav.svelte'
	import {event} from '../analytics.js'
	import { stores } from '@sapper/app'
	const { preloading, page, session } = stores()

	$: {
	  if (typeof window != 'undefined') {
	    event({
	      action: 'page_view',
	      label: $page.path,
	      session: $session.id
	    })
	  }
	}
	const toggleMode = () => {
		let body = document.querySelector('body')
		body.classList.toggle('invert')
	}

	export let segment;
</script>

<style>
	footer,
	main {
		position: relative;
		max-width: 44rem;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
	footer {
		display: flex;
		justify-content: space-between;
	}
	button {
		color: inherit;
		background: none;
		border: none;
		cursor: pointer;
		font-size: var(--s-22);
		transition: color 300ms ease-in-out;
	}
	button:hover {
		color: var(--pink);
		transition: color 300ms ease-in-out;
	}	
</style>

<Header {segment}/>

<main id="main">
	<slot></slot>
</main>

<Nav />

<footer>
	<p>
		© {new Date().getFullYear()}
	</p>
	<button 
		aria-label="Invert Colors"
		on:click={toggleMode}>
		◐
	</button>
</footer>