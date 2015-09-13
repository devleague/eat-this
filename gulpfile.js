var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

var minify = require('gulp-minify');
var minifyCss = require('gulp-minify-css');

var browserSync = require('browser-sync');

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

gulp.task('default', ['watch']);