const fs = require('fs');
const nut = require('codenut-compiler').nut;
const path = require('path');
const _ = require('lodash');
const $ = require('cheerio');
nut.register('pagination', {
    props: {
        from: 1,
        to: 10
    },
    beforeCreate: (config) => {
        const slot = {
            prev:'',
            next:''
        };
        _.each(config.el.children, (node, index) => {
            if( node.name ){
                let name = node.name.replace('pagination__', '');
                if( slot.hasOwnProperty(name) ){
                    slot[name] = $(node).html();
                }
            }
        });
        config.props.slot = slot;
        return config;
    },
    template: fs.readFileSync(path.resolve(__dirname, './template.html'), 'utf-8'),
});

module.exports = this;