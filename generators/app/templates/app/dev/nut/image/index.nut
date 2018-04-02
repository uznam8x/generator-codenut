const path = require('path');

module.exports = {
    image:{
        props: {
            width: 320,
            height: 160,
            backgroundColor:'333333',
        },
        template: path.resolve(__dirname, './template.html'),
    }
};