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
            const INPUT = el.querySelector('.textfield__input');
            INPUT.addEventListener('focus', focus);
            INPUT.addEventListener('focusout', blur);
            INPUT.addEventListener('input', change);
        });
    });
})(Codenut);