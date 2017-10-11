(function($){
  window.Codenut = {
    debug:false,
    $win:$(window),
    $dom:$(document),
    $html:$('html'),
    $head:$('head'),
    $body:$('body'),
    request:(function(){
      var queryString = {};
      window.location.search.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"), function($0, $1, $2, $3) {
          queryString[$1] = $3;
        }
      );
      return queryString;
    })()
  };

  if( Codenut.request['debug'] && Codenut.request['debug'] === 'true' ) Codenut.debug = true;

  if( Codenut.debug ){
    console.group('codenut dependercy');
    console.log('jQuery : '+(window.jQuery ? 'Loaded' :'Fail'));
    console.log('Greensock : '+(window.TweenMax ? 'Loaded' :'Fail'));
    console.log('MobileDetect : '+(window.MobileDetect ? 'Loaded' :'Fail'));
    console.groupEnd();

    if( Object.keys(Codenut.request).length ){
      console.group('query string');
      for(var key in Codenut.request){
        console.log( key+' : '+Codenut.request[key] );
      }
      console.groupEnd();
    }
  }

  var md = new MobileDetect(window.navigator.userAgent);
  function resize(e){
    var screen = {
      'data-screen-width':Codenut.$win.width(),
      'data-screen-mode':'',
      'data-screen-device':'pc'
    };
    if( md.tablet() ) screen['data-screen-device'] = 'tablet';
    if( md.mobile() ) screen['data-screen-device'] = 'mobile';
    Codenut.screen = {};
    for(var key in screen){
      Codenut.screen[key.replace('data-screen-','')] = screen[key];
    }
    Codenut.$html.attr(screen)
  }
  resize();
  Codenut.$win.resize(resize);

  if( Codenut.debug ) console.log('%ccodenut initialize', 'color:#133783; font-weight:bold;');

})(jQuery);
