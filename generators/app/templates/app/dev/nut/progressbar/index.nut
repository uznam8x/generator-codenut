const path = require('path');

module.exports = {
    'progressbar': {
        props: {
            value: 0,
            max:0,

        },
        template: path.resolve(__dirname, './template.html'),
    }
};
