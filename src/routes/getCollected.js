import items from '../data/meta.json'

const getCollected = (term) => items
  .filter(item => typeof item.type != 'undefined')
  .filter(item => !item.draft)
  .filter(item => !item.archived)
  .filter(item => item.type.includes(term))

export default getCollected