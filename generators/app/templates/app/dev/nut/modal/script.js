((nut) => {
    // Event
    nut.Event = _.merge(nut.Event || {}, {
        MODAL_OPEN: "Event.MODAL_OPEN",
        MODAL_CLOSE: "Event.MODAL_CLOSE",
    });

    const open = (id) => {
        const template = document.getElementById('template-modal-' + id);
        if (template) {
            if (!document.getElementById(id)) {
                nut.layer.add(template);
                document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', template.innerHTML.replace(/\n|\t|\r/g, ''));
                setTimeout(() => {
                    let article = document.getElementById(id);
                    article.focus();
                    article.classList.add('modal--activate');
                }, 10);
            }
        }
    };

    const close = (id) => {
        const article = document.getElementById(id);
        if (article) {
            nut.layer.remove(document.getElementById('template-modal-' + id));
            article.classList.remove('modal--activate');
            setTimeout(() => {
                article.parentNode.removeChild(article);
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
            let nut = e.target.getAttribute('data-codenut');
            if (nut === 'modal') {
                close(e.target.getAttribute('id'));
            }
        }
    };

    nut.component('modal', (node) => {
        const event = [
            [nut.Event.MODAL_OPEN, listener.open],
            [nut.Event.MODAL_CLOSE, listener.close],
            ['click', listener.click]
        ];
        _.each(event, (task) => {
            document.removeEventListener(task[0], task[1]);
            document.addEventListener(task[0], task[1]);
        });
    });
})(Codenut);