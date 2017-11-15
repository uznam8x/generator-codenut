// jscs:disable maximumLineLength
const gulp = require('gulp');
const sequence = require('gulp-sequence');
const webpack = require('webpack-stream');
const sassGlob = require('gulp-sass-glob');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const nunjucksRender = require('gulp-nunjucks-render');
const prettify = require('gulp-prettify');
const beautify = require('js-beautify');
const data = require('gulp-data');
const renderer = require('vue-server-renderer').createRenderer();
const Vue = require('vue');
require('./codenut.js');
const through = require('through2');
const fs = require('fs');
gulp.task('browser-sync', function () {
  browserSync.init({
    port: 3400,
    server: {
      baseDir: './app/prod',
    },
  });
});

gulp.task('webpack', () => gulp.src('./app/dev/javascript/codenut.js')
  .pipe(webpack(require('./webpack.config.js')))
  .pipe(gulp.dest('app/prod/javascript'))
  .pipe(reload({ stream: true }))
);

gulp.task('sass', () => {
  const option = {
    outputStyle: 'expanded', // compressed
    includePaths: ['./node_modules/codenut-style/scss/', './app/dev/stylesheet/'],
  };
  return gulp.src('./app/dev/stylesheet/**/*.scss')
    .pipe(sassGlob())
    .pipe(sass(option).on('error', sass.logError))
    .pipe(gulp.dest('./app/prod/stylesheet/'))
    .pipe(reload({ stream: true }));
});

const baseHTML = (str) => {
  'use strict';
  let el = str
    .replace(/data-server-rendered="true"/g, '')
    .replace(/[a-z]+="\s*"/g, '')
    .replace(/<!---->/g, '')

    .replace(/<br(.*?)>/g, '<br $1/>')
    .replace(/<hr(.*?)>/g, '<hr $1/>');

  const mixed = function (attr, value) {
    const match = value.match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g);
    if (match !== null) {
      for (let i = 0, len = match.length; i < len; i++) {
        let prop = match[i].replace(/'/g, '').replace(/"/g, '').split('=');
        attr[prop[0]] = prop[1];
      }
    }

    return attr;
  };

  const attribute = (obj) => {
    'use strict';
    let prop = '';
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        prop += key + '="' + obj[key] + '" ';
      }
    }

    return prop;
  };

  el = el
    .replace(
      /<img[^>]*>/g,
      (value) => '<img {{attr}}/>'.replace('{{attr}}', attribute(mixed({ src: '', alt: '' }, value)))
    )
    .replace(
      /<input[^>]*>/g,
      (value) => '<input {{attr}}/>'.replace('{{attr}}', attribute(mixed({
        type: 'text',
        name: '',
        value: '',
      }, value)))
    )
    .replace(
      /<textarea[^>]*>/g,
      (value) => '<textarea {{attr}}>'.replace('{{attr}}', attribute(mixed({ name: '', value: '' }, value)))
    )
    .replace(
      /<select[^>]*>/g,
      (value) => '<select {{attr}}>'.replace('{{attr}}', attribute(mixed({ name: '' }, value)))
    )
    .replace(
      /<option[^>]*>/g,
      (value) => '<option {{attr}}>'.replace('{{attr}}', attribute(mixed({ value: '' }, value)))
    )
    .replace(
      /<iframe[^>]*>/g,
      (value) => '<iframe {{attr}}>'.replace('{{attr}}', attribute(mixed({ src: '', frameborder: '0' }, value)))
    )
    .replace(
      /<main[^>]*>/g,
      (value) => '<main {{attr}}>'.replace('{{attr}}', attribute(mixed({ role: 'main' }, value)))
    )
    .replace(
      /<button[^>]*>/g,
      (value) => '<button {{attr}}>'.replace('{{attr}}', attribute(mixed({ type: 'button' }, value)))
    )
    .replace(
      /<a[^>]*>/g,
      (value) => '<a {{attr}}>'.replace('{{attr}}', attribute(mixed({ href: '#' }, value)))
    )
    .replace(
      /<form[^>]*>/g,
      (value) => '<form {{attr}}>'.replace('{{attr}}', attribute(mixed({
        name: '',
        method: 'get',
        action: '',
      }, value)))
    );
  return el;
};

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
        throw err;
      }

      markup = beautify.html(baseHTML(rendered), {
        indent_size: 2,
        unformatted: ['pre', 'code', 'xmp'],
        indent_inner_html: true,
      });
    });

    return markup;
  });
};

gulp.task('reload', () => {
  browserSync.reload();
});

gulp.task('nunjucks', () => gulp.src('./app/dev/page/**/*.html')
  .pipe(data(() => ({
      nav: require('./app/dev/model/nav.json'),
      util: {
        date: +new Date(),
      },
    })
  ))
  .pipe(nunjucksRender({
    path: ['./app/dev', './app/dev/element'],
    manageEnv: manageEnvironment,
  }))
  .pipe(through.obj((chunk, enc, callback) => {
    'use strict';
    let html = chunk.contents.toString();

    try {
      const body = html.match(/<body[^>]*>((.|\n)*)<\/body>/gi)[0];
      renderer.renderToString(new Vue({
          template: body,
        }), function (err, rendered) {
          if (err) throw err;
          html = html.replace(/<body[^>]*>((.|\n)*)<\/body>/gi, baseHTML(rendered));
          chunk.contents = new Buffer(html, 'utf8');
        }
      );
      callback(null, chunk);
    } catch (e) {
      chunk.contents = new Buffer('<html></html>', 'utf8');
      callback(null, chunk);
    }

  }))
  .pipe(prettify({
    indent_size: 2,
    unformatted: ['pre', 'code', 'xmp', 'iframe'],
    indent_inner_html: true,
  }))
  .pipe(gulp.dest('./app/prod/page'))
);
gulp.task('watch', () => {
  gulp.watch('app/dev/**/*.+(html|nunjucks)', { cwd: './' }, () => {
    sequence('nunjucks', 'reload')((err) => {
      if (err) console.log(err);
    });
  });
  gulp.watch('app/dev/model/**/*.json', { cwd: './' }, () => {
    sequence('nunjucks', 'reload')((err) => {
      if (err) console.log(err);
    });
  });
  gulp.watch('app/dev/stylesheet/**/*.scss', { cwd: './' }, ['sass']);
  gulp.watch('app/dev/nut/**/*.scss', { cwd: './' }, ['sass']);
  gulp.watch('app/dev/javascript/**/*.js', { cwd: './' }, () => {
    sequence('webpack', 'reload')((err) => {
      if (err) console.log(err);
    });
  });
  gulp.watch('app/dev/nut/**/*.js', { cwd: './' }, () => {
    sequence('webpack', 'reload')((err) => {
      if (err) console.log(err);
    });
  });
});

gulp.task('default', ['nunjucks', 'sass', 'webpack', 'watch', 'browser-sync']);
