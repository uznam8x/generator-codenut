((nut) => {
    const focus = (evt) => {
        const self = evt.currentTarget;
        TweenMax.killTweensOf(self);
        self.classList.add('popover--hold');
        clearTimeout(self.timeout);
        self.timeout = setTimeout(() => {
            self.classList.add('popover--activate');
        }, 1);

    };

    const blur = (evt) => {
        const self = evt.currentTarget;
        self.classList.remove('popover--activate');
        clearTimeout(self.timeout);
        self.timeout = setTimeout(()=>{
            self.classList.remove('popover--hold')
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