const path = require('path');
const fs = require('fs');
module.exports = {
    skip: {
        props: {
            model:''
        },
        beforeCreate:(config)=>{
            const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../model/skip.json'), 'utf-8'));
            if (config.props.model.length && data[config.props.model]) {
                config.props.item = data[config.props.model];
            }
            return config;
        },
        template: path.resolve(__dirname, './template.html')
    }
};
