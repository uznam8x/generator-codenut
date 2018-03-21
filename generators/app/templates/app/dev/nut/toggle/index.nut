const path = require('path');

module.exports = {
    toggle: {
        props: {
            activate: false,
            class:'',
        },
        template: path.resolve(__dirname, './template.html'),
    }
};
