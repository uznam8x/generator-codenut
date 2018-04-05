((nut) => {

    const Scrollbar = function (content, track) {
        const HANDLE = track.querySelector('.scrollbar__handle');
        let timeout = null;

        const offset = (target) => ({
            height: ((target === window) ? window.innerHeight : target.offsetHeight ),
        });

        const scroll = (target) => ({
            height: ((target === window) ? document.documentElement.scrollHeight : target.scrollHeight ),
            top:((target === window) ? document.documentElement.scrollTop || window.pageYOffset : target.scrollTop ),
        });

        const draw = () => {
            const HH = (offset(content).height / scroll(content).height) * offset(content).height;
            HANDLE.style.height = HH + 'px';
        };

        const position = () => {
            const CH = scroll(content).height - offset(content).height;
            const HH = (offset(content).height / scroll(content).height) * offset(content).height;
            const Y = (scroll(content).top / CH) * (offset(content).height - HH);
            HANDLE.style.top = Y + 'px';
        };

        const prepare = () => {
            draw();
            position();
        };

        content.addEventListener('scroll', (evt)=>{
            prepare();
            HANDLE.classList.add('scrollbar--activate');
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                HANDLE.classList.remove('scrollbar--activate');
            }, 800);
        });
        window.addEventListener('resize', prepare);
        prepare();

        this.destroy = () => {
            content.removeEventListener('scroll', scroll);
            content = null;
            track = null;
        };
        return this;
    };


    const children = (node, selector) => {
        return _.filter(node.children, (el) => {
            return el.classList.contains(selector);
        });
    };

    let instance = [];

    nut.component('scrollbar', (node) => {
        _.each(node, (el) => {
            let content, track;
            if (el.nodeName.toLowerCase() === 'body') {
                content = window;
                track = _.filter(el.children, (child) => child.classList.contains('scrollbar__track'))[0];
            } else {
                content = _.filter(el.children, (child) => child.classList.contains('scrollbar__content'))[0];
                track = _.filter(el.children, (child) => child.classList.contains('scrollbar__track'))[0];
            }
            instance.push(new Scrollbar(content, track));
        });
    });
})(Codenut);