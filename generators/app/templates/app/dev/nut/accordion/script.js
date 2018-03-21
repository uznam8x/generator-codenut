((nut) => {
    const selector = {
        nut:'[data-codenut="accordion"]',
        title:'accordion__title',
        activate:'accordion--activate',
        content:'accordion__content'
    };

    const click = (evt) => {
        evt.preventDefault();
        const nut = evt.currentTarget.closest(selector.nut);
        const multiple = (nut.getAttribute('data-multiple') || 'false') === 'true';
        const li = evt.currentTarget.closest('li');
        const content = li.querySelector('.'+selector.content);
        if (!multiple) {
            _.each(nut.querySelectorAll('.'+selector.activate), (el) => {
                let con = el.querySelector('.'+selector.content);
                if( !con.isEqualNode(content) ){
                    el.classList.remove(selector.activate);
                    TweenMax.to(con, .8, {height: 0, display: 'none', ease: Expo.easeOut});
                }
            })
        }

        if (li.classList.toggle(selector.activate)) {
            TweenMax.set(content, {height: "auto", display: 'block'});
            TweenMax.from(content, .8, {height: 0, display: 'none', ease: Expo.easeOut});
        } else {
            TweenMax.to(content, .8, {height: 0, display: 'none', ease: Expo.easeOut});
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