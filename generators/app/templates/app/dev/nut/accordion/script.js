(() => {

    const selector = {
        nut:'[data-codenut="accordion"]',
        title:'accordion__title',
        opened:'accordion--opened',
        content:'accordion__content'
    };

    const click = (evt) => {
        evt.preventDefault();
        const nut = evt.currentTarget.closest(selector.nut);
        const multiple = (nut.getAttribute('data-multiple') || 'false') === 'true';
        const li = evt.currentTarget.closest('li');
        const content = li.querySelector('.'+selector.content);
        if (!multiple) {
            _.each(nut.querySelectorAll('.'+selector.opened), (el) => {
                let con = el.querySelector('.'+selector.content);
                if( !con.isEqualNode(content) ){
                    el.classList.remove(selector.opened);
                    TweenMax.to(con, .8, {height: 0, display: 'none', ease: Expo.easeOut});
                }
            })
        }

        if (li.classList.toggle(selector.opened)) {
            TweenMax.set(content, {height: "auto", display: 'block'});
            TweenMax.from(content, .8, {height: 0, display: 'none', ease: Expo.easeOut});
        } else {
            TweenMax.to(content, .8, {height: 0, display: 'none', ease: Expo.easeOut});
        }
    };
    const init = () => {
        const component = document.documentElement.querySelectorAll(selector.nut);
        _.each(component, (node) => {
            if (!node.getAttribute('data-codenut-status')) {
                _.each(node.querySelectorAll('.accordion__item'), (el) => {
                    if( el.classList.contains(selector.opened) ){
                        TweenMax.set(el.querySelector('.'+selector.content), {height: "auto", display: 'block'});
                    }
                    el.querySelector('.'+selector.title).addEventListener('click', click);
                });
                node.setAttribute('data-codenut-status', 'initialized');
            }
        })
    };
    document.addEventListener('DOMModified', init);
    document.addEventListener('DOMContentLoaded', init);
    if (Codenut.debug) {
        console.log('%ccodenut component : "accordion" initialize', 'color:#133783');
    }
})();