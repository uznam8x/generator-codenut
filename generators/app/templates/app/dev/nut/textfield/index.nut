const path = require('path');

module.exports = {
    textfield: {
        props: {
            type: 'text',
            name: 'name',
            value: '',
            title: '',
            placeholder: '',
            readonly: false,
            required: false,
            autocomplete: '',
            maxlength: false,
            disabled: false,
            class: ''
        },
        beforeCreate:(config)=>{
            if( config.props.value.length ){
                config.props.class += ' textfield--fill'
            }
            return config;
        },
        template: path.resolve(__dirname, './template.html'),
    }
};
