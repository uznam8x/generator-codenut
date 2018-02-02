const fs = require('fs');
const nut = require('codenut-compiler').nut;
const path = require('path');

nut.register('textfield', {
        props: {
            type: 'text',
            name: 'name',
            value: '',
            title: '',
            placeholder: '',
            readonly: false,
            required:false,
            autocomplete:'',
            maxlength:false,
            disabled:false,
            class:''
        },

        template: fs.readFileSync(path.resolve(__dirname, './template.html'), 'utf-8'),
    }
);
module.exports = this;
