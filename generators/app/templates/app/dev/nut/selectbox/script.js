(() => {
    const change = (evt) => {
        const target = evt.currentTarget;
        const nut = evt.currentTarget.closest('[data-codenut="selectbox"]');
        nut.classList.add('selectbox--selected');
        nut.querySelector('.selectbox__title').innerText = target.options[target.selectedIndex].text;
    };

    const init = () => {
        const component = document.documentElement.querySelectorAll('[data-codenut="selectbox"]');
        _.each(component, (node) => {
            if( !node.getAttribute('data-codenut-status') ){
                const select = node.querySelector('.selectbox__select');
                select.addEventListener('change', change);
                node.setAttribute('data-codenut-status', 'initialized');
            }
        })
    };

    document.addEventListener('DOMModified', init);
    document.addEventListener('DOMContentLoaded', init);

    if (Codenut.debug) {
        console.log('%ccodenut component : "selectbox" initialize', 'color:#133783');
    }
})();