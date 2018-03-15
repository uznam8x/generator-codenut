(() => {
    const click = (evt) => {
        TweenMax.killTweensOf(window);
        TweenMax.to(window, 0.8, {scrollTo: 0, ease: Expo.easeOut});
    };

    const init = () => {
        const component = document.documentElement.querySelectorAll('[data-codenut="top"]');
        _.each(component, (node) => {
            if( !node.getAttribute('data-codenut-status') ){
                const top = node.querySelector('.top__button');
                top.addEventListener('click', click);
                node.setAttribute('data-codenut-status', 'initialized');
            }
        })
    };

    document.addEventListener('DOMModified', init);
    document.addEventListener('DOMContentLoaded', init);

    if (Codenut.debug) {
        console.log('%ccodenut component : "top" initialize', 'color:#133783');
    }
})();