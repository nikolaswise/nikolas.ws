<script>
  import Meta from '../../components/Meta.svelte'
  import texts from '../../data/texts/index.json'
</script>

<style>
  
  p {
    margin-bottom: 5rem;
  }
  date {
    margin-bottom: 0rem;
  }
  h2 {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }
</style>

<Meta  
  title='nikolas.ws: texts'
  description='Essays, explorations, and bad ideas.'
/>

<h1>Texts</h1>

{#each texts as text}
  <date>{text.meta.date}</date>
  <h2>
    <a href="/texts/{text.meta.slug}">
      {text.meta.title}
    </a>
  </h2>
  <p>{@html text.meta.description}</p>
{/each}
