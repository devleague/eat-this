var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

var minify = require('gulp-minify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');

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
// gulp.task('sass', function () {
//   return gulp.src('./sass/*.scss')
//       .pipe(sass({ errLogToConsole: true }))
//       .pipe(gulp.dest('./app/css'))
//       .pipe(minifyCss())
//       .pipe(rename({
//         suffix: '.min'
//       }))
//       .pipe(gulp.dest('./app/css'));
// });

gulp.task('watch', ['browserSync'], function () {
  // gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('app/**/*', function (){
    browserSync.reload();
  });
});

gulp.task('default', ['nodemon', 'watch']);