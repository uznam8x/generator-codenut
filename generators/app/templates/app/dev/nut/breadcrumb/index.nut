const fs = require('fs');
const path = require('path');
const _ = require('lodash');

module.exports = {
    breadcrumb:{
        props: {
            type: "",
        },
        beforeCreate: (config)=> {
            let nav = JSON.parse( fs.readFileSync(path.resolve(__dirname, '../../model/nav.json'), 'utf-8') );
            config.props.item = [];
            let filePath = config.file.path.replace('\\', '/').replace('/app/dev', '');

            const find = (model, id = null)=>{
                let result = [];
                id = (id)?id+',':'';
                _.each(model, (node, index)=>{
                    node.index = `${id}${index}`;
                    if(node.link === filePath){
                        result.push(node);
                    }
                    if( node.children && node.children.length ){
                        result = result.concat( find( node.children, node.index ) );
                    }
                });
                return result;
            };

            if (config.props.type.length && nav[config.props.type]) {
                let model = nav[config.props.type];
                let result = find( model );
                if( result.length ){
                    let loc = result[0].index.split(',');
                    loc.reduce((accumulator, value, index, array)=>{
                        accumulator = accumulator[value];
                        config.props.item.push( {title:accumulator.title, link:accumulator.link} );
                        return accumulator.children;
                    }, model);
                }

            }
            return config;
        },

        template: path.resolve(__dirname, './template.html'),
    }
};
