const fs = require('fs');
const nut = require('codenut-compiler').nut;
const path = require('path');
nut.register('vimeo', {
    props: {
        vid: "",
    },
    template: fs.readFileSync(path.resolve(__dirname, './template.html'), 'utf-8'),
});

module.exports = this;
