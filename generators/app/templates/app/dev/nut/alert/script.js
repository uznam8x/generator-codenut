((nut) => {
    // Event
    nut.Event = _.merge(nut.Event || {}, {
        ALERT_OPEN: "Event.ALERT_OPEN",
        ALERT_CLOSE: "Event.ALERT_CLOSE",
    });

    const open = (id) => {
        const TEMPLATE = document.getElementById('template-alert-' + id);
        if (TEMPLATE) {
            if (!document.getElementById(id)) {
                nut.layer.add(TEMPLATE);
                document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', TEMPLATE.innerHTML.replace(/\n|\t|\r/g, ''));
                setTimeout(() => {
                    const ARTICLE = document.getElementById(id);
                    ARTICLE.focus();
                    ARTICLE.classList.add('alert--activate');
                }, 10);
            }
        }
    };

    const close = (id) => {
        const ARTICLE = document.getElementById(id);
        if (ARTICLE) {
            nut.layer.remove(document.getElementById('template-alert-' + id));
            ARTICLE.classList.remove('alert--activate');
            setTimeout(() => {
                ARTICLE.parentNode.removeChild(ARTICLE);
            },1000);
        }
    };

    const listener = {
        open: (e) => {
            if (e.delegateTarget) {
                e.delegateTarget.setAttribute('data-alert-delegate', e.param[0]);
            }
            open(e.param[0]);
        },
        close: (e) => {
            close(e.param[0]);
            const delegate = document.querySelector(`[data-alert-delegate="${e.param[0]}"]`);
            delegate.focus();
        },
        click: (e) => {
            const COMP = e.target.getAttribute('data-codenut');
            if (COMP === 'alert') {
                close(e.target.getAttribute('id'));
            }
        }
    };

    nut.component('alert', (node) => {
        const EVENT = [
            [nut.Event.ALERT_OPEN, listener.open],
            [nut.Event.ALERT_CLOSE, listener.close],
            ['click', listener.click]
        ];
        _.each(EVENT, (task) => {
            document.removeEventListener(task[0], task[1]);
            document.addEventListener(task[0], task[1]);
        });
    });
})(Codenut);