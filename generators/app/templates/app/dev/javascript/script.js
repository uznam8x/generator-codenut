require('codenut-js/dist/codenut.min');

require('../nut/navigation/script');

module.exports = (() => {
  window.Codenut = window.Codenut || {};
  Codenut.model = {
    nav: require('../model/nav.json'),
    seo: require('../model/seo.json'),
    skip: require('../model/skip.json')
  }
})();
