const fs = require('fs');
const nut = require('codenut-compiler').nut;
const path = require('path');
nut.register('sns', {
    props: {
        show: '',
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
        config.data.item = [];
        if (config.props.show){
            let icon = config.props.show.split(' ');
            for(let name of icon){
                if( this.data.list.indexOf(name) > -1 ){
                    config.data.item.push({name:name});
                }
            }
        }
        return config;
    },
    template: fs.readFileSync(path.resolve(__dirname, './template.html'), 'utf-8'),
});

module.exports = this;
