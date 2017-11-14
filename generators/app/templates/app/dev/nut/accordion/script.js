// jscs:disable maximumLineLength
(($, nut) => {
  'use strict';

  const component = document.documentElement.querySelectorAll('[data-codenut="accordion"]');
  if (component.length) {
    const Accordion = function (el) {
      this.el = el;
      el.setAttribute('data-status', 'true');

      const _this = this;
      const $el = $(el);
      const item = el.querySelectorAll(':scope > .accordion__item');
      const show = (e) => {
        'use strict';

        const target = nut.selector.closest(e.currentTarget, (el) => nut.selector.hasClass(el, 'accordion__item'));
        const bool = nut.selector.hasClass(target, 'accordion--activated');
        const content = target.querySelector(':scope > .accordion__content');

        TweenMax.killTweensOf(content);
        if (bool) {
          TweenMax.to(content, 0.5, { height: 0, display: 'none', ease: Expo.easeOut });
        } else {
          TweenMax.set(content, { height: 'auto', display: 'block' });
          TweenMax.from(content, 0.5, { height: 0, ease: Expo.easeOut });
        }

        target.classList.toggle('accordion--activated');

        e.preventDefault();
        e.stopPropagation();

      };

      $el.on('click', '.accordion__toggle', show);
    };

    _.each(component, function (node, i) {
      if (!node.getAttribute('data-status') || node.getAttribute('data-status') === 'false') {
        const accordion = new Accordion(node);
      }
    });

    if (Codenut.debug) {
      console.log('%ccodenut component : "accordion" initialize', 'color:#133783');
    }
  }

})(jQuery, Codenut);
