var Barba = require('barba.js')

var HideShowTransition = Barba.BaseTransition.extend({
  start: function() {
    document.body.scrollTop = 0;
    Promise
    .all([this.newContainerLoading, this.fadeOut(this.oldContainer)])
    .then(this.fadeIn.bind(this))
  },
  fadeOut: function(element) {
    return new Promise (
      function (resolve, reject) {
        var opacity = 1;
        var timer = setInterval(function () {
          if (opacity <= 0.01) {
            element.style.display = 'none';
            clearInterval(timer);
            resolve()
          }
          element.style.opacity = opacity;
          element.style.filter = 'alpha(opacity=' + opacity * 100 + ")";
          opacity -= opacity * 0.1;
        }, 5);
      }
    );
  },
  fadeIn: function (param) {
    document.body.scrollTop = 0;
    var element = this.newContainer
    this.done()
    return new Promise (
      function (resolve, reject) {
        var opacity = 0.01;
        element.style.opacity = 0;
        element.style.filter = 'alpha(opacity=' + 0 * 100 + ")";
        var timer = setInterval(function () {
          if (opacity >= 1) {
            clearInterval(timer);
            resolve()
          }
          element.style.opacity = opacity;
          element.style.filter = 'alpha(opacity=' + opacity * 100 + ")";
          opacity += opacity + 0.001;
        }, 20);
      }
    );

  }
});

Barba.Pjax.getTransition = function() {
  return HideShowTransition;
};

Barba.Prefetch.init();
Barba.Pjax.start();
