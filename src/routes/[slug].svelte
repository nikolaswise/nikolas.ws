<mark>
  {#if clientSide}
    <mark>hey</mark>
    { new FactorialRace({
      target: document.querySelector(main),
    }) }
  {/if}
</mark>

<script context="module">
  export async function preload({ params }) {
    let slug = params.slug
    return { slug }
  }
</script>

<script>
  import FactorialRace from '../render/factorial-race'

  let clientSide = typeof document != 'undefined'
</script>
