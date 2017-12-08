// jscs:disable maximumLineLength
'use strict';
const gulp = require('gulp');
const path = require('path');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
global.root = path.resolve(__dirname);

const sequence = require('gulp-sequence');
require('./configuation/codenut.js');
require('./configuation/task/sass/script');
require('./configuation/task/webpack/script');
const render = require('./configuation/task/render/script');

let timeout = null;
gulp.task('watch', () => {
  browserSync.init({
    port: 3400,
    server: {
      baseDir: './app/prod',
    },
  });

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
  gulp.watch(['app/dev/stylesheet/**/*.scss', 'app/dev/nut/**/*.scss'], { cwd: './' }, (file) => {
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
});

gulp.task('default', ['sass', 'webpack', 'watch']);
