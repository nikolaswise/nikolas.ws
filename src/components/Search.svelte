<script>
  import { onMount, onDestroy } from 'svelte'
  export let value

  let input
  let results
  let links = []
  $: {
    links = results ? [...results.querySelectorAll('a')] : []
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
        // cur === 0 ? input.focus() : links[cur - 1].focus()
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
<!--   <label
    class="search-bar">
    <input
      bind:this={input}
      placeholder="Go to…"
      type="search">
  </label> -->

  <div class="search-results" bind:this={results}>
    <a
      on:click={close}
      href="/texts">
      Texts <span>☞</span>
    </a>
    <a
      on:click={close}
      href="/projects">
      Projects <span>☞</span>
    </a>
    <a
      on:click={close}
      href="/art">
      Visual Art <span>☞</span>
    </a>
    <a
      on:click={close}
      href="/bibliography">
      Bibliography <span>☞</span>
    </a>
    <a
      on:click={close}
      href="/resources">
      Resources <span>☞</span>
    </a>
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
  }

  a {
    display: block;
    border-bottom: none;
    padding: var(--u-6p) 1rem;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  span {
    font-size: var(--s-24);
  }

  a:focus,
  a:hover {
    background-color: var(--code-bg);
  }
</style>