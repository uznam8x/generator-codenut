(($, nut) => {
  'use strict';
  const component = document.documentElement.querySelectorAll('[data-codenut="textfield"]');
  if (component.length) {
    const input = (e) => {
      const target = e.currentTarget;
      target.parentNode.classList[((target.value ? 'add' : 'remove'))]('textfield--fill');
    };

    const focus = (e) => {
      e.currentTarget.parentNode.classList.add('textfield--focus');
    };

    const blur = (e) => {
      e.currentTarget.parentNode.classList.remove('textfield--focus');
    };

    nut.$dom.on('input', '[data-codenut="textfield"] input', input);
    nut.$dom.on('focusin', '[data-codenut="textfield"] input', focus);
    nut.$dom.on('focusout', '[data-codenut="textfield"] input', blur);

    if (nut.debug) {
      console.log('%ccodenut component : "textfield" initialize', 'color:#133783');
    }
  }
})(jQuery, Codenut);
