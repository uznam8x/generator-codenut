const gulp = require('gulp');
const data = require('gulp-data');
const renderer = require('vue-server-renderer').createRenderer();
const Vue = require('vue');
const through = require('through2');
const nunjucksRender = require('gulp-nunjucks-render');
const prettify = require('gulp-prettify');
const beautify = require('js-beautify');
const fs = require('fs');
const path = require('path');
const correction = require('./correction');

const error = (msg) => '<pre class="codenut-render-error">' + msg + '</pre>';
const manageEnvironment = (environment) => {
  environment.addGlobal('merge', () => {
    'use strict';
    if (arguments.length < 2) {
      return {};
    } else {
      const obj = {};
      for (let i = 0, len = arguments.length; i < len; i++) {
        for (let key in arguments[i]) {
          if (arguments[i].hasOwnProperty(key)) {
            obj[key] = arguments[i][key];
          }
        }
      }
      return obj;
    }
  });

  environment.addGlobal('load', (path) => {
    'use strict';
    if (fs.lstatSync(path)) {
      return fs.readFileSync(path, 'utf8').replace(/[\n]?{%[^}]*}[\n]?/g, '');
    }
  });

  environment.addGlobal('render', (markup) => {
    Vue.config.debug = false;
    Vue.config.productionTip = true;
    renderer.renderToString(new Vue({
      template: markup,
    }), function (err, rendered) {
      if (err) {
        markup = error(err);
        //throw err;
      } else {
        markup = beautify.html(correction(rendered), {
          indent_size: 2,
          unformatted: ['pre', 'code', 'xmp'],
          indent_inner_html: true,
        });
      }
    });

    return markup;
  });
};

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const cheerio = require('cheerio');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const async = require('async');
const render = (src) => {
  'use strict';

  let dest = src.replace(/\\/g, '/').replace('dev/', 'prod/');
  let locate = dest.split('/');
  locate.splice(-1, 1);
  dest = locate.join('/').replace('**', '');
  return gulp.src([src, '!' + root + '/app/dev/nut/**/*.html'])
    .pipe(data(() => ({
        nav: require(root + '/app/dev/model/nav.json'),
        seo: require(root + '/app/dev/model/seo.json'),
        util: {
          date: +new Date(),
        },
      })
    ))
    .pipe(nunjucksRender({
      path: [root + '/app/dev'],
      manageEnv: manageEnvironment,
    }))
    .pipe(through.obj((chunk, enc, callback) => {
      'use strict';
      let html = correction.singleTag( chunk.contents.toString() );

      try {

        let $ = cheerio.load(html, {
          ignoreWhitespace: true,
          xmlMode: true,
          lowerCaseTags: true
        });
        let component = [];
        for (let key in Vue.options.components) {
          let comp = $(key);

          if (comp.length) {
            component.push.apply(component, comp);
          }
        }
        if( component.length ){
          async.each(component, (task, next) => {
              renderer.renderToString(new Vue({
                  template: $.html(task),
                }), function (err, rendered) {
                  if (err) {
                    console.log(err);
                  } else {
                    $(task).replaceWith(rendered);
                    next();
                  }
                }
              );

            }, (err) => {
              if (err) {
                console.log(err);
                chunk.contents = new Buffer(error(err), 'utf8');
                callback(null, chunk);
              } else {


                let rendered = entities.decode( correction.render($.html()) );
                chunk.contents = new Buffer(rendered, 'utf8');
                callback(null, chunk);
              }
            }
          );
        } else {
          let rendered = entities.decode( correction.render($.html()) );
          chunk.contents = new Buffer(rendered, 'utf8');
          callback(null, chunk);
        }

      } catch (e) {
        chunk.contents = new Buffer(error(e), 'utf8');
        callback(null, chunk);
      }

    }))
    .pipe(prettify({
      indent_size: 2,
      unformatted: ['pre', 'code', 'xmp'],
      indent_inner_html: true,
    }))
    .pipe(gulp.dest(dest));
};

gulp.task('render', () => render(global.root + '/app/dev/**/*.html'));
module.exports = render;
