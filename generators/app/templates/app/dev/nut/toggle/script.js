module.exports = (()=>{
    const component = document.querySelectorAll('[data-codenut="toggle"]');

    if (component.length) {

        document.addEventListener('click', (e)=>{
            let nut = e.target.getAttribute('data-codenut');
            if( nut === 'toggle' ){
                e.target.classList.toggle('toggle--activate');
            }
        });
        if (Codenut.debug) {
            console.log('%ccodenut component : "toggle" initialize', 'color:#133783');
        }
    }
})();