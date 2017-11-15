(($, nut) => {
  'use strict';
  const component = document.documentElement.querySelectorAll('[data-codenut="navigation"]');
  if (component.length) {
    nut.$dom.on('click', '[data-codenut="navigation"] a[href="#"]', (e) => {
      e.preventDefault();
    });

    if (Codenut.debug) {
      console.log('%ccodenut component : "navigation" initialize', 'color:#133783');
    }
  }
})(jQuery, Codenut);
