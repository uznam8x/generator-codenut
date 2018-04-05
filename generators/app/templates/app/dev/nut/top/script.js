((nut) => {
    const click = (e) => {
        /*if (document.querySelector('html').getAttribute('data-screen-os') === 'androidos') {
            window.scrollTo(0, 0);
        } else {

        }*/
        TweenMax.killTweensOf(window);
        TweenMax.to(window, 0.8, {scrollTo: 0, ease: Expo.easeOut});
    };

    nut.component('top', (node) => {
        _.each(node, (el) => {
            el.addEventListener('click', click);
        });
    });
})(Codenut);