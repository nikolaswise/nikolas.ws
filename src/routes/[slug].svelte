<Meta
  title='nikolas.ws: {data.fm.title}'
  type="BlogPosting"
  description={data.fm.description}
  image='foo.bar.baz'
  timestamp={data.fm.timestamp} />

{#if data.fm.date}
  <date>
    {data.fm.date}
  </date>
{/if}

<h1>
  {data.fm.title}
</h1>

{#if data.fm.site}
  <p>
    <a href="{data.fm.site}">See Live Project</a>
  </p>
{/if}

{#if data.fm.source &&
     data.fm.author &&
     data.fm.year &&
     data.fm.tags
}
  <div class="metadata">
    <p>
      Source: <a href="{data.fm.source}">{data.fm.source}</a>
    </p>
    <p>
      Author: {data.fm.author}
    </p>
    <p>
      Year: {data.fm.year}
    </p>
    <p>
      Tagged: {data.fm.tags}
    </p>
  </div>
{/if}

{#if data.fm.description && !data.fm.media }
  <h2>
    {@html data.fm.description}
  </h2>
{:else if data.fm.thesis}
  <h2>
    {@html data.fm.thesis}
  </h2>
{/if}

{ @html data.code }

{#if data.fm.media}
  <figure class="figure">
    <picture>
      <img
        class="figure-image"
        src="{data.fm.source}"
        data-optimumx="1.6"
        data-src="{urlBase}/{width}x5000/{filename}"
        data-sizes="auto"
        alt={data.fm.alt} />
    </picture>
  </figure>

  { @html data.fm.description }
{/if}

{#if data.fm.size }
  <p>
    {#if data.fm.media}
      { data.fm.media },
    {/if}

    {data.fm.size}

    {#if data.fm.edition}
      — Edition of {data.fm.edition}
    {/if}
  </p>
{/if}

<script context="module">
  export async function preload({params}) {
    let slug = params.slug
    const r =   await this.fetch(`resource?slug=${slug}`);
    const resource = await r.json();
    return { data: resource.data };
  }
</script>

<script>
  import Meta from '../components/Meta.svelte'
  export let data

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

  if (data.fm.media && data.fm.source) {
    width = `{width}`
    urlBase = getCDNBase(data.fm.source)
    filename = getCDNfilename(data.fm.source)
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