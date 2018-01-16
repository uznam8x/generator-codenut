// jscs:disable requireSpaceBeforeBlockStatements
module.exports = (($) => {
  'use strict';
  const component = {};
  window.Codenut = window.Codenut || {};
  $.extend(Codenut, {
    debug: false,
    $win: $(window),
    $dom: $(document),
    $html: $('html'),
    $head: $('head'),
    $body: $('body'),
    request: (() => {
      const queryString = {};
      window.location.search.replace(
        new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) => {
          queryString[$1] = $3;
        }
      );
      return queryString;
    })(),
    event: {
      component: {
        init: 'codenut_component_init',
        redraw: 'codenut_component_redraw',
        destroy: 'codenut_component_destroy',
      },
    },
    component: {
      set: (comp) => {
        const guid = Codenut.util.guid();
        component[guid] = comp;
        comp.el.setAttribute('data-codenut-guid', guid);

      },

      get: (selector) => {
        const comp = [];
        $(selector).each((i, node) => {
          const guid = node.getAttribute('data-codenut-guid');
          comp.push(component[guid]);
        });

        return comp;
      },
    },
    util: {
      guid: () => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      },

      uuid: () => {
        let d = new Date().getTime();
        if (window.performance && typeof window.performance.now === 'function') {
          d += window.performance.now();
        }

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          let r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
      },
    },
    bem: {
      element: (target, value) => target.name + '__' + value,
      modify: (target, value) => target.name + '--' + value,
    },
    selector: {
      hasClass: (el, cls) => Codenut.regex.hasClass(cls).test(' ' + el.className + ' '),
      closest: (el, fn) => (el && (fn(el) ? el : Codenut.selector.closest(el.parentNode, fn))),
    },
    regex: {
      hasClass: (cls) => new RegExp('[\\s]' + cls + '[\\s]?', 'g'),
    }
  });

  if (Codenut.request.hasOwnProperty('debug') && Codenut.request.debug === 'true') {
    Codenut.debug = true;
  }

  if (Codenut.debug) {
    console.group('codenut dependercy');
    console.log('jQuery : ' + (window.hasOwnProperty('jQuery') ? 'Loaded' : 'Fail'));
    console.log('TweenMax in gsap : ' + (window.hasOwnProperty('TweenMax') ? 'Loaded' : 'Fail'));
    console.log('MobileDetect : ' + (window.hasOwnProperty('MobileDetect') ? 'Loaded' : 'Fail'));
    console.log('Lodash : ' + (window.hasOwnProperty('_') ? 'Loaded' : 'Fail'));
    console.groupEnd();

    if (Object.keys(Codenut.request).length) {
      console.group('query string');
      for (const key in Codenut.request) {
        if (Codenut.request.hasOwnProperty(key)) {
          console.log(key + ' : ' + Codenut.request[key]);
        }
      }

      console.groupEnd();
    }
  }

  const md = new MobileDetect(window.navigator.userAgent);
  const resize = () => {
    const screen = {
      'data-screen-width': Codenut.$win.width(),
      'data-screen-mode': '',
      'data-screen-device': 'pc',
    };
    if (md.tablet()) screen['data-screen-device'] = 'tablet';
    if (md.mobile()) screen['data-screen-device'] = 'mobile';

    let style = '';
    let scss = null;
    if (window.getComputedStyle && window.getComputedStyle(document.documentElement, '::before')) {
      style = window.getComputedStyle(document.documentElement, '::before');
      style = style.content;
    }

    if (style.length) {
      style = style
        .replace(/^['"]+|\s+|\\|(;\s?})+|['"]$/g, '')
        .replace(/\(/g, '{')
        .replace(/\)/g, '}')
        .replace(/:[\"]?([a-zA-Z0-9]*)([,|\}])/g, ':"$1"$2');
      scss = eval('(' + style + ')');
    }

    if (scss.hasOwnProperty('breakpoint')) {
      const breakpoint = scss.breakpoint;
      Codenut.breakpoint = breakpoint;

      const sh = Codenut.$win.width();
      for (let key in breakpoint) {
        if (breakpoint.hasOwnProperty(key)) {
          breakpoint[key] = parseInt(breakpoint[key]);
        }
      }

      if (sh >= breakpoint.xs) screen['data-screen-mode'] = 'xs';
      if (sh >= breakpoint.sm) screen['data-screen-mode'] = 'sm';
      if (sh >= breakpoint.md) screen['data-screen-mode'] = 'md';
      if (sh >= breakpoint.lg) screen['data-screen-mode'] = 'lg';
      if (sh >= breakpoint.xl) screen['data-screen-mode'] = 'xl';
    }

    Codenut.screen = {};
    for (let key in screen) {
      let prop = key.replace('data-screen-', '');
      Codenut.screen[prop] = screen[key];
    }

    Codenut.$html.attr(screen);
  };

  resize();
  Codenut.$win.resize(resize);
  Codenut.$dom.ready(resize);

  if (Codenut.debug) console.log('%ccodenut initialize', 'color:#133783; font-weight:bold;');

})(jQuery);

require('./loader.js!./loader.js');