((nut) => {
    const change = (evt) => {
        const target = evt.currentTarget;
        const nut = evt.currentTarget.closest('[data-codenut="selectbox"]');
        nut.classList.add('selectbox--selected');
        nut.querySelector('.selectbox__title').innerText = target.options[target.selectedIndex].text;
    };

    nut.component('selectbox', (node) => {
        _.each(node, (el) => {
            const select = el.querySelector('.selectbox__select');
            select.addEventListener('change', change);
        });
    });
})(Codenut);