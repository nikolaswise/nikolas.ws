<script context="module">
  import texts from '../../../data/bibliography/index.json'
  export async function preload({ params }) {
    let slug = params.slug;
    let author = params.author;
    console.log(author, slug)
    let text = texts.find(proj => proj.meta.slug == `${author}/${slug}`)
    return {text}
  }
</script>

<script>
  import Meta from '../../../components/Meta.svelte'
  export let text
  let title = {text} ? text.meta.title} : 'Annotation not found.'
</script>

<style>
  h1 {
    margin-bottom: 2rem;
    font-size: var(--s-18);
    line-height: calc(1em + var(--u-6p));
    margin-bottom: 1rem;
  }
  .metadata {
    font-size: var(--s-10);
    font-family: 'Input';
    line-height: calc(1em + 0.5rem);
    margin-top: 0.5rem;
    margin-bottom: 3rem;
  }
  .metadata p {
    margin: 0;
  }
  .thesis {
    font-size: var(--s-20);
    line-height: calc(1em + var(--u-6p));
    font-style: italic;
    margin-bottom: 3rem;
  }
</style>


<Meta
  title='nikolas.ws: bilbiography: {title}'
  description={text.meta.thesis}
  timestamp={text.meta.timestamp}/>

{#if text}
  <h1>
    {text.meta.title}
  </h1>
  <div class="metadata">
    <p>
      Source: <a href="{text.meta.source}">{text.meta.source}</a>
    </p>
    <p>
      Author: {text.meta.author}
    </p>
    <p>
      Year: {text.meta.year}
    </p>
    <p>
      Tagged: {text.meta.tags}
    </p>
  </div>
  <p class="thesis">{text.meta.thesis}</p>

  {@html text.content}
{:else}
  <h1>404</h1>
  <p>That's not an annotation. <a href="/bibliography">See what is.</a></p>
{/if}