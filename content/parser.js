const fs = require('fs')
const path = require('path')
const glob = require('glob')
const matter = require('gray-matter')
const MarkdownIt = require('markdown-it')
const mili = require('./images.js')
const hljs = require('highlight.js')
const typeset = require('typeset')

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
  file.meta.description = typeset(md.render(file.meta.description))
  file.content = typeset(md.render(file.content))
  return file
}

const renderMarkdown = (files) => files.map(markdown)

// Write JSON blobs
const orderMostRecent = (a, b) => b.meta.timestamp - a.meta.timestamp

const writeJSON = (collection) => (files) => {
  let collected = files
    .filter(file => file.meta.collection == collection)
    .sort(orderMostRecent)


  let collectionPath = path.join(process.cwd(), `/src/data/${collection}`)
  
  let writeErr = (err) => {

  }

  // Write all data into one array
  let collectionString = JSON.stringify(collected)
  fs.writeFile(`${collectionPath}/index.json`, collectionString, writeErr)

  // Write latest into file
  let latestString = JSON.stringify(collected[0])
  fs.writeFile(`${collectionPath}/latest.json`, latestString, writeErr)

  // Write each into own file
  collected.forEach(file => {
    let fileString = JSON.stringify(file)
    fs.writeFile(`${collectionPath}/${file.meta.slug}.json`, fileString, writeErr)
  })

  return files
}

source()
  .then(injectFrontmatter)
  .then(renderMarkdown)
  .then(writeJSON('projects'))
  .then(writeJSON('texts'))