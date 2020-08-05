<script>
  import projects from '../data/projects/index.json'
  import latestProject from '../data/projects/latest.json'

  import texts from '../data/texts/index.json'
  import latestText from '../data/texts/latest.json'
  
  let recentTexts = [
    texts[1],
    texts[2],
    texts[3],
    texts[4]
  ]
</script>

<style>
  h1 {
    font-size: var(--s-20);
    line-height: calc(1em + var(--u-6p));
  }
  h2 {
    font-size: var(--s-12);
    margin-top: 5rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: var(--s-14);
  }
  .texts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 2rem;
    grid-column-gap: 2rem;
  }
  .text h3 {
    font-size: var(--s-12);
    margin-bottom: 2rem;

  }

  date {
    font-size: var(--s-8);
    font-family: 'Input';
  }
</style>

<svelte:head>
	<title>nikolas.ws</title>
	<meta name="description" content="Nikolas Wise is …">
</svelte:head>

<h1>
	Nikolas Wise is a web developer, front-end system architect, and creative technologist. 
</h1>

<p>For over 10 years, he has worked on web applications, design systems and component libraries, and customer facing web experiences. with fine artists, design studios, and the R&D wings of technology companies to explore the edges of what's possible.</p>

{#if latestProject}
  <h2>Latest Project</h2>
    
  <h3>
    <a href="/projects/{latestProject.meta.slug}">
      {latestProject.meta.title}
    </a>
  </h3>
  {@html latestProject.meta.description}
  <p>
    <a href="/projects">
      More Projects
    </a>
  </p>
{/if}

{#if latestText}
  <h2>Texts</h2>

  <date>{latestText.meta.date}</date>
  <h3>
    <a href="/texts/{latestText.meta.slug}">
      {latestText.meta.title} — {@html latestText.meta.description}
    </a>
  </h3>
{/if}

<div class="texts">
{#each recentTexts as text}
  <div class="text">
    <date>{text.meta.date}</date>
    <h3>
      <a href="/texts/{text.meta.slug}">
        {text.meta.title}
      </a>
    </h3>  
  </div>
  
{/each}
  
</div>

