<script>
  import Meta from '../../components/Meta.svelte'
  import arts from '../../data/art/index.json'

  let searchTerm = ""

  const contains = (searchTerm) => (art) => {
    let standardTerm = searchTerm.toLowerCase()
    let standardMeta = JSON.stringify(art.meta).toLowerCase()
    return standardMeta.indexOf(standardTerm) !== -1
  }

  $: filteredList = arts.filter(contains(searchTerm))

</script>

<style>
  h2 {
    font-size: var(--s-12);
    line-height: calc(1em + 0.75rem);
    margin-bottom: 0;
  }

  label,
  input {
    display: block;
    width: 100%;
  }
  label {
    font-size: var(--s-10);
  }
  input {
    font-size: var(--s-14);
    margin-top: var(--u-2p);
    background-color: var(--bg-color);
    color: var(--txt-color);
    outline: none;
    border: none;
    padding: var(--u-2p) 0;
    font-family: 'Input';
  }

  ul {
    padding: 0;
    border-top: 2px solid var(--txt-color);
  }
  li {
    margin: 0;
    padding: var(--u-6p) 0;
    list-style-type: none;
    padding-bottom: var(--u-3p);
  }
  li a {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding-bottom: var(--u-6p);

  }
  li span:first-of-type {
    grid-column: 1 / 4;
  }
  li span:last-of-type {
    text-align: right;
  }
</style>

<Meta
  title='nikolas.ws: bilbiography'
  description='Notes on writings.'
/>

<h1>Visual Art</h1>

<form>
  <label>
    Search Prints:
    <input
      bind:value={searchTerm}
      placeholder="Filter entries …"
      type="text">
  </label>
</form>

<ul>
  {#each filteredList as art}
    {#if art.meta.title}
      <li>
        <a rel="prefetch" href="/art/{art.meta.slug}">
          <span>
            {art.meta.title}
          </span>
          <span>
            {art.meta.media}
          </span>
          <span>
            {art.meta.size}
          </span>
          <span>
            {art.meta.date}
          </span>
        </a>
      </li>
    {/if}
  {/each}
</ul>