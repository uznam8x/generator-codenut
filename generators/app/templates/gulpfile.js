// jscs:disable maximumLineLength
'use strict';
const gulp = require('gulp');
const data = require('gulp-data');
const path = require('path');
const fs = require('fs');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const childProcess = require('child_process');
const spawn = childProcess.spawn;
const compiler = require('codenut-compiler');
const sassGlob = require('gulp-sass-glob');
const sass = require('gulp-sass');
const sequence = require('gulp-sequence');
const through = require('through2');
const glob = require('glob');

// SERVER ///////////////////////////////////////////////////////////////
let timeout = null;
const serve = (bool) => {
  browserSync.init({
    port: 3400,
    open: false,
    server: {
      baseDir: './app/prod',
    },
  });
};

gulp.task('serve', () => {
  serve();
});

/////////////////////////////////////////////////////////////////////////

// HTML Compile /////////////////////////////////////////////////////////
const compile = (src) => {
  let dest = src.replace(/\\/g, '/').replace('dev/', 'prod/');
  let locate = dest.split('/');
  locate.splice(-1, 1);
  dest = locate.join('/').replace('**', '');
  return gulp.src([src, '!./app/dev/nut/**/*.html'])
    .pipe(data(() => ({
        nav: JSON.parse(fs.readFileSync(path.resolve(__dirname, './app/dev/model/nav.json'), 'utf-8')),
        seo: JSON.parse(fs.readFileSync(path.resolve(__dirname, './app/dev/model/seo.json'), 'utf-8')),
        util: {
          date: +new Date(),
        },
      })
    ))
    .pipe(compiler({path: ['./app/dev']}))
    .pipe(gulp.dest(dest));
};

gulp.task('compile', () => compile('./app/dev/**/*.html'));

/////////////////////////////////////////////////////////////////////////

// SCSS /////////////////////////////////////////////////////////////////

const option = {
  outputStyle: 'compressed', // expanded
  includePaths: [
    __dirname+'/node_modules/codenut-style/scss/',
    __dirname+'/app/dev/stylesheet/',
  ],
  errLogToConsole:true,
};

gulp.task('scss', () => gulp.src(['./app/dev/stylesheet/**/*.scss', './app/dev/**/*.scss'])
  .pipe(sassGlob(option))
  .pipe(sass(option).on('error', sass.logError))
  .pipe(gulp.dest('./app/prod/resource/stylesheet/'))
);

/////////////////////////////////////////////////////////////////////////

// WEBPACK //////////////////////////////////////////////////////////////
const webpack = require('webpack-stream');
gulp.task('webpack', () => gulp.src('./app/dev/javascript/*.js')
  .pipe(webpack(require('./webpack.config.js')))
  .on('error', function(err) {
    console.log(err);
    this.emit('end');
  })
  .pipe(gulp.dest('./app/prod/resource/javascript'))
);

/////////////////////////////////////////////////////////////////////////

// WATCH ////////////////////////////////////////////////////////////////
gulp.task('watch', () => {
  // html
  gulp.watch('app/dev/**/*.html', {cwd: './'}, (file) => {
    compile(file.path);
  });
  gulp.watch(['app/dev/**/*.nunjucks', 'app/dev/model/**/*.json'], {cwd: './'}, (file) => {
    sequence('compile')((err) => {
      if (err) console.log(err);
    });
  });
  gulp.watch('app/prod/page/**/*.html', {cwd: './'}, () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      browserSync.reload();
    }, 300);
  });

  // style
  gulp.watch(['app/dev/**/*.scss'], {cwd: './'}, (file) => {
    sequence('scss')((err) => {
      if (err) console.log(err);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        browserSync.reload('app/prod/stylehseet/**/*.css');
      }, 300);
    });
  });

  // javascript
  gulp.watch(['app/dev/javascript/**/*.js', 'app/dev/nut/**/*.js'], {cwd: './'}, (file) => {
    sequence('webpack')((err) => {
      if (err) console.log(err);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        browserSync.reload();
      }, 300);
    });
  });
});

/////////////////////////////////////////////////////////////////////////

// START ////////////////////////////////////////////////////////////////
gulp.task('default', () => {
  let p = null;

  function spawnChildren(e) {
    if (p) {
      p.kill();
      childProcess.exec('node ./node_modules/gulp/bin/gulp.js compile', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
      });
    }

    p = spawn('node', ['./node_modules/gulp/bin/gulp.js', 'start'], {stdio: 'inherit'});
  }

  gulp.watch(
    [
      'app/dev/nut/**/template.html',
      'app/dev/nut/**/*.nut',
      'gulpfile.js',
    ],
    {cwd: './'},
    () => {
      browserSync.exit();
      console.log('Wait for restart');
      setTimeout(spawnChildren, 100);
    }
  );

  gulp.watch(
    [
      'app/dev/javascript/**/*.js',
    ],
    {cwd: './'},
    (e) => {
      if( e.type === 'added' || e.type === 'deleted' ){
        browserSync.exit();
        console.log('Wait for restart');
        setTimeout(spawnChildren, 100);
      }
    }
  );
  spawnChildren();
});

gulp.task('start', () => {
  sequence('scss', 'webpack', 'watch', 'serve')((err) => {
    if (err) console.log(err);
  });
});

/////////////////////////////////////////////////////////////////////////
