<script context="module">
  import getCollected from '../getCollected'

  let annotations = getCollected('annotation')

  export async function preload({ params }) {
    return { annotations }
  }
</script>

<script>
  import Meta from '../../components/Meta.svelte'
  export let annotations

  let searchTerm = ""

  const contains = (searchTerm) => (annotation) => {
    let standardTerm = searchTerm.toLowerCase()
    let standardMeta = JSON.stringify(annotation).toLowerCase()
    return standardMeta.indexOf(standardTerm) !== -1
  }

  $: filteredList = annotations.filter(contains(searchTerm))
</script>

<style>
  h2 {
    font-size: var(--s-12);
    line-height: calc(1em + 0.75rem);
    margin-bottom: 0;
  }
  p {
    margin: 0;
  }

  .metadata {
    font-size: var(--s-10);
    font-family: 'Input';
    line-height: calc(1em + 0.5rem);
    margin-top: 0.5rem;
    margin-bottom: 1rem;
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
</style>

<Meta  
  title='nikolas.ws: bilbiography'
  description='Notes on writings.'
/>

<h1>Bibliography</h1>

<form>
  <label>
    Search bibliography:
    <input 
      bind:value={searchTerm}
      placeholder="Filter entries …"
      type="text">  
  </label>
</form>

{#each filteredList as annotation}
  {#if annotation.title}
    <section>
      <h2>
        <a href="{annotation.source}">
          {annotation.title}
        </a>
      </h2>
      <div class="metadata">
        <p>
          Author: {annotation.author}
        </p>
        <p>
          Year: {annotation.year}
        </p>
        <p>
          Tagged: {annotation.tags}
        </p>
      </div>
      <p>{annotation.thesis}</p>
      <p><a href="/{annotation.slug}">Annotations ☞</a></p>
    </section>
  {/if}
{/each}