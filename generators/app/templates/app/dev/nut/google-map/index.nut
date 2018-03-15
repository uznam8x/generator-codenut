const path = require('path');

module.exports = {
    'google-map':{
        props: {
            address: '',
            zoom: '15',
        },
        template: path.resolve(__dirname, './template.html'),
    }
};
