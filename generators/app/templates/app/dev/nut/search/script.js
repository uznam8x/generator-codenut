((nut) => {
    nut.component('search', (node) => {
        const REQUEST = nut.request();
        _.each(node, (el) => {
            for (let key in REQUEST) {
                let field = el.querySelector('.search__field');
                let input = field.querySelector('.textfield__input[name="' + key + '"]');
                if (input && REQUEST[key].length) {
                    input.value = decodeURIComponent(REQUEST[key]).replace(/\+/g, ' ');
                    field.classList.add('textfield--fill');
                }
            }
        })
    });
})(Codenut);