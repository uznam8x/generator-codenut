const fs = require('fs');
const Vue = require('vue');
const path = require('path');
const _ = require('lodash');
const nut = require('codenut-compiler').nut;
const cheerio = require('cheerio');

nut.register('bind', {
    props: {
        uri: '',
        base:'nut/bind/partial',
    },

    template: fs.readFileSync(path.resolve(__dirname, './template.html'), 'utf-8'),
});

module.exports = this;
