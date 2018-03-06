const fs = require('fs');
const path = require('path');
const _ = require('lodash');

module.exports = {
    navigation: {
        props: {
            model: '',
        },
        beforeCreate: (config) => {
            let nav = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../model/nav.json'), 'utf-8'));
            let filePath = config.file.path.replace('\\', '/').replace('/app/dev', '');
            config.props.item = [];
            config.props.template = config.template;

            const find = (model, id = null) => {
                let result = [];
                id = (id) ? id + ',' : '';
                _.each(model, (node, index) => {
                    node.index = `${id}${index}`;
                    if (node.link === filePath) {
                        result.push(node);
                    }
                    if (node.children && node.children.length) {
                        result = result.concat(find(node.children, node.index));
                    }
                });
                return result;
            };


            if (config.props.model.length && nav[config.props.model]) {
                let model = nav[config.props.model];
                let result = find(model);
                if (result.length) {
                    let loc = result[0].index.split(',');
                    loc.reduce((accumulator, value, index, array) => {
                        accumulator = accumulator[value];
                        accumulator.activate = true;
                        //console.log( accumulator );
                        return accumulator.children;
                    }, model);
                }
                config.props.item = model;
            }
            return config;
        },

        template: path.resolve(__dirname, './template.html'),
    }
};
