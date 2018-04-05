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
        const MENU = _.filter(ITEM.children, (child) => child.classList.contains('navigation__menu'))[0];
        if (!MENU) {
            ITEM.classList.remove('navigation--focus');

            const parentItem = ITEM.parentNode.closest('.navigation__item');
            if (parentItem) {
                setTimeout(() => {
                    const focused = parentItem.querySelector('.navigation--focus');
                    if (!focused) {
                        parentItem.classList.remove('navigation--focus');
                    }
                }, 1);
            }
        }

        if (MENU) {
            setTimeout(() => {
                const focused = MENU.querySelector('.navigation--focus');
                if (!focused) {
                    ITEM.classList.remove('navigation--focus');
                }
            }, 1);
        }
    };

    const touch = (e) => {
        const NAV = document.querySelectorAll('[data-codenut="navigation"]');
        _.each(NAV, (n) => {
            const iTEM = n.querySelectorAll('.navigation__item');
            _.each(iTEM, (i) => {
                blur({currentTarget: i});
            })
        });

        setTimeout(focus.bind(null, {currentTarget:e.target}), 2);

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
                if (('ontouchstart' in document.documentElement)) {
                    instance.addEventListener('touchstart', touch);
                } else {
                    instance.addEventListener('focus', focus);
                    instance.addEventListener('focusout', blur);
                }
            });
        });
    });
})(Codenut);