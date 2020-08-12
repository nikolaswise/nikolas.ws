<script>
  import { stores } from '@sapper/app'
  const { page } = stores()

  export let title
  export let description
  export let keywords
  export let schema
  export let canon
  export let type
  console.log(`title: ${title}`)
  console.log(`canon: ${canon}`)
  console.log(`description: ${description}`)
  console.log(`keywords: ${keywords}`)
  console.log(`schema: ${schema}`)
  console.log(`type: ${type}`)
</script>

<svelte:head>
  <!-- OpenGraph -->
  <meta 
    property="og:url" 
    content="{canon ? canon : `https://${$page.host}${$page.path}`}" />
  <meta 
    property="og:title" 
    content={title} />
  <meta 
    property="og:description" 
    content={description} />
  <meta 
    property="og:type" 
    content="{type ? type : `website`}" />

  <!-- <meta property="og:image" content={head.thumbnail} /> -->

  <!-- Twitter -->
  <meta 
    name="twitter:card" 
    content="summary_large_image" />
  <meta 
    name="twitter:url" 
    content="{canon ? canon : `https://${$page.host}${$page.path}`}" />
  <meta 
    name="twitter:title" 
    content={title} />
  <meta 
    name="twitter:description" 
    content={description} />
  <meta 
    name="twitter:site" 
    content="@nikolaswise" />    
  <!-- <meta 
    name="twitter:image" 
    content={head.thumbnail} /> -->
  
  <!-- HTML -->
  <title>
    {title}
  </title>
  <meta 
    name="description" 
    content={description} />
  <link 
    rel="canonical" 
    href="{canon ? canon : `https://${$page.host}${$page.path}`}" />
  <meta 
    name="viewport" 
    content="minimal-ui, width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5" />

  {#if keywords}
    <meta 
      name="keywords" 
      content={head.keywords} />
  {/if}

</svelte:head>  