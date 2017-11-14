(($, nut) => {
  'use strict';

  const component = document.documentElement.querySelectorAll('[data-codenut="tab"]');
  if (component.length) {
    const Tab = function (el) {
      this.el = el;
      el.setAttribute('data-status', 'true');

      const _this = this;
      const $el = $(el);
      const menu = el.getElementsByClassName('tab__menu__item');
      const content = el.getElementsByClassName('tab__content__item');

      const show = (e) => {
        _.each(menu, (node, i) => {
          node.classList.remove('tab--activated');
        });

        _.each(content, (node, i) => {
          node.classList.remove('tab--activated');
        });

        let index = $(e.currentTarget).parent().index();
        menu[index].classList.add('tab--activated');
        content[index].classList.add('tab--activated');

      };
      $el.on('click', '.tab__menu__link', show);
    };

    _.each(component, function (node, i) {
      if (!node.getAttribute('data-status') || node.getAttribute('data-status') === 'false') {
        const tab = new Tab(node);
      }
    });

    if (Codenut.debug) {
      console.log('%ccodenut component : "accordion" initialize', 'color:#133783');
    }
  }

})(jQuery, Codenut);
