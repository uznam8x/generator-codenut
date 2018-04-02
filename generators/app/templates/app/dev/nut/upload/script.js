((nut) => {

    // Event
    nut.Event = _.merge(nut.Event || {}, {
        UPLOAD_STATUS: "Event.UPLOAD_STATUS",
        UPLOAD_FILES: "Event.UPLOAD_FILES",
    });

    const UPLOAD = function (form) {
        let input = form.querySelector('.upload__input');
        let status = form.querySelector('.upload__status');
        let submitButton = form.querySelector('.upload__submit');
        let files = [];
        const classes = {
            complete: 'complete',
            progress: 'progress',
            error: 'error',
            abort: 'abort',
        };
        const submit = () => {
            let formData = new FormData();
            _.each(files, function (file) {
                formData.append(input.getAttribute('name'), file);
            });
            send(formData);
        };

        const show = (files) => {
            let feedback = {
                status: 'files',
                action: form.getAttribute('action'),
                files: files,
            };

            document.dispatchEvent(new CustomEvent(nut.Event.UPLOAD_FILES, feedback));
        };

        const send = (data) => {
            input.setAttribute('disabled', 'disabled');

            let req = new XMLHttpRequest();
            req.upload.addEventListener('progress', response);
            req.addEventListener('load', response);
            req.addEventListener('error', response);
            req.addEventListener('abort', response);
            req.open(form.getAttribute('method'), form.getAttribute('action'), true);
            req.send(data);

        };

        const response = (e) => {
            for (let key in classes) {
                form.classList.remove(`upload--${key}`);
            }

            let type = e.type === 'load' ? 'complete' : e.type;
            form.classList.add(`upload--${type}`);

            let feedback = {
                action: form.getAttribute('action'),
            };
            if (e.type === 'progress') {
                status.setAttribute('data-value', e.loaded);
                status.setAttribute('data-max', e.total);
                document.dispatchEvent(new CustomEvent(nut.Event.UPLOAD_STATUS, _.merge(feedback, {
                    status: 'progress',
                    loaded: e.loaded,
                    total: e.total
                })));
            }
            if (e.type === 'error') {
                document.dispatchEvent(new CustomEvent(nut.Event.UPLOAD_STATUS, _.merge(feedback, {status: 'error'})));
            }
            if (e.type === 'abort') {
                document.dispatchEvent(new CustomEvent(nut.Event.UPLOAD_STATUS, _.merge(feedback, {status: 'abort'})));
            }
            if (e.type === 'load') {
                document.dispatchEvent(new CustomEvent(nut.Event.UPLOAD_STATUS, _.merge(feedback, {status: 'complete'})));
            }
            if (e.type === 'load' || e.type === 'error' || e.type === 'abort') {
                input.removeAttribute('disabled');
                e.target.upload.removeEventListener('load', response);
                e.target.removeEventListener('load', response);
                e.target.removeEventListener('error', response);
                e.target.removeEventListener('abort', response);
                e = null;
            }
        };

        const handler = (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (e.type === 'dragover' || e.type === 'dragenter') {
                form.classList.add('upload--dragover');
            }
            if (e.type === 'dragleave' || e.type === 'dragend' || e.type === 'drop') {
                form.classList.remove('upload--dragover');
            }
            if (e.type === 'drop') {
                files = e.dataTransfer.files;
            }
            if (e.type === 'change') {
                files = e.target.files;
            }
            if (e.type === 'drop' || e.type === 'change') {
                if (submitButton) {
                    show(files);
                } else {
                    submit();
                }
            }

            if (e.type === 'submit') {
                e.preventDefault();
                submit();
                return false;
            }
        };

        let event = ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop', 'submit'];
        _.each(event, (task) => {
            form.addEventListener(task, handler);
        });
        input.addEventListener('change', handler);

        this.el = form;
        this.destory = () => {
            _.each(event, (task) => {
                form.removeEventListener(task, handler);
                input.removeEventListener('change', handler);
            });
            form = null;
            files = null;
            input = null;
        }
    };

    const instance = [];
    nut.component('upload', (node) => {
        _.each(node, (el) => {
            instance.push(new UPLOAD(el));
        });
    });
})(Codenut);