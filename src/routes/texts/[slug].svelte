<script context="module">
  import texts from '../../data/texts/index.json'
  export async function preload({ params }) {
    let slug = params.slug;
    let text = texts.find(proj => proj.meta.slug == slug)
    return {text}
  }
</script>

<script>
  import Meta from '../../components/Meta.svelte'
  export let text
  let title = {text} ? `nikolas.ws: ${text.meta.title}` : 'Text not found.'
</script>

<style>
  h2 {
    margin-bottom: 2rem;
    font-style: italic;
    font-size: var(--s-18);
    line-height: calc(1em + var(--u-6p));
  }
</style>


<Meta 
  title='nikolas.ws: {title}'
  type="BlogPosting"
  description={text.meta.description}
  image='foo.bar.baz'
  timestamp={text.meta.timestamp}/>

{#if text}
  <date>{text.meta.date}</date>
  <h1>{text.meta.title}</h1>

  <h2>{@html text.meta.description}</h2>

  {@html text.content}

{:else}

  <h1>404</h1>
  <p>That's not a text. <a href="/texts">See what is.</a></p>
{/if}