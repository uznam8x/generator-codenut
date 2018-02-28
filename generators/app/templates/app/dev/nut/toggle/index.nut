const path = require('path');

module.exports = {
    toggle: {
        props: {
            activate: false
        },
        template: path.resolve(__dirname, './template.html'),
    }
};
