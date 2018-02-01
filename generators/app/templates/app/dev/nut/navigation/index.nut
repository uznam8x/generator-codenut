const fs = require('fs');
const Vue = require('vue');
const path = require('path');
const _ = require('lodash');
const nut = require('codenut-compiler').nut;
const cheerio = require('cheerio');

nut.register('navigation', {
  props: {
    type: '',
  },
  created: (el, file) => {
    let cur = file.path.replace(path.dirname(module.parent.filename), '');
    cur = cur.replace('\\', '/').replace('/app/dev', '');

    let $ = cheerio.load(el, {
      ignoreWhitespace: true,
      xmlMode: false,
      lowerCaseTags: true
    });

    const indication = ( node ) => {
      let attr = node.parent.attribs;
      if( attr['data-codenut'] !== 'navigation' ){
        if( node.parent.name !== 'ul' ){
          if( !node.parent.attribs['class'] )node.parent.attribs['class'] = '';
          if( node.parent.attribs['class'].indexOf('navigation--activate') === -1 ){
            node.parent.attribs['class'] += ' navigation--activate';
          }
        }
        indication(node.parent);
      }
    };

    $(`a[href="${cur}"]`).each((index, node) => {
      indication(node);
    });
    el = $.html().replace(/<[\/]?html>|<[\/]?head>|<[\/]?body>/g, '');
    $ = null;
    return el;
  },
  template: fs.readFileSync(path.resolve(__dirname, './template.html'), 'utf-8'),
});

module.exports = this;
