((nut) => {
    const change = (evt) => {
        const SELECT = evt.currentTarget;
        const COMP = evt.currentTarget.closest('[data-codenut="selectbox"]');
        COMP.classList.add('selectbox--selected');
        COMP.querySelector('.selectbox__title').innerText = SELECT.options[SELECT.selectedIndex].text;
    };

    nut.component('selectbox', (node) => {
        _.each(node, (el) => {
            const select = el.querySelector('.selectbox__select');
            select.addEventListener('change', change);
        });
    });
})(Codenut);