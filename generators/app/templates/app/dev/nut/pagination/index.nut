const path = require('path');

module.exports = {
    pagination: {
        props: {
            from: 1,
            to: 10
        },
        template: path.resolve(__dirname, './template.html'),
    }
};