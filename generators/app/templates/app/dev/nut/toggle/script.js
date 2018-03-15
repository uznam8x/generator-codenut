(() => {
    const click = (evt) => {
        evt.currentTarget.classList.toggle('toggle--activate');
    };

    const init = () => {
        const component = document.documentElement.querySelectorAll('[data-codenut="toggle"]');
        _.each(component, (node) => {
            if( !node.getAttribute('data-codenut-status') ){
                node.addEventListener('click', click);
                node.setAttribute('data-codenut-status', 'initialized');
            }
        })
    };

    document.addEventListener('DOMModified', init);
    document.addEventListener('DOMContentLoaded', init);

    if (Codenut.debug) {
        console.log('%ccodenut component : "top" initialize', 'color:#133783');
    }
})();