var gulp = require('gulp');
var shorthand = require('gulp-shorthand');

var gulp = require('gulp');

gulp.task('default', function() {

    console.log('Test');

});

gulp.task('css-short', function () {
    return gulp.src('src/styles.css')
        .pipe(shorthand())
        .pipe(gulp.dest('dest'));
});

var moreCSS = require('gulp-more-css');
 
gulp.task('css-more', function() {
    return gulp.src('src/styles.css')
        .pipe(moreCSS())
        .pipe(gulp.dest('./out'));
});