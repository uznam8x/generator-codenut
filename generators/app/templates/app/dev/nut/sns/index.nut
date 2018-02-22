const fs = require('fs');
const nut = require('codenut-compiler').nut;
const path = require('path');
const _ = require('lodash');
nut.register('sns', {
  props: {
    symbol: false,
  },
  data: {
    list: [
      'blogger',
      'dribble',
      'evernote',
      'facebook',
      'flicker',
      'google-plus',
      'instagram',
      'kakao-story',
      'kakao-talk',
      'linkedin',
      'naver-blog',
      'youtube',
      'pinterest',
      'rss',
      'share',
      'skype',
      'twitter',
      'vimeo',
      'tistory',
      'github',
    ]
  },
  beforeCreate: function (config) {
    let item = config.el.children.filter((node)=>{
      return node.name;
    });

    if( item.length ){
      config.data.item = [];
      _.each(item, (node) => {
        node.attribs.name = node.name;
        if( !node.attribs.href || node.attribs.href.length === 0 ){
          node.attribs.href = "#";
        }
        config.data.item.push(node.attribs);
      });
    }
    return config;
  },
  template: fs.readFileSync(path.resolve(__dirname, './template.html'), 'utf-8'),
});

module.exports = this;
