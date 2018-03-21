((nut) => {
    const click = (evt) => {
        TweenMax.killTweensOf(window);
        TweenMax.to(window, 0.8, {scrollTo: 0, ease: Expo.easeOut});
    };

    nut.component('top', (node) => {
        _.each(node, (el) => {
            el.addEventListener('click', click);
        });
    });
})(Codenut);