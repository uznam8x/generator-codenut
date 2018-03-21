((nut) => {
    const selector = '[data-codenut="textfield"]';
    const focus = (evt) => {
        evt.currentTarget.closest(selector).classList.add('textfield--focus');
    };

    const blur = (evt) => {
        evt.currentTarget.closest(selector).classList.remove('textfield--focus');
    };

    const change = (evt) => {
        evt.currentTarget.closest(selector).classList[( evt.currentTarget.value.length )?'add':'remove']('textfield--fill');
    };

    nut.component('textfield', (node) => {
        _.each(node, (el) => {
            const input = el.querySelector('.textfield__input');
            input.addEventListener('focus', focus);
            input.addEventListener('focusout', blur);
            input.addEventListener('input', change);
        });
    });
})(Codenut);