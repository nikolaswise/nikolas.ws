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