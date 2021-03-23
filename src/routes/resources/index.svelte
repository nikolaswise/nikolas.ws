<script>
  import Meta from '../../components/Meta.svelte'
  import resources from '../../data/resources/index.json'

  let searchTerm = ""

  const contains = (searchTerm) => (text) => {
    let standardTerm = searchTerm.toLowerCase()
    let standardMeta = JSON.stringify(text).toLowerCase()
    return standardMeta.indexOf(standardTerm) !== -1
  }

  $: filteredList = resources.filter(contains(searchTerm))

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
  title='nikolas.ws: resources'
  description='Useful links and things'
/>

<h1>Resources</h1>

<form>
  <label>
    Search resources:
    <input
      bind:value={searchTerm}
      placeholder="Filter entries …"
      type="text">
  </label>
</form>

{#each filteredList as resource}
  <section>
    <h2>
      <a href="{resource.url}">
        {resource.title}
      </a>
    </h2>
    <div class="metadata">
      <p>
        "{resource.description}"
      </p>
  </section>
{/each}