<script>
  import texts from '../../data/texts/index.json'
</script>

<style>
  
  p {
    margin-bottom: 5rem;
  }
  date {
    margin-bottom: 0rem;
    font-family: "Input";
  }
  h2 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
</style>

<svelte:head>
  <title>Texts</title>
</svelte:head>

<h1>Texts</h1>

{#each texts as text}
  <date>{text.meta.date}</date>
  <h2>
    <a href="/texts/{text.meta.slug}">
      {text.meta.title}
    </a>
  </h2>
  <p>{@html text.meta.description}</p>
{/each}
