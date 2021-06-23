const fs = require('fs')
const path = require('path')
const glob = require('glob')
const matter = require('gray-matter')
const MarkdownIt = require('markdown-it')
const { compile } = require('mdsvex');
const mili = require('./images.js')
const hljs = require('highlight.js')
const typeset = require('typeset')
const urlMetadata = require('url-metadata')

// Read content files
const source = () => new Promise((resolve, reject) => {
  let pattern = path.join(process.cwd(), '/content/*.md')
  glob(pattern, {}, function (err, result) {
    if (err) { return reject(err, err.stack) }
    return resolve(result)
  })
})

// Parse Frontmatter
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

// Inject Frontmatter
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

const markdown = async (file) => {
  // change markdown renderer here
  // const parsed = await compile(file);
  file.meta.description ? file.meta.description = md.render(file.meta.description) : file.meta.description = file.meta.description
  file.content ? file.content = md.render(file.content) : file.content = file.content
  return file
}

const renderMarkdown = (files) => {
  console.log(files[0])
  return files.map(markdown)
}

// Write JSON blobs
// const orderMostRecent = (a, b) => b.meta.timestamp - a.meta.timestamp

const writeErr = (err) => {
  err ? console.error(err) : () => {}
}

// const writeJSON = (collection) => (files) => {
//   let collected = files
//     .filter(file => typeof file.meta.type != 'undefined')
//     .filter(file => file.meta.type.includes(collection))
//     .filter(file => !file.meta.draft)
//     .sort(orderMostRecent)
//
//   let collectionPath = path.join(process.cwd(), `/src/data/${collection}`)
//   fs.mkdirSync(collectionPath, {recursive: true})
//
//   // Write all data into one array
//   let collectionString = JSON.stringify(collected)
//   fs.writeFile(`${collectionPath}/index.json`, collectionString, writeErr)
//
//   // Write latest into file
//   let latestString = JSON.stringify(collected[0])
//   fs.writeFile(`${collectionPath}/latest.json`, latestString, writeErr)
//
//   return files
// }

const generateResources = (files) => {
  let links = files
    .find(file => file.meta.collection == 'resources.md')
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
      fs.mkdirSync(collectionPath)
      fs.writeFile(`${collectionPath}/index.json`, JSON.stringify(data), writeErr)
    })
    .catch(err => {
      console.log('oh no!')
      console.log(err)
    })
}

// new content pipeline
const getFile = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})

const svexify = async (paths) => {
  let files = await Promise.allSettled(paths.map(path => getFile(path)))
  let contents = files.map(file => file.value)
  let parsed = await Promise.allSettled(contents.map(content => compile(content)))
  let markups = parsed.map(parse => parse.value)
  return markups
}

const orderMostRecent = (a, b) => b.data.fm.timestamp - a.data.fm.timestamp

const writeJSON = (files) => {
  let orderedFiles = files
    .sort(orderMostRecent)
    .map((file) => [file.data.fm.slug, file])
  // Write all data into one array
  let collectionPath = path.join(process.cwd(), `/src/data/`)
  let collectionString = JSON.stringify(orderedFiles)
  fs.writeFile(`${collectionPath}/index.json`, collectionString, writeErr)

  return files
}

source()
  .then(svexify)
  .then(writeJSON)
  .catch(e => {
    console.error(e)
  })