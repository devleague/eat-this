var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

var minify = require('gulp-minify');
var minifyCss = require('gulp-minify-css');

var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var env = require('gulp-env');

var exec = require('child_process').exec;

gulp.task('source-env', function (cb){
  exec('source .env', function (err, stdout, stderr){
    console.log(stdout);
    console.log(stderr);
    console.log('sourcing env file');
    cb(err);
  })
})
// var exec = require('child_process').exec, child;

// gulp.task('set-env', function (){
//   env({
//     file: ".env"
//   });
// });

// gulp.task('source-env', function (){
//   child = exec('source .env', function (){
//     console.log(child);
//     console.log('sourcing env file');

//   });
// });

gulp.task('nodemon', function (){
  nodemon(require('./nodemon.json'));
});


gulp.task('browserSync', function (){
  browserSync({
    proxy: 'localhost:8080',
    open: false
  });
});

// keeps gulp from crashing for scss errors
gulp.task('sass', function () {
  return gulp.src('./sass/*.scss')
      .pipe(sass({ errLogToConsole: true }))
      .pipe(minifyCss())
      .pipe(gulp.dest('./app/css'));
});

gulp.task('watch', ['sass', 'browserSync'], function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('app/**/*', function (){
    browserSync.reload();
  });
});

gulp.task('default', ['source-env', 'nodemon', 'watch']);