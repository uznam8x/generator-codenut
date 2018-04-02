((nut) => {



    const percent = (value, max) => (
        (value / max ) * 100 || 0
    );

    const Progressbar = function(el) {
        let value = el.getAttribute('data-value');
        let max = el.getAttribute('data-max');

        const GAUGE = el.querySelector('.progressbar__gauge');
        GAUGE.style.width = percent(value, max) + '%';
        this.el = el;

        let form = el.closest('[data-codenut="upload"]');

        const STATUS = (e) => {
            if (e.action === form.getAttribute('action') && e.status === 'progress') {
                el.setAttribute('data-value', e.loaded);
                el.setAttribute('data-max', e.total);

                GAUGE.style.width = percent(e.loaded, e.total) + '%';
            }
        };

        // UPLOAD progress
        if (nut.Event.UPLOAD_STATUS && form) {
            document.addEventListener(nut.Event.UPLOAD_STATUS, STATUS);
        }

        this.destroy = () => {
            document.removeEventListener(nut.Event.UPLOAD_STATUS, STATUS);
        }
    };

    const instance = [];


    nut.component('progressbar', (node) => {
        _.each(node, (el) => {
            instance.push(new Progressbar(el));
        });
    });
})(Codenut);