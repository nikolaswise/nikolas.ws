<script context="module">
  import projects from '../../data/projects/index.json'
  export async function preload({ params }) {
    let slug = params.slug;
    let project = projects.find(proj => proj.meta.slug == slug)
    return {project}
  }
</script>

<script>
  import Meta from '../../components/Meta.svelte'
  export let project
  let title = {project} ? `nikolas.ws: ${project.meta.title}` : 'Project not found.'
</script>


<style>
  h2 {
    margin-bottom: 2rem;
    font-style: italic;
    font-size: var(--s-18);
    line-height: calc(1em + var(--u-6p));
  }
</style>

<Meta 
  title='nikolas.ws: {title}'
  type="BlogPosting"
  description={project.meta.description}
  image='foo.bar.baz'
  timestamp={project.meta.timestamp}/>

{#if project}
  <date>
    {project.meta.date}
  </date>
  <h1>
    {project.meta.title}
  </h1>

  <p>
    <a href="{project.meta.site}">See Live Project</a>
  </p>

  <h2>
    {@html project.meta.description}
  </h2>


  {@html project.content}
{:else}
  <h1>404</h1>
  <p>That's not a project. <a href="/projects">See what is.</a></p>
{/if}