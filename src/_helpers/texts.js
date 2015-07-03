function isText (page) {
  return page.url.indexOf('/texts/') > -1
}

module.exports = function (site, cb) {
  var texts = site
    .filter(isText)
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
      page.template = '_templates/article.html'
      page.block = 'text'
      if (page.date) {
        console.log(page.date.toString())
      }
      page.prev = texts[index + 1] || texts[0]
      page.next = texts[index - 1] || texts[texts.length - 1]
    }
    return page
  })
  cb(null, site)
}