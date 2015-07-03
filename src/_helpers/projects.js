function isProject (page) {
  return page.url.indexOf('/projects/') > -1
}

module.exports = function (site, cb) {
  var projects = site
    .filter(isProject)
    .sort(function (a, b) {
      return new Date(b.date) - new Date(a.date)
    })
    .map(function (project) {
      return project
    })
  site = site.map(function (page) {
    page.projects = projects
    if (isProject(page)) {
      var index = projects.indexOf(page)
      page.prev = projects[index + 1] || projects[0]
      page.next = projects[index - 1] || projects[projects.length - 1]
    }
    return page
  })
  cb(null, site)
}