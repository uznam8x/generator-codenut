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
        el.classList.add('selectbox--selected');

        let empty = el.getElementsByClassName('selectbox__empty');
        if (empty.length) {
          select.removeChild(empty[0]);
        }

        $el.trigger({ type: 'selectbox_change', codenut: $el });

      };

      $el.on('change', '.selectbox__select', change);
      if (select.querySelector('[selected]')) {
        $(select).trigger({ type: 'change' });
      } else {
        $(select).prepend('<option value="" selected="selected" class="selectbox__empty"></option>');
      }

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
