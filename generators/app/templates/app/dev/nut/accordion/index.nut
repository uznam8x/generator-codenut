const fs = require('fs');
const path = require('path');
const _ = require('lodash');

module.exports = {
    accordion: {
        props: {
            model: "",
            multiple: false,
        },
        beforeCreate: (config) => {
            let data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../model/accordion.json'), 'utf-8'));
            if (config.props.model.length && data[config.props.model]) {
                config.props.item = data[config.props.model];
            }
            return config;
        },
        template: path.resolve(__dirname, './template.html'),
    }
};
