const path = require('path');
const fs = require('fs');
module.exports = {
    bind:{
        props: {
            uri: '',
            base:'nut/bind/partial',
        },
        beforeCreate:(config)=>{
            config.props.item = JSON.parse(fs.readFileSync(__dirname+'/partial'+config.props.uri+'/model.json', 'utf-8'));
            return config;
        },
        template: path.resolve(__dirname, './template.html'),
    }
};
