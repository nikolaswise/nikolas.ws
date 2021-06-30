<Meta
  title='nikolas.ws: {metadata.title}'
  type="BlogPosting"
  description={metadata.description}
  image='foo.bar.baz'
  timestamp={metadata.timestamp} />

{#if metadata.date}
  <date>
    {metadata.date}
  </date>
{/if}

<h1>
  {metadata.title}
</h1>

{#if metadata.site}
  <p>
    <a href="{metadata.site}">See Live Project</a>
  </p>
{/if}

{#if metadata.source &&
     metadata.author &&
     metadata.year &&
     metadata.tags
}
  <div class="metadata">
    <p>
      Source: <a href="{metadata.source}">{metadata.source}</a>
    </p>
    <p>
      Author: {metadata.author}
    </p>
    <p>
      Year: {metadata.year}
    </p>
    <p>
      Tagged: {metadata.tags}
    </p>
  </div>
{/if}

{#if metadata.description && !metadata.media }
  <h2>
    {@html metadata.description}
  </h2>
{:else if metadata.thesis}
  <h2>
    {@html metadata.thesis}
  </h2>
{/if}

{#if metadata.media}
  <figure class="figure">
    <picture>
      <img
        class="figure-image"
        src="{metadata.source}"
        data-optimumx="1.6"
        data-src="{urlBase}/{width}x5000/{filename}"
        data-sizes="auto"
        alt={metadata.alt} />
    </picture>
  </figure>

  { @html metadata.description }
{/if}

{#if metadata.size }
  <p>
    {#if metadata.media}
      { metadata.media },
    {/if}

    {metadata.size}

    {#if metadata.edition}
      — Edition of {metadata.edition}
    {/if}
  </p>
{/if}


<script>
  import Meta from '../components/Meta.svelte'
  export let metadata

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

  let width
  let urlBase
  let filename

  if (metadata.media && metadata.source) {
    width = `{width}`
    urlBase = getCDNBase(metadata.source)
    filename = getCDNfilename(metadata.source)
  }
</script>

<style>
  h1 {
    margin-bottom: 2rem;
    font-size: var(--s-18);
    line-height: calc(1em + var(--u-6p));
    margin-bottom: 1rem;
  }
  h2 {
    margin-bottom: 2rem;
    font-style: italic;
    font-size: var(--s-18);
    line-height: calc(1em + var(--u-6p));
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