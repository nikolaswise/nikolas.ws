import Barba from 'barba.js'

const loadPage = transition => new Promise((resolve, reject) => {
  window.scrollTo(0, 0)
  transition.newContainerLoading
  .then(results => {
    transition.oldContainer.parentNode.removeChild(transition.oldContainer)
    resolve(transition)
  })
})

// Sample Transition:
const animate = transition => new Promise((resolve, reject) => {
  transition.newContainer.setAttribute("style", "visibility: visible; opacity: 1;");
  resolve(transition)
})

const finish = transition => {
  transition.deferred.resolve()
}

const customTransition = Barba.BaseTransition.extend({
  start: function() {
    loadPage(this)
    .then(animate)
    .then(finish)
  }
})

const transition = () => {
  // this pulls the content when user hovers, making it super fast
  Barba.Prefetch.init()
  Barba.Pjax.init()
  Barba.Pjax.getTransition = () => customTransition
}

transition()