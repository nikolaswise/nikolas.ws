const splitCDN = (uri) => {
  let imgArr = uri.split('/')
  let filename = imgArr.pop()
  let size = imgArr.pop()
  let base = imgArr.join('/')
  return { base, size, filename }
}

const getCDNBase = (uri) => {
  let { base } = splitCDN(uri)
  return base
}

const getCDNSize = (uri) => {
  let { size } = splitCDN(uri)
  return size
}

const getCDNfilename = (uri) => {
  let { filename } = splitCDN(uri)
  return filename
}

const smImg = (md, config = {}) => (tokens, idx, options, env, self) => {
  let token = tokens[idx]
  let srcIndex = token.attrIndex('src')
  let url = token.attrs[srcIndex][1]
  let alt = md.utils.escapeHtml(token.content)
  let urlBase = getCDNBase(url)
  let filename = getCDNfilename(url)
  return `
    <figure class="figure">
      <picture>
        <img
          class="figure-image lazyload"
          src="${urlBase}/180x180/${filename}"
          data-optimumx="1.6"
          data-src="${urlBase}/{width}x5000/${filename}"
          data-sizes="auto"
          alt="${alt}" />
      </picture>
    </figure>
  `
}

const mdsm = (md, config) => {
  md.renderer.rules.image = smImg(md, config)
}

module.exports = mdsm