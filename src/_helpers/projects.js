var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  quotes: '“”‘’'
})

function isProject (page) {
  return page.url.indexOf('/projects/') > -1
}

function hasDate (page) {
  if (page.date) {
    return true
  }
}

module.exports = function (site, cb) {
  var projects = site
    .filter(isProject)
    .filter(hasDate)
    .sort(function (a, b) {
      return new Date(b.date) - new Date(a.date)
    })
    .map(function (project) {
      project.description = md.render(project.description)
      return project
    })
  site = site.map(function (page) {
    page.projects = projects
    return page
  })
  cb(null, site)
}