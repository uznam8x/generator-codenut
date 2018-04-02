const path = require('path');

module.exports = {
    effect: {
        props: {
            href: '#',
            preset: 'fade',
            class:''
        },
        template: path.resolve(__dirname, './template.html'),
    }
};
