// jscs:disable maximumLineLength
'use strict';
const gulp = require('gulp');
const path = require('path');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const spawn = require('child_process').spawn;

global.root = path.resolve(__dirname);

const sequence = require('gulp-sequence');
require('./configuation/codenut.js');
require('./configuation/task/sass/script');
require('./configuation/task/webpack/script');
const render = require('./configuation/task/render/script');

let timeout = null;
gulp.task('restart', function () {
  setTimeout(() => {
    const keys = Object.keys(browserSync.instance.io.sockets.connected);
    if (keys.length) {
      spawn('gulp', ['default', '--browser', false], { stdio: 'inherit' });
    } else {
      spawn('gulp', ['default'], { stdio: 'inherit' });
    }

    process.exit();
  },300);
});

const serve = (bool) => {
  let open = true;
  if (bool && bool === 'false') {
    open = false;
  }
  browserSync.init({
    port: 3400,
    open: open,
    server: {
      baseDir: './app/prod',
    },
  });
};

gulp.task('serve', () => {
  serve();
});

gulp.task('watch', () => {
  gulp.watch('app/dev/**/*.html', { cwd: './' }, (file) => {
    render(file.path);
  });
  gulp.watch(['app/dev/**/*.nunjucks', 'app/dev/model/**/*.json'], { cwd: './' }, (file) => {
    sequence('render')((err) => {
      if (err) console.log(err);
    });
  });
  gulp.watch('app/prod/page/**/*.html', { cwd: './' }, () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      browserSync.reload();
    }, 300);
  });
  gulp.watch(['app/dev/**/*.scss'], { cwd: './' }, (file) => {
    sequence('sass')((err) => {
      if (err) console.log(err);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        browserSync.reload('app/prod/stylehseet/**/*.css');
      }, 300);
    });
  });
  gulp.watch(['app/dev/javascript/**/*.js', 'app/dev/nut/**/*.js'], { cwd: './' }, (file) => {
    sequence('webpack')((err) => {
      if (err) console.log(err);
    });
  });

  gulp.watch(['./gulpfile.js', './webpack.config.js', 'app/dev/nut/**/*.nut', 'app/dev/nut/**/*.html'], ['restart']);
});
gulp.task('default', () => {

  let arg = {
    browser: true,
  };

  let index = process.argv.indexOf('--browser');
  if (index !== -1) {
    arg.browser = process.argv[index + 1];
  }

  sequence('sass', 'webpack', 'watch')((err) => {
    if (err) console.log(err);
    serve(arg.browser);
  });
});

