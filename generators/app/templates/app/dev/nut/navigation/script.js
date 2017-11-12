(($, nut) => {
  nut.$dom.on('click', '[data-codenut-component="navigate"] a[href="#"]', (e) => {
    e.preventDefault();
  });

  if (Codenut.debug) {
    console.log('%ccodenut component : "navigate" initialize', 'color:#133783');
  }
})(jQuery, Codenut);
