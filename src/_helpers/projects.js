var moment = require('moment');

var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  quotes: '“”‘’'
})
.use(require('markdown-it-highlightjs'))
.use(require('markdown-it-footnote'))

var typeset = require('typeset');

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
      project.intro = project.description
      project.description = md.render(project.description)
      project.description = typeset(project.description, {disable: ['hyphenate']})
      project.template = '_templates/project.html'
      project.block = 'text'
      project.section = 'projects'
      return project
    })
  site = site.map(function (page) {
    page.projects = projects
    return page
  })
  cb(null, site)
}