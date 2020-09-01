<script>
  import Meta from '../../components/Meta.svelte'  
  import projects from '../../data/projects/index.json'
</script>

<style>
  
  p {
    margin-bottom: 5rem;
  }
  date {
    margin-bottom: 0rem;
  }
  h2 {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }  
</style>

<Meta  
  title='nikolas.ws: projects'
  description='A look at things that have been built.'
/>

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
