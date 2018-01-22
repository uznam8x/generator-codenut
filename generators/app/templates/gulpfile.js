// jscs:disable maximumLineLength
'use strict';
const gulp = require('gulp');
const path = require('path');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const spawn = require('child_process').spawn;
const compiler = require('codenut-compiler');
const sassGlob = require('gulp-sass-glob');
const sass = require('gulp-sass');
const sequence = require('gulp-sequence');
const through = require('through2');
const glob = require('glob');
const codenut = require('./codenut.config.js');

// SERVER
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
  }, 300);
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


// HTML Compile
const compile = (src) => {
  let dest = src.replace(/\\/g, '/').replace('dev/', 'prod/');
  let locate = dest.split('/');
  locate.splice(-1, 1);
  dest = locate.join('/').replace('**', '');
  return gulp.src([src, '!./app/dev/nut/**/*.html'])
    .pipe(compiler.html({
      path: ['./app/dev']
    }))
    .pipe(gulp.dest(dest))
};

gulp.task('compile', () => compile('./app/dev/**/*.html'));


// SCSS
const option = {
  outputStyle: 'compressed', // expanded
  includePaths: [
    './node_modules/codenut-style/scss/',
    './app/dev/stylesheet/',
  ],
};

gulp.task('scss', () => {
    return gulp.src(['./app/dev/stylesheet/**/*.scss', './app/dev/**/*.scss'])
      .pipe(sassGlob())
      .pipe(sass(option).on('error', (err) => {
        console.log(err);
      }))
      .pipe(gulp.dest('./app/prod/resource/stylesheet/'))
  }
);


// WEBPACK
const webpack = require('webpack-stream');
gulp.task('webpack', () => gulp.src('./app/dev/javascript/script.js')
  .pipe(webpack(require('./webpack.config.js')))
  .pipe(gulp.dest('./app/prod/resource/javascript'))
);


// WATCH
gulp.task('watch', () => {
  // html
  gulp.watch('app/dev/**/*.html', { cwd: './' }, (file) => {
    compile(file.path);
  });
  gulp.watch(['app/dev/**/*.nunjucks', 'app/dev/model/**/*.json'], { cwd: './' }, (file) => {
    sequence('compile')((err) => {
      if (err) console.log(err);
    });
  });
  gulp.watch('app/prod/page/**/*.html', { cwd: './' }, () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      browserSync.reload();
    }, 300);
  });

  // style
  gulp.watch(['app/dev/**/*.scss'], { cwd: './' }, (file) => {
    sequence('scss')((err) => {
      if (err) console.log(err);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        browserSync.reload('app/prod/stylehseet/**/*.css');
      }, 300);
    });
  });

  // javascript
  gulp.watch(['app/dev/javascript/**/*.js', 'app/dev/nut/**/*.js'], { cwd: './' }, (file) => {
    sequence('webpack')((err) => {
      if (err) console.log(err);
    });
  });

  gulp.watch(['./gulpfile.js', './webpack.config.js', 'app/dev/nut/**/*.nut', 'app/dev/nut/**/*.html'], ['restart']);
});


/* ## Default ## */
gulp.task('default', () => {
  let arg = {
    browser: true,
  };

  let index = process.argv.indexOf('--browser');
  if (index !== -1) {
    arg.browser = process.argv[index + 1];
  }

  sequence('scss', 'webpack', 'watch')((err) => {
    if (err) console.log(err);
    serve(arg.browser);
  });
});

