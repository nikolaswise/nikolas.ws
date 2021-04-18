<script>
  import { onMount, onDestroy } from 'svelte'
  import Fuse from 'fuse.js'

  import bibliography from '../data/bibliography/index.json'
  import texts from '../data/texts/index.json'
  import projects from '../data/projects/index.json'
  import art from '../data/art/index.json'
  import resources from '../data/resources/index.json'

  let addCategory = (category) => (item) => {
    item.category = category
    return item
  }
  let index = []
    .concat(bibliography.map(addCategory('bibliography')))
    .concat(texts.map(addCategory('texts')))
    .concat(projects.map(addCategory('projects')))
    .concat(art.map(addCategory('art')))
    .concat(resources.map(addCategory('resources')))

  export let value

  let input
  let resultsContainer
  let defaultResults = [{
    title: 'Texts',
    url: '/texts',
  },{
    title: 'Projects',
    url: '/projects',
  },{
    title: 'Visual Art',
    url: '/art',
  },{
    title: 'Bibliography',
    url: '/bibliography',
  },{
    title: 'Resources',
    url: '/resources',
  }]
  let results = []
  let links = []

  let term
  const fuse = new Fuse(index, {
    threshold: 0.3,
    keys: ['meta.thesis', 'meta.title', 'meta.author', 'meta.tags', 'meta.date', 'meta.description', 'meta.media']
  })

  const getResults = (term) => fuse
    .search(term)
    .map(result => {
      let normalizedResult = {
        category: result.item.category,
        title: result.item.meta.title,
        url: `/${result.item.category}/${result.item.meta.slug}`
      }
      return normalizedResult
    })

  $: {
    results = term && term.length > 1 ? getResults(term) : defaultResults
    links = resultsContainer ? [...resultsContainer.querySelectorAll('a')] : []
  }

  const close = () => {
    value = false
  }

  const keyHandler = (e) => {
    if (e.key === 'Escape') {
      close()
    }
    if (e.which == '40') {
      e.preventDefault()
      let cur = links.indexOf(document.activeElement)
      if (cur === links.length - 1) {
        return
      }
      if (!links.includes(document.activeElement)) {
        links[0].focus()
      } else {
        links[cur + 1].focus()
      }
    }
    if (e.which == '38') {
      e.preventDefault()
      let cur = links.indexOf(document.activeElement)
      if (links.includes(document.activeElement)) {
        cur === 0 ? () => {} : links[cur - 1].focus()
      }
    }
  }

  onMount(() => {
    window.addEventListener('keydown', keyHandler)
  });

  onDestroy(() => {
    window.removeEventListener('keydown', keyHandler)
  });

</script>

<div class="search">
<label
    class="search-bar">
    <input
      bind:this={input}
      bind:value={term}
      placeholder="Search…"
      type="search">
  </label>

  <div class="search-results" bind:this={resultsContainer}>
    {#each results as result}
      <a
        on:click={close}
        href={result.url}>
        {#if result.category}
          <div class="block">
            <span class="category">{result.category}</span>
            <div class="flex-space-between">
              {result.title} <span>☞</span>
            </div>
          </div>
        {:else}
          {result.title} <span>☞</span>
        {/if}
      </a>
    {/each}
    {#if results.length === 0}
      <span class="category">No Results.</span>
    {/if}
  </div>
</div>

<style>
  .search {
    margin-top: 2rem;
    position: relative;
    max-width: 44rem;
    padding: 0 2em;
    margin: 0 auto;
    box-sizing: border-box;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }

  label,
  input {
    width: calc(100%);
  }

  label {
    border: 1px solid var(--text-color);
  }

  input {
    padding: 1rem;
    border: none;
    background-color: transparent;
    background-color: var(--code-bg);
    color: var(--text-color);
    font-family: 'Input';
    font-size: var(--s-22);
  }

  .search-results {
    padding: var(--u-6p);
    border: 1px solid var(--code-bg);
    position: absolute;
    z-index: 10;
    background-color: var(--bg-color);
    width: calc(100% - 5rem);
    box-shadow: var(--bg-color) 0px 20px 30px -10px;
  }

  a {
    display: block;
    border-bottom: none;
    padding: var(--u-6p) 1rem;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .block {
    width: 100%;
  }
  .flex-space-between {
    display: flex;
    justify-content: space-between;
  }


  span {
    font-size: var(--s-24);
  }

  .category {
    font-size: var(--s-8);
    font-family: 'Input';
    text-transform: uppercase;
  }

  a:focus,
  a:hover {
    background-color: var(--code-bg);
  }
</style>