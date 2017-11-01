(function($){
  var component = {};
  window.Codenut = window.Codenut || {};
  $.extend(Codenut, {
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
    })(),

    event:{
      component:{
        init:'codenut_component_init',
        redraw:'codenut_component_redraw',
        destroy:'codenut_component_destroy'
      }
    },
    component:{
      set:function( comp ){
        var guid = Codenut.util.guid();
        component[guid] = comp;
        comp.el.setAttribute('data-codenut-guid', guid);

      },
      get:function( selector ){
        var comp = [];
        $(selector).each( function(i, node){
          var guid = node.getAttribute('data-codenut-guid');
          comp.push( component[ guid ] );
        } );
        return comp;
      }
    },
    util:{
      guid:function() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      },
      uuid:function(){
        var d = new Date().getTime();
        if(window.performance && typeof window.performance.now === "function"){
          d += performance.now();
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
      }
    },
    bem:{
      element:function( target, value ){
        var block = target.name;
        return block+'__'+value;
      },
      modify:function(target, value){
        var block = target.name;
        return block+'--'+value;
      }
    }
  } );

  if( Codenut.request['debug'] && Codenut.request['debug'] === 'true' ) Codenut.debug = true;

  if( Codenut.debug ){
    console.group('codenut dependercy');
    console.log('jQuery : '+(window.jQuery ? 'Loaded' :'Fail'));
    console.log('TweenMax in gsap : '+(window.TweenMax ? 'Loaded' :'Fail'));
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
    if( Codenut.breakpoint ){
      var sh = Codenut.$win.width();
      if( sh >= Codenut.breakpoint.xs ) screen['data-screen-mode'] = 'xs';
      if( sh >= Codenut.breakpoint.sm ) screen['data-screen-mode'] = 'sm';
      if( sh >= Codenut.breakpoint.md ) screen['data-screen-mode'] = 'md';
      if( sh >= Codenut.breakpoint.lg ) screen['data-screen-mode'] = 'lg';
      if( sh >= Codenut.breakpoint.xl ) screen['data-screen-mode'] = 'xl';
    }

    Codenut.screen = {};
    for(var key in screen){
      Codenut.screen[key.replace('data-screen-','')] = screen[key];
    }
    Codenut.$html.attr(screen)
  }
  resize();
  Codenut.$win.resize( resize );
  Codenut.$dom.ready( resize );

  if( Codenut.debug ) console.log('%ccodenut initialize', 'color:#133783; font-weight:bold;');

})(jQuery);
