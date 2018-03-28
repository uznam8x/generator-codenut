const path = require('path');

module.exports = {
    search: {
        props: {
            name:'query',
            value:'',
            placeholder:'search'
        },
        template: path.resolve(__dirname, './template.html'),
    }
};
