const path = require('path');
module.exports = {
    selectbox: {
        props: {
            name: 'name',
            title: '',
            required: false,
            multiple: false,
            disabled: false,
        },
        beforeCreate:(config)=>{
            return config;
        },

        template: path.resolve(__dirname, './template.html')
    }
};
