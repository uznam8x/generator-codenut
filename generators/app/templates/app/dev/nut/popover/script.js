((nut) => {
    const focus = (evt) => {
        const self = evt.currentTarget;
        TweenMax.killTweensOf(self);
        self.classList.add('popover--visible');
        setTimeout(() => {
            self.classList.add('popover--focus');
        }, 1);

    };

    const blur = (evt) => {
        evt.currentTarget.classList.remove('popover--focus');
        TweenMax.to(evt.currentTarget, 1, {
            onComplete: function () {
                this.target.classList.remove('popover--visible')
            }
        });
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