<script>
  import { onMount } from 'svelte'
	import Search from './Search.svelte'
	export let segment;

	let searchIsOpen = false

  const toggleSearch = (e) => {
    if (event.metaKey && event.which === 191) {
    	searchIsOpen = !searchIsOpen
    }
  }

  onMount(() => {
    window.addEventListener('keydown', toggleSearch)
  });
</script>

<a
	class="screenreader"
	href='#main'>
  Skip to Content
</a>

<header>
	<nav>
		<a
			href="/">
			nikolas.ws
		</a>
		{#if segment}
			/
			<a
				href="/{segment}">
				{segment}
			</a>
		{/if}
	</nav>

	<button
		aria-label="Toggle Menu"
		on:click={() => searchIsOpen = !searchIsOpen}>
		<!-- search / -->
		index /
	</button>
</header>

{#if searchIsOpen}
	<Search bind:value={searchIsOpen}/>
{/if}


<style>
	header {
		position: relative;
		max-width: 44em;
		padding: 2em;
		padding-bottom: 1em;
		margin: 0 auto;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	button {
		color: inherit;
		font-family: 'Input';
		background: none;
		border: none;
		cursor: pointer;
		font-size: var(--s-22);
		transition: color 300ms ease-in-out;
		border: 1px solid var(--txt-color);
		border-radius: var(--u-3p);
		background: var(--code-bg);
	}
	button:hover {
		color: var(--pink);
		transition: color 300ms ease-in-out;
	}
	.screenreader {
		position: absolute;
		opacity: 0;
		transition: opacity 300ms ease-in-out;
	}
	.screenreader:hover,
	.screenreader:focus {
		color: var(--txt-color);
		border-color: var(--txt-color);
		opacity: 1;
		transition: opacity 300ms ease-in-out;
	}
</style>
