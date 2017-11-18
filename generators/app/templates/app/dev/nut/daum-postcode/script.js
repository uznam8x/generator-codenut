(($, _, nut) => {
  'use strict';
  const component = document.documentElement.querySelectorAll('[data-codenut="daum-postcode"]');
  if (component.length) {

    let post = null;
    let $frame = null;
    let ready = false;
    
    const layer = '' +
      '<div id="{{guid}}" class="daum-postcode-layer">\n' +
      '  <div class="daum-postcode-layer__iframe">\n' +
      '    <div class="daum-postcode-layer__head">' +
      '     <h4>우편번호 서비스</h4>' +
      '     <button type="button" class="daum-postcode-layer__close">CLOSE</button></div>\n' +
      '  </div>\n' +
      '</div>';

    const search = (e) => {
      $frame = $(e.currentTarget).closest('[data-codenut="daum-postcode"]');
      if (ready) {

        const guid = nut.util.guid();
        e.currentTarget.setAttribute('data-codenut-guid', guid);
        document.getElementsByTagName('body')[0]
          .insertAdjacentHTML('beforeend', layer.replace('{{guid}}', 'guid-' + guid));

        const wrap = document.getElementById('guid-' + guid);

        post = new daum.Postcode({
          oncomplete: (data) => {
            $frame.find('input[name]').each((i, node) => {
              node.value = data[node.name] || '';
              $(node).trigger({ type: 'input' });
            });
            close();
          },
        }).embed(wrap.getElementsByClassName('daum-postcode-layer__iframe')[0]);
      } else {
        alert('다음 우편번호 서비스가 로드 되지 않았습니다.');
      }
    };

    const close = () => {
      $('.daum-postcode-layer').remove();
      $frame = null;
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
