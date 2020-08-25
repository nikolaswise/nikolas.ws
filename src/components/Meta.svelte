<script>
  import { stores } from '@sapper/app'
  const { page } = stores()

  export let title
  export let description
  export let keywords
  export let schema
  export let canon
  export let type
  export let image
  export let timestamp

  let base = {
    title: `nikolas.ws`,
    indexable: true
  }

  let nikolaswise = {
    "@type": "Person",
    "name": "Nikolas Wise",
    "url": "https://nikolas.ws",
    "image": "https://photos.smugmug.com/Portraits/i-ThnJCF5/0/f9013fdc/X4/wise-X4.jpg",
    "jobTitle": "Web Developer",
    "knowsLanguage": "en, fr",
    "sameAs": [
      "https://twitter.com/nikolaswise",
      "https://github.com/nikolaswise",
      "https://www.instagram.com/nikolaswise/",
      "https://www.linkedin.com/in/nikolas-wise-6b170265/",
    ],
  }

  let json = {
    "@context": "http://schema.org",
    "@type": type,
  };

  if (type == 'Article' || type == 'BlogPosting') {
    let articleSchema = {
      "datePublished": timestamp ? new Date(timestamp).toISOString(): '',
      "dateModified": timestamp ? new Date(timestamp).toISOString() : '',
      "headline": title,
      "author": nikolaswise,
      "image": image
    }
    json = Object.assign(articleSchema, json)
  }

  if (type == 'WebSite') {
    let siteSchema = {
      "@id":"https://nikolas.ws/#website",
      "name":"Nikolas Wise",
      "url":"https://nikolas.ws",
    }
    json = Object.assign(siteSchema, json)
  }

  if (schema) {
    json = Object.assign(schema, json)
  }

  let jsonld = JSON.stringify(json);
  let jsonldScript = `<script type="application/ld+json">${jsonld +
    "<"}/script>`;
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
      content={keywords} />
  {/if}

  {@html jsonldScript}

</svelte:head>  