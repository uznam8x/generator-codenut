const path = require('path');

module.exports = {
    textfield: {
        props: {
            type: 'text',
            name: 'name',
            value: '',
            title: '',
            placeholder: '',
            readonly: false,
            required: false,
            autocomplete: '',
            maxlength: false,
            disabled: false,
            class: ''
        },

        template: path.resolve(__dirname, './template.html'),
    }
};
