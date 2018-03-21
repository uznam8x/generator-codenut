((nut) => {
    const click = (evt) => {
        evt.currentTarget.classList.toggle('toggle--activate');
    };

    nut.component('toggle', (node) => {
        _.each(node, (el) => {
            el.addEventListener('click', click);
        });
    });
})(Codenut);