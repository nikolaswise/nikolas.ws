var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  quotes: '“”‘’'
})
var typeset = require('typeset');

module.exports = function (site, cb) {
  site = site.map(function (page) {
    if (page.isMarkdown) {
      page.content = md.render(page.content)
      page.content = typeset(page.content, {disable: ['hyphenate']})
    }
    return page
  })
  cb(null, site)
}