((nut) => {
    const parse = (data) => {
        let obj = {};
        if (data) {
            data = data.replace(/\s/g, '');
            _.each(data.split(';'), (arr) => {

                let attr = arr.split(':');
                if (attr[0]) {
                    obj[attr[0]] = attr[1];
                }
            })
        }
        return obj;
    };

    const Sticky = function (el) {
        const CONTENT = el.getElementsByClassName('sticky__content')[0];
        let offset = nut.element.offset(CONTENT);
        let placeholer = document.createElement('div');
        let activate = false;
        let config = parse(el.getAttribute('data-sticky'));

        const SPACING = config.top ? parseInt(config.top) : 0;
        placeholer.className = "sticky__placeholder";
        placeholer.style.height = offset.height + 'px';
        el.appendChild(placeholer, el);

        let wrap = null;
        let wOffset = {x: 0, y: 0, width: 0, height: 0};
        if (config.wrap === "true") {
            wrap = el.parentNode;
            wrap.style.position = 'relative';
        }

        this.breakpoint = config.breakpoint;

        const resize = () => {
            if (!activate) return;
            placeholer.style.height = CONTENT.offsetHeight + 'px';
            offset = nut.element.offset(placeholer);
            CONTENT.style.width = placeholer.offsetWidth + 'px';
        };

        const scroll = (evt) => {
            let y = nut.screen.scroll.y;
            let top = offset.top + SPACING;
            activate = (y >= top);
            if (activate) {
                el.classList.add('sticky--activate');
                CONTENT.style.top = SPACING + 'px';

                if (wrap) {
                    wOffset = nut.element.offset(wrap);
                    let max = y - (wOffset.top + wOffset.height) + el.offsetHeight + SPACING;
                    if (max >= 0) {
                        CONTENT.style.marginTop = -max + 'px';
                    } else {
                        CONTENT.style.marginTop = 0;
                    }
                }
                resize();
            } else {
                el.classList.remove('sticky--activate');
                el.classList.remove('sticky--hold');
                CONTENT.removeAttribute('style');
            }
        };


        window.addEventListener('resize', scroll);
        document.addEventListener(nut.Event.SCROLL, scroll);


        this.destroy = () => {
            el.removeAttribute('data-codenut-status');
            el.classList.remove('sticky--activate');
            el.classList.remove('sticky--hold');
            CONTENT.removeAttribute('style');
            placeholer.parentNode.removeChild(placeholer);
            window.removeEventListener('resize', scroll);
            document.removeEventListener(nut.Event.SCROLL, scroll);
        }
    };

    let instance = [];
    nut.component('sticky', (node) => {
        _.each(node, (el) => {
            'use strict';
            instance.push(new Sticky(el));
        })
    });

    const point = {xs: 0, sm: 1, md: 2, lg: 3, xl: 4};
    const reset = (e) => {
        const level = point[e.screen.mode];
        let arr = [];
        _.each(instance, (el, index) => {
            if (level < point[el.breakpoint]) {
                el.destroy();
                instance[index] = null;
            }
        });

        instance = _.filter(instance, (node)=>( node !== null ));

        const NODE = document.querySelectorAll('[data-codenut=sticky]');
        _.each(NODE, (el) => {
            const STATUS = el.getAttribute('data-codenut-status');
            const config = parse(el.getAttribute('data-sticky'));
            if((!STATUS || STATUS !== 'initialized') && point[config.breakpoint] <= level ){
                instance.push( new Sticky(el) );
            }
        });
    };

    document.addEventListener(nut.Event.CHANGE_SCREEN, reset);
})(Codenut);