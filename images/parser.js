const fs = require('fs')
const path = require('path')
const glob = require('glob')
const matter = require('gray-matter')
const MarkdownIt = require('markdown-it')
const mili = require('./images.js')
const hljs = require('highlight.js')
const typeset = require('typeset')
const urlMetadata = require('url-metadata')

// Read content files
const source = () => new Promise((resolve, reject) => {
  let pattern = path.join(process.cwd(), '/content/**/*.md')
  glob(pattern, {}, function (err, result) {
    if (err) { return reject(err, err.stack) }
    return resolve(result)
  })
})

// Parse & Inject Frontmatter
const frontmatter = (file) => {
  let f = matter.read(file)
  let obj = {
    meta: f.data,
    content: f.content,
  }
  let fpath = file.split('/')
  obj.meta.collection = fpath[1] == 'vercel' ? file.split('/')[4] : file.split('/')[6]
  obj.meta.timestamp = Date.parse(obj.meta.date)
  return obj
}

const injectFrontmatter = (files) => files.map(frontmatter)

// Parse markdown
const md = MarkdownIt({
  html: true,
  langPrefix: '',
  highlight: function (code, lang) {
    let highlighted = lang ? hljs.highlight(lang, code) : hljs.highlightAuto(code)
    return highlighted.value
  }
}).use(mili)

const markdown = (file) => {
  file.meta.description ? file.meta.description = md.render(file.meta.description) : file.meta.description = file.meta.description
  file.content ? file.content = md.render(file.content) : file.content = file.content
  return file
}

const renderMarkdown = (files) => files.map(markdown)

// Write JSON blobs
const orderMostRecent = (a, b) => b.meta.timestamp - a.meta.timestamp

const writeErr = (err) => {
  err ? console.error(err) : ()=>{}
}

const writeJSON = (collection) => (files) => {
  let collected = files
    .filter(file => file.meta.collection == collection)
    .filter(file => !file.meta.draft)
    .sort(orderMostRecent)


  let collectionPath = path.join(process.cwd(), `/src/data/${collection}`)

  // Write all data into one array
  let collectionString = JSON.stringify(collected)
  fs.writeFile(`${collectionPath}/index.json`, collectionString, writeErr)

  // Write latest into file
  let latestString = JSON.stringify(collected[0])
  fs.writeFile(`${collectionPath}/latest.json`, latestString, writeErr)

  // Write each into own file
  // collected.forEach(file => {
    // let fileString = JSON.stringify(file)
    // fs.writeFile(`${collectionPath}/${file.meta.slug}.json`, fileString, writeErr)
  // })

  return files
}

const generateResources = (files) => {
  let links = files
    .find(file => file.meta.collection == 'resources')
    ['content']
    .replace(/<li>/gi, '')
    .replace('<ul>', '')
    .replace('</ul>', '')
    .replace(/\n/gi, '')
    .split('</li>')

  // console.log(links)

  let linkPromises = links
    .filter(url => typeof url === 'string')
    .map(url => urlMetadata(`${encodeURI(url)}`, {descriptionLength: 1500}))

  Promise.allSettled(linkPromises)
    .then(results => {
      let data = results
        .filter(result => result.status === 'fulfilled')
        .map((result) => {
          return {
            url: result.value.url,
            title: result.value.title,
            description: result.value.description,
            keywords: result.value.keywords
          }
        })

      let collectionPath = path.join(process.cwd(), `/src/data/resources`)
      fs.writeFile(`${collectionPath}/index.json`, JSON.stringify(data), writeErr)
    })
    .catch(err => {
      console.log('oh no!')
      console.log(err)
    })
}

source()
  .then(injectFrontmatter)
  .then(renderMarkdown)
  .then(writeJSON('projects'))
  .then(writeJSON('texts'))
  .then(writeJSON('bibliography'))
  .then(writeJSON('art'))
  .then(generateResources)
  .catch(e => {
    // console.error(e)
  })