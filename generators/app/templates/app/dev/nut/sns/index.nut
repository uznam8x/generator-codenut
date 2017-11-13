const fs = require('fs');
const Vue = require('vue');
const path = require('path');

Vue.component('sns', {
    props: {
      show: {
        default: '',
      },
    },
    data: () => (
      {
        items: [],
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
        ],
      }
    ),
    template: fs.readFileSync(path.resolve(__dirname, './template.html'), 'utf-8'),
    created: function () {
      'use strict';
      const prop = this.$options.propsData;
      if (Object.keys(prop).length) {
        let items = prop.show.split(' ');
        for (let i = 0, len = items.length; i < len; i++) {
          if (this._data.list.indexOf(items[i]) && items[i].replace(/\s/g, '').length) {
            this.items.push(items[i]);
          }
        }
      }
    },
  }
);
module.exports = this;
