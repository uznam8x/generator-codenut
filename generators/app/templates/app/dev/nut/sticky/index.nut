const path = require('path');

module.exports = {
    'sticky': {
        props: {
            wrap: false,
            top: 0,
            breakpoint:'md',
        },
        template: path.resolve(__dirname, './template.html'),
    }
};
