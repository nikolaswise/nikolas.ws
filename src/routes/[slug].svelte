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


{#if data.fm.description}
  <h2>
    {@html data.fm.description}
  </h2>
{:else if data.fm.thesis}
  <h2>
    {@html data.fm.thesis}
  </h2>
{/if}

{ @html data.code }

<script context="module">
  export async function preload({params}) {
    let slug = params.slug
    const r = await this.fetch(`resource?slug=${slug}`);
    const resource = await r.json();
    return { data: resource.data };
  }
</script>

<script>
  export let data
</script>