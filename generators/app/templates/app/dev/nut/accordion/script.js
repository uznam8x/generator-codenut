((nut) => {
    const selector = {
        nut:'[data-codenut="accordion"]',
        title:'accordion__title',
        activate:'accordion--activate',
        content:'accordion__content'
    };

    const click = (evt) => {
        evt.preventDefault();
        const COMP = evt.currentTarget.closest(selector.nut);
        const MULTIPLE = (COMP.getAttribute('data-multiple') || 'false') === 'true';
        const LI = evt.currentTarget.closest('li');
        const CONTENT = LI.querySelector('.'+selector.content);
        if (!MULTIPLE) {
            _.each(COMP.querySelectorAll('.'+selector.activate), (el) => {
                let con = el.querySelector('.'+selector.content);
                if( !con.isEqualNode(CONTENT) ){
                    el.classList.remove(selector.activate);
                    TweenMax.to(con, .8, {height: 0, display: 'none', ease: Expo.easeOut});
                }
            })
        }

        if (LI.classList.toggle(selector.activate)) {
            TweenMax.set(CONTENT, {height: "auto", display: 'block'});
            TweenMax.from(CONTENT, .8, {height: 0, display: 'none', ease: Expo.easeOut});
        } else {
            TweenMax.to(CONTENT, .8, {height: 0, display: 'none', ease: Expo.easeOut});
        }
    };

    nut.component('accordion', (node) => {
        _.each(node, (el) => {
            let item = el.querySelectorAll('.accordion__item');
            _.each(item, (instance)=>{
                if( instance.classList.contains(selector.activate) ){
                    TweenMax.set(instance.querySelector('.'+selector.content), {height: "auto", display: 'block'});
                }
                instance.querySelector('.'+selector.title).addEventListener('click', click);
            })
        });
    });
})(Codenut);