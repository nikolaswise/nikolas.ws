<script context="module">
  // import texts from '../../data/art/index.json'
  export async function preload({ params }) {
    const fs = require('fs')
    const path = require('path')
    const { compile } = require('mdsvex');

    const getFile = (path) => new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })

    let slug = params.slug;

    // get the slug from ../content
    let file = await getFile(`./content/${slug}.md`)
    const parsed = await compile(file);
    console.log(parsed)
    return {slug, parsed}
  }
</script>

<script>
  import Meta from '../components/Meta.svelte'
  export let slug, parsed
</script>

<date>{parsed.data.fm.date}</date>
<h1>{parsed.data.fm.title}</h1>

<h2>{@html parsed.data.fm.description}</h2>

{@html parsed.code }
