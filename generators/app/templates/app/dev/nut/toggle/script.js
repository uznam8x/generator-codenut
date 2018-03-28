((nut) => {
    const click = (evt) => {
        const toggle = evt.currentTarget;

        clearTimeout(toggle.timeout);
        if (toggle.classList.contains('toggle--activate')) {
            toggle.classList.remove('toggle--activate');

            toggle.timeout = setTimeout(() => {
                toggle.classList.remove('toggle--hold');
                toggle.dispatchEvent(new Event('change'));
            }, 1000);
        } else {
            toggle.classList.add('toggle--hold');
            toggle.timeout = setTimeout(() => {
                toggle.classList.add('toggle--activate');
                toggle.dispatchEvent(new Event('change'));
            }, 1);
        }
    };

    nut.component('toggle', (node) => {
        _.each(node, (el) => {
            el.addEventListener('click', click);
        });
    });
})(Codenut);