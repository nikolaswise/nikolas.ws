<script context="module">
  import getCollected from '../getCollected'

  let texts = getCollected('text')

  export async function preload({ params }) {
    return {texts}
  }

</script>

<script>
  import Meta from '../../components/Meta.svelte'
  export let texts
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
  <date>{text.date}</date>
  <h2>
    <a href="/{text.slug}">
      {text.title}
    </a>
  </h2>
  <p>{@html text.description}</p>
{/each}
