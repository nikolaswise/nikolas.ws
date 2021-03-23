<script>
	import Nav from './Nav.svelte'
	export let segment;

	let navIsOpen = false
</script>

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
		on:click={() => navIsOpen = !navIsOpen}>
		≡
	</button>
</header>

{#if navIsOpen}
	<Nav bind:value={navIsOpen}/>
{/if}
