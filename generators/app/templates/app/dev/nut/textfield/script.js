(($, nut) => {
  'use strict';
  const component = document.documentElement.querySelectorAll('[data-codenut="textfield"]');
  if (component.length) {
    const getTextfield = (el) => nut.selector.closest(el, (node) => node.getAttribute('data-codenut') === 'textfield');

    const input = (e) => {
      const target = e.currentTarget;
      getTextfield(e.currentTarget)
        .classList[((target.value ? 'add' : 'remove'))]('textfield--fill');
    };

    const focus = (e) => {
      let textfield = getTextfield(e.currentTarget);
      getTextfield(e.currentTarget)
        .classList.add('textfield--focus');
    };

    const blur = (e) => {
      let textfield = getTextfield(e.currentTarget);
      getTextfield(e.currentTarget)
        .classList.remove('textfield--focus');
    };

    nut.$dom.on('input', '[data-codenut="textfield"] input', input);
    nut.$dom.on('focusin', '[data-codenut="textfield"] input', focus);
    nut.$dom.on('focusout', '[data-codenut="textfield"] input', blur);

    if (nut.debug) {
      console.log('%ccodenut component : "textfield" initialize', 'color:#133783');
    }
  }
})(jQuery, Codenut);
