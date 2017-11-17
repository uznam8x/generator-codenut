(($, _, nut) => {
  'use strict';
  const component = document.documentElement.querySelectorAll('[data-codenut="daum-postcode"]');
  if (component.length) {

    let post = null;
    let $frame = null;
    let ready = false;
    const search = (e) => {
      $frame = $(e.currentTarget).closest('[data-codenut="daum-postcode"]');
      if (ready) {
        post = new daum.Postcode({
          oncomplete: (data) => {
            $frame.find('input[name]').each((i, node) => {
              node.value = data[node.name] || '';
              $(node).trigger({ type: 'input' });
            });
            close();
          },
        }).embed($frame.find('.daum-postcode-layer__iframe')[0]);
        $frame.find('.daum-postcode-layer')[0].style.display = 'block';
      } else {
        alert('다음 우편번호 서비스가 로드 되지 않았습니다.');
      }
    };

    const close = () => {
      $frame.find('.daum-postcode-layer')[0].style.display = 'none';
      $frame.find('.daum-postcode-layer__iframe').children().last().remove();
    };

    const init = () => {
      daum.postcode.load(() => {
        ready = true;
      });
      nut.$dom.on('click', '.daum-postcode__search', search);
      nut.$dom.on('click', '.daum-postcode-layer__close', close);
    };

    const dependency = document.querySelector('script[src$="postcode.v2.js"]');
    if (!dependency) {

      let script = document.createElement('script');
      script.src = '//dmaps.daum.net/map_js_init/postcode.v2.js';
      script.onload = setTimeout(init, 1000);
      script.async = true;
      document.getElementsByTagName('head')[0].appendChild(script);
    } else {
      init();
    }

    if (Codenut.debug) {
      console.log('%ccodenut component : "daum-postcode" initialize', 'color:#133783');
    }
  }
})(jQuery, _, Codenut);
