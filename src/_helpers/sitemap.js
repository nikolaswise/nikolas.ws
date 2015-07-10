module.exports = function (site, cb) {

  function checkDraft (page) {
    if (page.production && page.draft) {
      console.log(page.production, page.draft)
      return false
    } else {
      console.log(page.production, page.draft)
      return true
    }
  }
  var sitemap = site
  .filter(checkDraft)
  .map(function (page) {
    return {
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