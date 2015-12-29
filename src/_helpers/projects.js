var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  quotes: '“”‘’'
})
.use(require('markdown-it-highlightjs'))
.use(require('markdown-it-footnote'))
.use(require('markdown-it-emoji'))
.use(require('markdown-it-container'), 'figure')

var typogr = require('typogr');

function isProject (page) {
  return page.url.indexOf('/projects/') > -1
}

function hasDate (page) {
  if (page.date) {
    return true
  }
}

function checkDraft (page) {
  if (page.production && page.draft) {
    return false
  } else {
    return true
  }
}

module.exports = function (site, cb) {
  var projects = site
    .filter(isProject)
    .filter(hasDate)
    .filter(checkDraft)
    .sort(function (a, b) {
      return new Date(b.date) - new Date(a.date)
    })
    .map(function (project) {
      project.description = md.render(project.description)
      project.description = typogr.typogrify(project.description )
      return project
    })
  site = site.map(function (page) {
    page.projects = projects
    return page
  })
  cb(null, site)
}