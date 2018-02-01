const fs = require('fs');
const nut = require('codenut-compiler').nut;
const path = require('path');
nut.register('imagery', {
    props: {
        width: 320,
        height: 160,
        backgroundColor:'eeeeee',
    },
    template: fs.readFileSync(path.resolve(__dirname, './template.html'), 'utf-8'),
});

module.exports = this;