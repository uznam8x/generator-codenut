const path = require('path');

module.exports = {
    radiobox: {
        props: {
            name: 'name',
            value: '',
            title: '',
            required: false,
            disabled: false,
            checked: false,
        },

        template: path.resolve(__dirname, './template.html'),
    }
};
