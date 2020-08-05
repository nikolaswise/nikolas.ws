<script>
  import projects from '../../data/projects/index.json'
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
  <title>Projects</title>
</svelte:head>

<h1>Projects</h1>


{#each projects as project}  
  <date>{project.meta.date}</date>
  <h2>
    <a href="/projects/{project.meta.slug}">
      {project.meta.title}
    </a>
  </h2>
  <p>{@html project.meta.description}</p>
{/each}
