<script context="module">
  import getCollected from '../getCollected'

  let projects = getCollected('project')

  export async function preload({ params }) {
    return { projects }
  }
</script>

<script>
  import Meta from '../../components/Meta.svelte'  
  export let projects
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
  <date>{project.date}</date>
  <h2>
    <a href="/{project.slug}">
      {project.title}
    </a>
  </h2>
  <p>{@html project.description}</p>
{/each}
