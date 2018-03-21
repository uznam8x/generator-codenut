((nut) => {
    const click = (evt) => {
        let nav = evt.currentTarget.closest('[data-codenut="navigation"]');
        nav.classList.toggle('navigation__mobile--activate');
        const uuid = nut.util.uuid();
        nav.setAttribute('data-layer-id', uuid);
        nut.layer.add(uuid);
    };

    const resize = (evt) => {
        const mobile = document.querySelectorAll('.navigation__mobile');
        _.each(mobile, (node) => {
            if (getComputedStyle(node).display === 'none') {
                const nav = node.closest('[data-codenut="navigation"]');
                nav.classList.remove('navigation__mobile--activate');
                nut.layer.remove(nav.getAttribute('data-layer-id'));
                nav.removeAttribute('data-layer-id');
            }
        })
    };

    const enter = (evt) => {
        evt.currentTarget.classList.add('navigation--focus');
    };
    const leave = (evt) => {
        evt.currentTarget.classList.remove('navigation--focus');
        evt.currentTarget.removeAttribute('tabIndex');
    };

    const focus = (evt) => {
        //console.log( evt.currentTarget.closest('.navigation__item') );
        const item = evt.currentTarget.closest('.navigation__item');
        item.classList.add('navigation--focus');
    };

    const blur = (evt) => {
        //console.log( evt.currentTarget.closest('.navigation__item') );
        const item = evt.currentTarget.closest('.navigation__item');
        const menu = item.querySelector(':scope > .navigation__menu');
        if( !menu ) {
            item.classList.remove('navigation--focus');

            const parentItem = item.parentNode.closest('.navigation__item');
            if(parentItem){
                setTimeout(()=>{
                    const focused = parentItem.querySelector('.navigation--focus');
                    if( !focused ){
                        parentItem.classList.remove('navigation--focus');
                    }
                },1);
            }
        }

        if( menu ){
            setTimeout(()=>{
                const focused = menu.querySelector('.navigation--focus');
                if( !focused ){
                    item.classList.remove('navigation--focus');
                }
            },1);
        }


    };

    nut.component('navigation', (node) => {
        _.each(node, (el) => {
            const mobile = el.querySelector('.navigation__mobile__button');
            mobile.addEventListener('click', click);

            el.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-codenut') === 'navigation') {
                    e.target.classList.remove('navigation__mobile--activate');
                    const uuid = e.target.getAttribute('data-layer-id');
                    if (uuid) {
                        nut.layer.remove(uuid);
                    }
                }
            });

            const item = el.querySelectorAll('.navigation__item');
            _.each(item, (instance) => {
                instance.addEventListener('mouseenter', enter);
                instance.addEventListener('mouseleave', leave);
                //instance.addEventListener('focusout', leave);
            });

            const link = el.querySelectorAll('.navigation__link');
            _.each(link, (instance) => {
                instance.addEventListener('focus', focus);
                instance.addEventListener('focusout', blur);
                /*instance.addEventListener('mouseenter', focus);
                instance.addEventListener('mouseleave', blur);
                */
            });


            el.addEventListener('touchmove', (e) => {
                const nav = e.target.closest('[data-codenut="navigation"]') || e.target;
                if (nav.getAttribute('data-codenut') === 'navigation') {
                    e.preventDefault();
                }
            }, false);
        });


    });
    window.addEventListener('resize', resize);
})(Codenut);