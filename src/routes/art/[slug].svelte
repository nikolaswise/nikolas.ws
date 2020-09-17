<script context="module">
  import texts from '../../data/art/index.json'
  export async function preload({ params }) {
    let slug = params.slug;
    let text = texts.find(proj => proj.meta.slug == slug)
    return {text}
  }
</script>

<script>
  import Meta from '../../components/Meta.svelte'
  export let text
  let title = {text} ? `nikolas.ws: ${text.meta.title}` : 'Art not found.'
  let year = new Date(text.meta.timestamp).getFullYear()

  const splitCDN = (uri) => {
    let imgArr = uri.split('/')
    let filename = imgArr.pop()
    let size = imgArr.pop()
    let base = imgArr.join('/')
    return { base, size, filename }
  }

  const getCDNBase = (uri) => {
    let { base } = splitCDN(uri)
    return base
  }

  const getCDNSize = (uri) => {
    let { size } = splitCDN(uri)
    return size
  }

  const getCDNfilename = (uri) => {
    let { filename } = splitCDN(uri)
    return filename
  }

  let width = `{width}`
  let urlBase = getCDNBase(text.meta.source)
  let filename = getCDNfilename(text.meta.source)  
</script>

<style>
  h1 {
    margin-top: 2rem;
    font-size: var(--s-18);
    line-height: calc(1em + var(--u-6p));
    margin-bottom: 1rem;
  }

  figure {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  picture {
    display: table;
    position: relative;
  }
  img {
    max-height: calc(90vh - 1.5rem);
    max-width: 100%;
    display: block;
    box-shadow: 0 5px 12px 1px rgba(0,0,0,0.1);
  }

</style>

<Meta 
  title='nikolas.ws: art: {title}'
  description={text.meta.description}
  timestamp={text.meta.timestamp}/>

{#if text}
  <figure class="figure">
    <picture>
      <img
        class="figure-image lazyload"
        src="${urlBase}/180x180/${filename}"
        data-optimumx="1.6"
        data-src="{urlBase}/{width}x5000/{filename}"
        data-sizes="auto"
        alt={text.meta.alt} />
    </picture>    
  </figure>
  <h1>
    {text.meta.title} — {year}
  </h1>
  
  {#if text.meta.description}
    {@html text.meta.description}
  {/if}

  <p>
    {text.meta.size} {#if text.meta.edition} — Edition of {text.meta.edition} {/if}
  </p>
{:else}
  <h1>404</h1>
  <p>That's not an art. <a href="/art">See what is.</a></p>
{/if}