module.exports = (()=>{
    'use strict';
    const component = document.querySelectorAll('[data-codenut="top"]');
    if (component.length) {
        const click = (evt)=>{
            let nut = evt.target.className.indexOf('top__button');
            if(nut > -1){
                TweenMax.killTweensOf(window);
                TweenMax.to(window, 0.8, {scrollTo: 0, ease: Expo.easeOut});
            } else {
                if( evt.target.tagName.toLowerCase() !== 'body' ){
                    click( {target:evt.target.parentNode} );
                }
            }
        };
        document.addEventListener('click', click);

        if (Codenut.debug) {
            console.log('%ccodenut component : "top" initialize', 'color:#133783');
        }
    }
})();
