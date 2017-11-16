(($, nut) => {
  'use strict';
  const component = document.documentElement.querySelectorAll('[data-codenut="tab"]');
  if (component.length) {
    nut.$dom.on('click', '[data-codenut="top"] button', (e) => {
      e.preventDefault();

      TweenMax.killTweensOf(window);
      if (nut.screen.device === 'mobile') {
        TweenMax.to(window, 0, { scrollTo: 0, ease: Expo.easeOut });
      } else {
        TweenMax.to(window, 0.8, { scrollTo: 0, ease: Expo.easeOut });
      }

    });

    if (Codenut.debug) {
      console.log('%ccodenut component : "top" initialize', 'color:#133783');
    }
  }

})(jQuery, Codenut);
