
<Meta
  title='nikolas.ws'
  description='Nikolas Wise is a web developer, front-end system architect, and creative technologist.'
  type="WebSite"
/>

<h1>
  Nikolas Wise is a web developer, artist, and front-end system architect in Portland, Oregon.
</h1>

<p>For over 10 years, he has worked on web applications, design systems, and customer facing web experiences with fine artists, design studios, and technology companies. From marketing campaigns to commerce storefronts, client libraries and flagship products, Nikolas works to explore the edges of what's possible.</p>

{#if latestText}
  <div class="latest-text">
    <h2>Latest Texts</h2>

    <date>{latestText.date}</date>
    <h3>
      <a href="/{latestText.slug}">
        {latestText.title}
      </a>
    </h3>
    {@html latestText.description}
  </div>
{/if}

<div class="texts">
{#each recentTexts as text}
  <div class="text">
    <date>{text.date}</date>
    <h3>
      <a href="/{text.slug}">
        {text.title}
      </a>
    </h3>
  </div>

{/each}
</div>

<script>
  import Meta from '../components/Meta.svelte'
  import getCollected from './getCollected'

  let texts = getCollected('text')

  let latestText = texts[0]

  import { event } from '../analytics.js'

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
    margin-top: 3rem;
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
