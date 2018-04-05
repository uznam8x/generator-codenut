
((nut) => {
    const click = (evt) => {
        const TOGGLE = evt.currentTarget;
        clearTimeout(TOGGLE.timeout);
        if (TOGGLE.classList.contains('toggle--activate')) {
            TOGGLE.classList.remove('toggle--activate');

            TOGGLE.timeout = setTimeout(() => {
                TOGGLE.classList.remove('toggle--hold');
                TOGGLE.dispatchEvent(new CustomEvent('change'));
            }, 1000);
        } else {
            TOGGLE.classList.add('toggle--hold');
            TOGGLE.timeout = setTimeout(() => {
                TOGGLE.classList.add('toggle--activate');
                TOGGLE.dispatchEvent(new CustomEvent('change'));
            }, 1);
        }
    };

    nut.component('toggle', (node) => {
        _.each(node, (el) => {
            el.addEventListener('click', click);
        });
    });
})(Codenut);