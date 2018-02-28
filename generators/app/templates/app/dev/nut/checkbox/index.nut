const fs = require('fs');
const path = require('path');

module.exports = {
    checkbox:{
        props: {
            name: 'name',
            value: '',
            title: '',
            required:false,
            disabled:false,
            checked:false,
        },

        template: path.resolve(__dirname, './template.html'),
    }
};
