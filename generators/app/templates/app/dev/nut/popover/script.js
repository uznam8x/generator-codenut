((nut) => {
    const focus = (evt) => {
        const SELF = evt.currentTarget;
        TweenMax.killTweensOf(SELF);
        SELF.classList.add('popover--hold');
        clearTimeout(SELF.timeout);
        SELF.timeout = setTimeout(() => {
            SELF.classList.add('popover--activate');
        }, 1);

    };

    const blur = (evt) => {
        const SELF = evt.currentTarget;
        SELF.classList.remove('popover--activate');
        clearTimeout(SELF.timeout);
        SELF.timeout = setTimeout(()=>{
            SELF.classList.remove('popover--hold')
        },1000);
    };

    nut.component('popover', (node) => {
        _.each(node, (el) => {
            const title = el.querySelector('.popover__title');
            title.addEventListener('focus', focus);
            title.addEventListener('mouseenter', focus);
            title.addEventListener('mouseleave', blur);
            title.addEventListener('focusout', blur);
        })
    });
})(Codenut);