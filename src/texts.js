// import all from '../texts/**/*.md'
let all = []

const byTimestamp = (a, b) => b.metadata.timestamp - a.metadata.timestamp

export const texts = all
  .map(text => {
    text.metadata.timestamp = Date.parse(text.metadata.date.replace(/\./gi, '-'))
    return text
  })
  .sort(byTimestamp)

export const getText = (slug) => texts.find(text => text.metadata.slug == slug)
