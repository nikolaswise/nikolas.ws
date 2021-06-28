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
const svelte = require('svelte/compiler');

let collectionPath = path.join(process.cwd(), `/src/data`)

// Read content files
const source = () => new Promise((resolve, reject) => {
  let pattern = path.join(process.cwd(), '/content/*.md')
  glob(pattern, {}, function (err, result) {
    if (err) { return reject(err, err.stack) }
    return resolve(result)
  })
})

const writeErr = (err) => {
  err ? console.error(err) : () => {}
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

const generateResources = async () => {
  let links = await getFile(path.join(process.cwd(), '/content/resources.md'))
  let linkPromises = links
    .replace(/\n/gi, '')
    .split('- ')
    .filter(url => typeof url === 'string')
    .map(url => urlMetadata(`${encodeURI(url)}`, {descriptionLength: 1500}))

  let results = await Promise.allSettled(linkPromises)

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

  fs.writeFile(`${collectionPath}/resources.json`, JSON.stringify(data), writeErr)
}

const svexify = async (paths) => {
  let files = await Promise.allSettled(paths.map(path => getFile(path)))
  let contents = files.map(file => file.value)
  let parsed = await Promise.allSettled(contents.map(content => compile(content)))
  let markups = parsed
    .map(parse => parse.value)
    .filter(file => file.data.fm != undefined)
  return markups
}

const render = (file) => new Promise((resolve, reject) => {
  let md = new MarkdownIt({
    html: true,
    xhtmlOut: true,
  })
  let fm = matter(file.value).data
  try {
    let prerender = matter(file.value)
    let fm = prerender.data
    let html = md.render(prerender.content)
    resolve({
      data: {
        fm: fm,
        code: html
      }
    })
  } catch (e) {
    reject(e)
  }
})

const renderMarkdown = async (paths) => {
  let files = await Promise.allSettled(paths.map(path => getFile(path)))
  let renders = await Promise.allSettled(files.map(file => render(file)))
  let markup = renders.map(render => render.value)
  return markup
}

const orderMostRecent = (a, b) => b.data.fm.timestamp - a.data.fm.timestamp

const writeComponents = (files) => {
  files.forEach(file => {
    console.log(file)
    console.log(`------`)
    fs.writeFile(`${collectionPath}/${file.data.fm.slug}.json`, JSON.stringify(file), writeErr)
  })
  return files
}

const writeSummaries = (files) => {
  let fileMetas = files
    .sort(orderMostRecent)
    .map((file) => file.data.fm)

  fs.writeFile(`${collectionPath}/meta.json`, JSON.stringify(fileMetas), writeErr)

  return files
}

source()
  .then(renderMarkdown)
  .then(writeComponents)
  .then(writeSummaries)
  .catch(e => {
    console.error(e)
  })

generateResources()
  .catch(e => {
    console.error(e)
  })