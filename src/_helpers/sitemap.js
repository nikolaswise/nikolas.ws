module.exports = function (site, cb) {

  function checkDraft (page) {
    if (page.production && page.draft) {
      return false
    } else {
      return true
    }
  }
  var sitemap = site
  .filter(checkDraft)
  .map(function (page) {
    return {
      title: page.title,
      url: page.url,
      thumbnail: page.thumbnail,
      changefreq: page.changefreq || 'monthly'
    }
  })

  site = site.map(function (page) {
    sitemap.lastBuild = new Date().toString();
    page.sitemap = sitemap
    return page
  })
  cb(null, site)
}