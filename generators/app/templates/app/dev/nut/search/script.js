((nut) => {
    nut.component('search', (node) => {
        const request = nut.request();
        _.each(node, (el) => {
            for (let key in request) {
                let field = el.querySelector('.search__field');
                let input = field.querySelector('.textfield__input[name="' + key + '"]');
                if (input && request[key].length) {
                    input.value = decodeURIComponent(request[key]).replace(/\+/g, ' ');
                    field.classList.add('textfield--fill');
                }
            }
        })
    });
})(Codenut);