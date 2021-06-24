import items from '../data/index.json'

let content = new Map(items)

const getCollected = (term) => [...content.values()].filter(item => item.data.fm.type.includes(term))

export default getCollected