(($, _) => {
  'use strict';
  const component = document.documentElement.querySelectorAll('[data-codenut="selectbox"]');
  if (component.length) {
    const Selectbox = function (el) {
      this.el = el;
      el.setAttribute('data-status', 'true');

      const $el = $(el);
      const select = el.getElementsByClassName('selectbox__select')[0];
      const title = el.getElementsByClassName('selectbox__title')[0];

      $el.getValue = () => select.value;
      $el.getText = () => select.options[select.selectedIndex].text;

      const change = (e) => {
        e.preventDefault();
        title.innerText = $el.getText();
        $el.trigger({ type: 'selectbox_change', codenut: $el });
      };

      $el.on('change', '.selectbox__select', change);
      $(select).trigger({ type: 'change' });

      return $el;
    };

    _.each(component, function (node, i) {
      if (!node.getAttribute('data-status') || node.getAttribute('data-status') === 'false') {
        const selectbox = new Selectbox(node);
      }
    });

    if (Codenut.debug) {
      console.log('%ccodenut component : "selectbox" initialize', 'color:#133783');
    }
  }
})(jQuery, _);
