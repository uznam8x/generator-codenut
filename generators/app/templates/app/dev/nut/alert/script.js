((nut) => {
    // Event
    nut.Event = _.merge(nut.Event || {}, {
        ALERT_OPEN: "Event.ALERT_OPEN",
        ALERT_CLOSE: "Event.ALERT_CLOSE",
    });

    const open = (id) => {
        const template = document.getElementById('template-alert-' + id);
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
            nut.layer.remove(document.getElementById('template-alert-' + id));
            article.parentNode.removeChild(article);
        }
    };

    nut.component('alert', (node) => {

        document.addEventListener(nut.Event.ALERT_OPEN, (e) => {
            if(e.delegateTarget){
                e.delegateTarget.setAttribute('data-alert-delegate', e.param[0]);
            }
            open(e.param[0]);
        });
        document.addEventListener(nut.Event.ALERT_CLOSE, (e) => {
            close(e.param[0]);
            const delegate = document.querySelector(`[data-alert-delegate="${e.param[0]}"]`);
            delegate.focus();
        });
    });
})(Codenut);