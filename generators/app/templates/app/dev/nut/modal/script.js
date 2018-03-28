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
                    document.getElementById(id).focus();
                }, 10);
            }
        }
    };

    const close = (id) => {
        const article = document.getElementById(id);
        if (article) {
            nut.layer.remove(document.getElementById('template-modal-' + id));
            article.parentNode.removeChild(article);
        }
    };

    nut.component('modal', (node) => {
        document.addEventListener(nut.Event.MODAL_OPEN, (e) => {
            if(e.delegateTarget){
                e.delegateTarget.setAttribute('data-modal-delegate', e.param[0]);
            }
            open(e.param[0]);
        });
        document.addEventListener(nut.Event.MODAL_CLOSE, (e) => {
            close(e.param[0]);
            const delegate = document.querySelector(`[data-modal-delegate="${e.param[0]}"]`);
            delegate.focus();
        });
    });
})(Codenut);