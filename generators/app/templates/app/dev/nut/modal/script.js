((nut) => {
    // Event
    nut.Event = _.merge(nut.Event || {}, {
        MODAL_OPEN: "Event.MODAL_OPEN",
        MODAL_CLOSE: "Event.MODAL_CLOSE",
    });

    const open = (id) => {
        const TEMPLATE = document.getElementById('template-modal-' + id);
        if (TEMPLATE) {
            if (!document.getElementById(id)) {
                nut.layer.add(TEMPLATE);
                document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', TEMPLATE.innerHTML.replace(/\n|\t|\r/g, ''));
                setTimeout(() => {
                    let article = document.getElementById(id);
                    article.focus();
                    article.classList.add('modal--activate');
                }, 10);
            }
        }
    };

    const close = (id) => {
        const ARTICLE = document.getElementById(id);
        if (ARTICLE) {
            nut.layer.remove(document.getElementById('template-modal-' + id));
            ARTICLE.classList.remove('modal--activate');
            setTimeout(() => {
                ARTICLE.parentNode.removeChild(ARTICLE);
            },1000);
        }
    };

    const listener = {
        open: (e) => {
            if (e.delegateTarget) {
                e.delegateTarget.setAttribute('data-modal-delegate', e.param[0]);
            }
            open(e.param[0]);
        },
        close: (e) => {
            close(e.param[0]);
            const delegate = document.querySelector(`[data-modal-delegate="${e.param[0]}"]`);
            delegate.focus();
        },
        click: (e) => {
            const COMP = e.target.getAttribute('data-codenut');
            if (COMP === 'modal') {
                close(e.target.getAttribute('id'));
            }
        }
    };

    nut.component('modal', (node) => {
        const EVENT = [
            [nut.Event.MODAL_OPEN, listener.open],
            [nut.Event.MODAL_CLOSE, listener.close],
            ['click', listener.click]
        ];
        _.each(EVENT, (task) => {
            document.removeEventListener(task[0], task[1]);
            document.addEventListener(task[0], task[1]);
        });
    });
})(Codenut);