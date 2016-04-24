var moment = require('moment');

function isText (page) {
  return page.url.indexOf('/texts/') > -1
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
  var texts = site
    .filter(isText)
    .filter(checkDraft)
    .filter(hasDate)
    .sort(function (a, b) {
      return new Date(b.date) - new Date(a.date)
    })
    .map(function (text) {
      return text
    })
  site = site.map(function (page) {
    page.texts = texts
    if (isText(page)) {
      var index = texts.indexOf(page)
      if (hasDate(page)) {
        page.template = '_templates/article.html'
        page.block = 'text'
        page.section = 'article'
        // page.date = moment(page.date).format('MMMM Do, YYYY')
      }
      page.prev = texts[index + 1] || texts[0]
      page.next = texts[index - 1] || texts[texts.length - 1]
    }
    return page
  })
  cb(null, site)
}