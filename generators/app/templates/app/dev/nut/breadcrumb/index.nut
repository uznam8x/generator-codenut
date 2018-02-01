const fs = require('fs');
const Vue = require('vue');
const path = require('path');
const _ = require('lodash');
const nut = require('codenut-compiler').nut;
const cheerio = require('cheerio');
nut.register('breadcrumb', {
  props: {
    type: "",
  },
  beforeCreate: (data, props, file) => {
    let cur = file.path.replace(path.dirname(module.parent.filename), '');
    cur = cur.replace('\\', '/').replace('/app/dev', '');

    const map = ( node, el ) => {
      _.each( node, (item, index)=>{
        el += `<li><a href="${item.link}">${item.title}</a>`;
        if( item.children && item.children.length ){
          el += '<ul>';
          el = map( item.children, el );
          el += '</ul>';
        }
        el += '</li>';
      } );
      return el;
    };

    const indication = ( node ) => {
      let attr = node.parent.attribs;
      if( attr['data-codenut'] !== 'breadcrumb' ){
        if( node.parent.name !== 'ul' ){
          if( !node.parent.attribs['class'] ) node.parent.attribs['class'] = '';
          if( node.parent.attribs['class'].indexOf('breadcrumb--activate') === -1 ){
            node.parent.attribs['class'] += ' breadcrumb--activate';
          }
        }
        indication(node.parent);
      }
    };

    if( props.type.length && data.nav[props.type] ){
      let nav = '<ul data-codenut="breadcrumb">'+map(data.nav[props.type], '')+'</ul>';
      let $ = cheerio.load(nav);

      $(`a[href="${cur}"]`).each((index, node) => {
        indication(node);
      });
      data.item = [];
      _.each($('.breadcrumb--activate'), (item, index)=>{
        let link = item.children[0];
        data.item.push( {title:link.children[0].data, link:link.attribs['href']} );
      });

      $ = null;
    }
    return data;
  },

  template: fs.readFileSync(path.resolve(__dirname, './template.html'), 'utf-8'),
});

module.exports = this;
