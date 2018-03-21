((nut) => {
    const click = (evt) => {
        let nav = evt.currentTarget.closest('[data-codenut="navigation"]');
        nav.classList.toggle('navigation__mobile--activate');
        const uuid = nut.util.uuid();
        nav.setAttribute('data-layer-id',uuid);
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

    nut.component('navigation', (node) => {
        _.each(node, (el) => {
            const mobile = el.querySelector('.navigation__mobile__button');
            mobile.addEventListener('click', click);

            el.addEventListener('click', (e)=>{
                if( e.target.getAttribute('data-codenut') === 'navigation' ){
                    e.target.classList.remove('navigation__mobile--activate');
                    const uuid = e.target.getAttribute('data-layer-id');
                    if( uuid ){
                        nut.layer.remove(uuid);
                    }
                }
            })
            var fixed = document.getElementById('fixed');

            el.addEventListener('touchmove', (e)=> {
                const nav = e.target.closest('[data-codenut="navigation"]') || e.target;
                if( nav.getAttribute('data-codenut') === 'navigation' ) {
                    e.preventDefault();
                }
            }, false);
        });


    });
    window.addEventListener('resize', resize);
})(Codenut);