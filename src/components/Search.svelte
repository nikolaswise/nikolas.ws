<script>
  import { onMount, onDestroy } from 'svelte'
  import Fuse from 'fuse.js'

  import items from '../data/meta.json'
  import resources from '../data/resources.json'

  let index = items
    .concat(resources
      .map((resource) => {
        return {
          title: resource.title,
          description: resource.description,
          keywords: resource.keywords,
          url: resource.url,
          type: 'resource'
        }
      })
    )

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
    threshold: 0.4,
    keys: ['thesis', 'title', 'author', 'tags', 'date', 'description', 'media']
  })

  const getResults = (term) => fuse
    .search(term)
    .map(result => {
      let url = result.item.url ? result.item.url : `/${result.item.slug}`
      let normalizedResult = {
        category: result.item.category,
        title: result.item.title,
        url: url
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
    // on arrrow down
    if (e.which == '40') {
      e.preventDefault()
      let cur = links.indexOf(document.activeElement)
      if (cur === links.length - 1) {
        // at bottom, do nothing
        return
      }
      if (!links.includes(document.activeElement)) {
        // not in list, focus on first item
        links[0].focus()
      } else {
        // focus on next item
        links[cur + 1].focus()
      }
    }
    // on arrow up
    if (e.which == '38') {
      e.preventDefault()
      let cur = links.indexOf(document.activeElement)
      if (links.includes(document.activeElement)) {
        cur === 0 ? input.focus() : links[cur - 1].focus()
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