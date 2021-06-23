<script context="module">
  import items from '../data/index.json'
  let content = new Map(items)

  export async function preload({ params }) {
    let slug = params.slug;
    let item = content.get(slug)
    return {slug, item}
  }
</script>

<script>
  import Meta from '../components/Meta.svelte'
  export let slug, item
</script>

<date>{item.data.fm.date}</date>
<h1>{item.data.fm.title}</h1>

<h2>{@html item.data.fm.description}</h2>

{@html item.code }
