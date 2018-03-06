const path = require('path');
const _ = require('lodash');

module.exports = {
  sns: {
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
      config.props.item = {};
      let reg = /(\S+)=[\'"]?((?:(?!\/>|>|"|\'|\s).)+)/g;
      delete config.props.slot.default;
      return config;
    },
    template: path.resolve(__dirname, './template.html'),
  }
};
