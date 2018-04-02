const path = require('path');

module.exports = {
    upload: {
        props: {
            multiple:false,
            name:"file",
        },
        template: path.resolve(__dirname, './template.html'),
    }
};
