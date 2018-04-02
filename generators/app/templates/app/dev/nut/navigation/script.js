((nut) => {
    const enter = (evt) => {
        evt.currentTarget.classList.add('navigation--focus');
    };
    const leave = (evt) => {
        evt.currentTarget.classList.remove('navigation--focus');
        evt.currentTarget.removeAttribute('tabIndex');
    };

    const focus = (evt) => {
        const ITEM = evt.currentTarget.closest('.navigation__item');
        ITEM.classList.add('navigation--focus');
    };

    const blur = (evt) => {
        const ITEM = evt.currentTarget.closest('.navigation__item');
        const MENU = ITEM.querySelector(':scope > .navigation__menu');
        if( !MENU ) {
            ITEM.classList.remove('navigation--focus');

            const parentItem = ITEM.parentNode.closest('.navigation__item');
            if(parentItem){
                setTimeout(()=>{
                    const focused = parentItem.querySelector('.navigation--focus');
                    if( !focused ){
                        parentItem.classList.remove('navigation--focus');
                    }
                },1);
            }
        }

        if( MENU ){
            setTimeout(()=>{
                const focused = MENU.querySelector('.navigation--focus');
                if( !focused ){
                    ITEM.classList.remove('navigation--focus');
                }
            },1);
        }
    };

    nut.component('navigation', (node) => {
        _.each(node, (el) => {
            const ITEM = el.querySelectorAll('.navigation__item');
            _.each(ITEM, (instance) => {
                instance.addEventListener('mouseenter', enter);
                instance.addEventListener('mouseleave', leave);
            });

            const link = el.querySelectorAll('.navigation__link');
            _.each(link, (instance) => {
                instance.addEventListener('focus', focus);
                instance.addEventListener('focusout', blur);
            });


            el.addEventListener('touchmove', (e) => {
                if(document.querySelector('body').classList.contains('layer--activate')){
                    const nav = e.target.closest('[data-codenut="navigation"]') || e.target;
                    if (nav.getAttribute('data-codenut') === 'navigation') {
                        e.preventDefault();
                    }
                }
            }, false);
        });
    });
})(Codenut);