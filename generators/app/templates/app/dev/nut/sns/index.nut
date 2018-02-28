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
            _.each(this.data.list, (node) => {
                let match = config.props.slot.default.value.match(new RegExp(`<${node}[^>]*>`, 'g'));
                if (match) {
                    let attribs = {};
                    let attr;
                    while ((attr = reg.exec(match[0])) !== null) {
                        attribs[attr[1]] = attr[2];
                    }
                    config.props.item[node] = attribs;
                }
            });
            return config;
        },
        template: path.resolve(__dirname, './template.html'),
    }
};
