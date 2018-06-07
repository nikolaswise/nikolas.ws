import * as classy from './classy';

export function closest (className, context) {
  var current;
  for (current = context; current; current = current.parentNode) {
    if (current.nodeType === 1 && classy.has(current, className)) {
      break;
    }
  }
  return current;
}

export function nodeListToArray (domNodeList) {
  if (Array.isArray(domNodeList)) {
    return domNodeList;
  } else {
    return Array.prototype.slice.call(domNodeList);
  }
}

export function findElements (query, domNode) {
  var context = domNode || document;
  var elements = context.querySelectorAll(query);
  return nodeListToArray(elements);
}

export function filterArray (value, array) {
  var results = array.filter(function (item) {
    var val = value.toLowerCase();
    var t = item.innerHTML.toLowerCase();
    return t.indexOf(val) !== -1;
  });
  return results;
}
